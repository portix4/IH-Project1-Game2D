class Platform {

    constructor(gameScreen, gameSize, position, height) {
        this.gameScreen = gameScreen
        this.gameSize = gameSize
        this.width = position * 2
        this.height = height
        this.leftPosition = position

        this.platformSize = {
            w: this.width,
            h: this.height
        }

        this.platformPos = {
            left: this.leftPosition,
        }


        this.init()
    }

    init() {

        this.platformElement = document.createElement('div')

        this.platformElement.style.position = "absolute"
        this.platformElement.style.backgroundColor = `black`
        this.platformElement.style.width = `${this.platformSize.w}px`
        this.platformElement.style.height = `${this.platformSize.h}px`
        this.platformElement.style.left = `${this.platformPos.left}px`
        // this.platformElement.style.top = `${this.obstaclePos.top}px`

        this.gameScreen.appendChild(this.platformElement)

    }

    /*    move() {
            this.obstaclePos.left -= this.obstacleVel.left
            this.updatePosition()
        }
    
        updatePosition() {
            this.obstacleElement.style.left = `${this.obstaclePos.left}px`
            this.obstacleElement.style.top = `${this.obstaclePos.top}px`
        }*/
}