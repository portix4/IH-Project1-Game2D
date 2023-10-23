class Background {
    constructor(gameScreen, gameSize) {
        this.gameScreen = gameScreen
        this.backgroundSize = { w: gameSize.w, h: gameSize.h }
        this.backgroundPosition1 = { left: 0, top: 0 }
        this.backgroundPosition2 = { left: gameSize.w, top: 0 }
        this.backgroundVel = { left: 1 }
        this.init()
    }
    init() {
        this.backgroundElement1 = document.createElement('img')
        this.backgroundElement2 = document.createElement('img')
        this.backgroundElement1.src = "./img/background.png"
        this.backgroundElement2.src = "./img/background.png"
        this.backgroundElement1.style.position = "absolute"
        this.backgroundElement1.style.width = `${this.backgroundSize.w}px`
        this.backgroundElement1.style.height = `${this.backgroundSize.h}px`
        this.backgroundElement1.style.left = `${this.backgroundPosition1.left}px`
        this.backgroundElement1.style.top = `${this.backgroundPosition1.top}px`
        this.backgroundElement2.style.position = "absolute"
        this.backgroundElement2.style.width = `${this.backgroundSize.w}px`
        this.backgroundElement2.style.height = `${this.backgroundSize.h}px`
        this.backgroundElement2.style.left = `${this.backgroundPosition2.left}px`
        this.backgroundElement2.style.top = `${this.backgroundPosition2.top}px`
        this.gameScreen.appendChild(this.backgroundElement1)
        this.gameScreen.appendChild(this.backgroundElement2)
    }
    move() {
        if (this.backgroundPosition1.left <= -this.backgroundSize.w) {
            this.backgroundPosition1.left = 0
            this.backgroundPosition2.left = this.backgroundSize.w
        }
        this.backgroundPosition1.left -= this.backgroundVel.left
        this.backgroundPosition2.left -= this.backgroundVel.left
        this.updatePosition()
    }
    updatePosition() {
        this.backgroundElement1.style.left = `${this.backgroundPosition1.left}px`
        this.backgroundElement2.style.left = `${this.backgroundPosition2.left}px`
    }
}