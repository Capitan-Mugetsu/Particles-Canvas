(function() {
    let canvas = document.createElement('canvas')
    let ctx = canvas.getContext('2d')
    let w = canvas.width = innerWidth
    let h = canvas.height = innerHeight
    let particles = []
    let properties = {
        bgColor             : `rgba(17, 17, 19, 1)`,
        particleColor       : `rgba(255, 40, 40, 1)`,
        particleRadius      : 3,
        particleCount       : 60,
        particleMaxVeloCity : 0.5,
        lineLength          : 150,
        particleLife        : 6
    }

    document.querySelector('body').appendChild(canvas)

    window.onresize = () => {
        let w = canvas.width = innerWidth
        let h = canvas.height = innerHeight
    }

    class Particle {
        constructor() {
            this.x = Math.random() * w
            this.y = Math.random() * h
            this.veloCityX = Math.random() * (properties.particleMaxVeloCity * 2) - properties.particleMaxVeloCity
            this.veloCityY = Math.random() * (properties.particleMaxVeloCity * 2) - properties.particleMaxVeloCity
            this.life = Math.random() * properties.particleLife * 60
        }

        position() {
            this.x + this.veloCityX > w && this.veloCityX > 0 || this.x + this.veloCityX < 0 && this.veloCityX < 0 ? this.veloCityX *= -1 : this.veloCityX
            this.x + this.veloCityY > h && this.veloCityY > 0 || this.y + this.veloCityY < 0 && this.veloCityY < 0 ? this.veloCityY *= -1 : this.veloCityY
            this.x += this.veloCityX
            this.y += this.veloCityY
        }

        reDraw() {
            ctx.beginPath()
            ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2)
            ctx.closePath()
            ctx.fillStyle = properties.particleColor
            ctx.fill()
        }

        reCalculateLife() {
            if (this.life < 1) {
                this.x = Math.random() * w
                this.y = Math.random() * h
                this.veloCityX = Math.random() * (properties.particleMaxVeloCity * 2) - properties.particleMaxVeloCity
                this.veloCityY = Math.random() * (properties.particleMaxVeloCity * 2) - properties.particleMaxVeloCity
                this.life = Math.random() * properties.particleLife * 60
            }

            this.life--
        }
    }

    function reDrawBackground() {
        ctx.fillStyle = properties.bgColor
        ctx.fillRect(0, 0, w, h)
    }

    function drawLines() {
        let x1, y1, x2, y2, length, opacity

        for(let i in particles) {
            for(let j in particles) {
                x1 = particles[i].x
                y1 = particles[i].y
                x2 = particles[j].x
                y2 = particles[j].y

                length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))

                if(length < properties.lineLength) {
                    opacity = 1 - length / properties.lineLength
                    ctx.lineWidth = `0,5`
                    ctx.strokeStyle = 'rgba(255, 40, 40, '+opacity+')'
                    ctx.beginPath()
                    ctx.moveTo(x1, y1)
                    ctx.lineTo(x2, y2)
                    ctx.closePath()
                    ctx.stroke()
                }
            }
        }
    }

    function reDrawParticles() {
        for(let i in particles) {
            particles[i].reCalculateLife()
            particles[i].position()
            particles[i].reDraw()
        }
    }

    function loop() {
        reDrawBackground()
        reDrawParticles()
        drawLines()
        requestAnimationFrame(loop)
    }

    function init() {
        for(let i = 0; i < properties.particleCount; i++) {
            particles.push(new Particle)
        }
        loop()
    }

    init()
})()