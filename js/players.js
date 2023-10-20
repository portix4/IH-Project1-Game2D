class Player {

    constructor(gameScreen, gameSize, position, image) {

        this.gameScreen = gameScreen
        this.gameSize = gameSize
        this.position = position
        this.image = image

        this.playerSize = {
            w: 50,
            h: 100
        }

        this.playerPos = {
            left: this.position,
            top: this.gameSize.h - this.playerSize.h - 20,
            base: this.gameSize.h - this.playerSize.h - 20,
        }

        this.playerVel = {
            left: 1,
            top: 0,
            gravity: 0.4
        }

        this.init()


    }

    left() {
        console.log('izquierda')
    }

    init() {

        this.playerElement = document.createElement('div')

        this.playerElement.style.position = "absolute"
        this.playerElement.style.width = `${this.playerSize.w}px`
        this.playerElement.style.height = `${this.playerSize.h}px`
        this.playerElement.style.left = `${this.playerPos.left}px`
        this.playerElement.style.top = `${this.playerPos.top}px`
        this.playerElement.style.backgroundColor = `${this.image}`

        document.querySelector('#game-screen').appendChild(this.playerElement)


    }
}