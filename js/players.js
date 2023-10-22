class Player {

    constructor(gameScreen, gameSize, leftPosition, topPosition, image, mainPlatform) {

        this.gameScreen = gameScreen
        this.gameSize = gameSize
        this.leftPosition = leftPosition
        this.topPosition = topPosition
        this.image = image
        this.mainPlatform = mainPlatform

        this.numberOfJumps = 0

        this.playerSize = {
            w: 50,
            h: 100
        }

        this.playerPos = {
            position: this.leftPosition,
            top: this.topPosition - this.playerSize.h,
            base: this.mainPlatform.topPosition
        }

        this.playerVel = {
            left: 0.1,
            top: 1,
            gravity: 0.4
        }

        this.init()
    }

    init() {

        this.playerElement = document.createElement('div')

        this.playerElement.style.position = "absolute"
        this.playerElement.style.width = `${this.playerSize.w}px`
        this.playerElement.style.height = `${this.playerSize.h}px`
        this.playerElement.style.left = `${this.leftPosition}px`
        this.playerElement.style.top = `${this.playerPos.top}px`
        this.playerElement.style.backgroundColor = `${this.image}`

        document.querySelector('#game-screen').appendChild(this.playerElement)


    }

    move() {

        if (this.playerPos.position < this.mainPlatform.leftPosition) { // si se cae por la izquierda
            this.playerPos.top += this.playerVel.top;
            this.playerVel.top += this.playerVel.gravity;
        }

        if (this.playerPos.position > this.mainPlatform.leftPosition + this.mainPlatform.width) { // si se cae por la derecha
            this.playerPos.top += this.playerVel.top;
            this.playerVel.top += this.playerVel.gravity;
        }

        if (this.playerPos.top < this.mainPlatform.topPosition - this.playerSize.h) { // salta
            this.playerPos.top += this.playerVel.top;
            this.playerVel.top += this.playerVel.gravity;
        }

        if (this.playerPos.top > this.gameSize.h) { // Si llegan muy abajo, mueren
            alert('Game Over', this.Player)
        }

        this.updatePosition()
    }

    updatePosition() {
        this.playerElement.style.left = `${this.playerPos.position}px`;
        this.playerElement.style.top = `${this.playerPos.top}px`
    }

    left() {

        if (this.playerPos.position > 0) { // Para que no se salgan por la izquierda los players 
            this.playerPos.position -= 20;
            this.updatePosition()
        }
    }


    right() {

        if (this.playerPos.position < this.gameSize.w - this.playerSize.w) { // Para que no se salgan por la derecha los players
            this.playerPos.position += 20;
            this.updatePosition()
        }

    }

    jump() {
        this.playerPos.top -= 40;
        this.playerVel.top -= 8;
        this.updatePosition()
    }

}