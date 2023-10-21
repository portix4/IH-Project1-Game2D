class Player {

    constructor(gameScreen, gameSize, position, image) {

        this.gameScreen = gameScreen
        this.gameSize = gameSize
        this.position = position
        this.image = image

        this.numberOfJumps = 0

        this.playerSize = {
            w: 50,
            h: 100
        }

        this.playerPos = {
            position: this.position,
            top: this.gameSize.h - this.playerSize.h - 20,
            base: this.gameSize.h - this.playerSize.h - 20,
        }

        this.playerVel = {
            left: 0.1,
            top: 0,
            gravity: 0.4
        }

        this.init()
    }

    move() {

        if (this.playerPos.top < this.playerPos.base) {       // hay que revisar esto, tiene que saltar varias veces
            this.playerPos.top += this.playerVel.top;
            this.playerVel.top += this.playerVel.gravity;
        } else {
            this.playerPos.top = this.playerPos.base;
            this.playerVel.top = 1;
        }
        this.updatePosition()

    }

    updatePosition() {
        this.playerElement.style.left = `${this.playerPos.position}px`;
        this.playerElement.style.top = `${this.playerPos.top}px`
    }

    left() {

        if (this.playerPos.position > 0) {
            this.playerPos.position -= 20;
            this.updatePosition()
        }



    }

    right() {

        if (this.playerPos.position < this.gameSize.w - this.playerSize.w) {
            this.playerPos.position += 20;
            this.updatePosition()
        }

    }

    jump() {
        if (this.playerPos.top >= this.playerPos.base) {
            this.playerPos.top -= 180;
            this.playerVel.top -= 8;
            this.numberOfJumps++
        }

        //queremos que pueda saltar tres veces seguidaasd
    }


    init() {

        this.playerElement = document.createElement('div')

        this.playerElement.style.position = "absolute"
        this.playerElement.style.width = `${this.playerSize.w}px`
        this.playerElement.style.height = `${this.playerSize.h}px`
        this.playerElement.style.left = `${this.playerPos.position}px`
        this.playerElement.style.top = `${this.playerPos.top}px`
        this.playerElement.style.backgroundColor = `${this.image}`

        document.querySelector('#game-screen').appendChild(this.playerElement)


    }
}