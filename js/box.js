class Box {

    constructor(gameScreen, gameSize, playerPos, playerSize) {

        this.gameScreen = gameScreen;
        this.gameSize = gameSize;
        this.playerPos = playerPos;
        this.playerSize = playerSize;

        this.boxSize = {
            w: 75,
            h: 100
        }

        this.boxPos = {
            left: Math.floor(Math.random() * gameSize.w),
            // top: playerPos.base + playerSize.h - this.obstacleSize.h
            top: 0
        }

        this.boxVel = {
            top: 10
        }

        this.init()
    }

    init() {
        this.boxPos.Element = document.createElement('div')

        this.boxPos.Element.style.position = "absolute"
        this.boxPos.Element.style.backgroundColor = `black`
        this.boxPos.Element.style.width = `${this.boxSize.w}px`
        this.boxPos.Element.style.height = `${this.boxSize.h}px`
        this.boxPos.Element.style.left = `${this.boxPos.left}px`
        this.boxPos.Element.style.top = `${this.boxPos.top}px`

        this.gameScreen.appendChild(this.boxPos.Element)
    }

    move() {
        this.boxPos.top += this.boxVel.top
        this.updatePosition()
    }

    updatePosition() {
        this.boxPos.Element.style.left = `${this.boxPos.left}px`
        this.boxPos.Element.style.top = `${this.boxPos.top}px`
    }
}