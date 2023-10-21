class Platform {

    constructor(gameScreen, gameSize, playerPos, playerSize, width, height) {

        // 

        this.gameScreen = gameScreen;
        this.gameSize = gameSize;
        //  this.playerPos = playerPos;
        //  this.playerSize = playerSize;
        this.width = width
        this.height = height

        this.obstacleSize = {
            w: this.width,
            h: this.height
        }

        this.obstaclePos = {
            left: gameSize.w,
            top: playerPos.base + playerSize.h - this.obstacleSize.h
        }

        /*   this.obstacleVel = {
               left: 10
           }*/

        this.init()
    }

    init() {
        this.obstacleElement = document.createElement('div')

        this.obstacleElement.style.position = "absolute"
        this.obstacleElement.style.backgroundColor = `black`
        this.obstacleElement.style.width = `${this.obstacleSize.w}px`
        this.obstacleElement.style.height = `${this.obstacleSize.h}px`
        this.obstacleElement.style.left = `${this.obstaclePos.left}px`
        this.obstacleElement.style.top = `${this.obstaclePos.top}px`

        this.gameScreen.appendChild(this.obstacleElement)
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