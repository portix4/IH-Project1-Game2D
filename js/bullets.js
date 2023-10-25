class Bullets {
    constructor(gameScreen, playerPos, playerSize, direction) {
        this.gameScreen = gameScreen
        this.playerPos = playerPos
        this.playerSize = playerSize
        this.bulletPos = {
            left: playerPos.left + playerSize.w,
            top: playerPos.top + playerSize.h / 2
        }
        this.bulletVel = {
            left: 10 * direction,
            top: 0,
            gravity: 0
        }
        this.bulletSize = {
            w: 12,
            h: 12
        }
        this.init()
    }

    init() {
        this.bulletElement = document.createElement('div')
        this.bulletElement.style.position = "absolute"
        this.bulletElement.style.borderRadius = `50%`
        this.bulletElement.style.backgroundColor = `black`
        this.bulletElement.style.width = `${this.bulletSize.w}px`
        this.bulletElement.style.height = `${this.bulletSize.h}px`
        this.bulletElement.style.left = `${this.bulletPos.left}px`
        this.bulletElement.style.top = `${this.bulletPos.top}px`
        this.gameScreen.appendChild(this.bulletElement)
    }

    move() { // ES DIFERENTE AL DE MOHA
        this.bulletPos.left += this.bulletVel.left
        this.bulletVel.top += this.bulletVel.gravity
        this.bulletPos.top += this.bulletVel.top
        if (this.bulletPos.top >= this.playerPos.base + this.playerSize.h) {
            this.bulletVel.top *= -1
        }
        this.updatePosition()
    }
    updatePosition() {
        this.bulletElement.style.left = `${this.bulletPos.left}px`
        this.bulletElement.style.top = `${this.bulletPos.top}px`
    }
}