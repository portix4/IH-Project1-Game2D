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
            base: this.gameSize.h
        }

        this.playerVel = {
            left: 0.1,
            top: 0,
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

    /*  move() {
  
          if (this.playerPos.top < this.playerPos.base && this.playerPos.position < this.mainPlatform.leftPosition) {       // hay que revisar esto, tiene que saltar varias veces
              this.playerPos.top += this.playerVel.top;
              this.playerVel.top += this.playerVel.gravity;
          } else {
              this.playerPos.top = this.playerPos.base;
              this.playerVel.top = 1;
              this.playerVel.top += this.playerVel.gravity;
          }
          this.updatePosition()  sdfsdfs
      }*/

    move() {

        if (this.playerPos.position < this.mainPlatform.leftPosition) {
            this.playerPos.top += this.playerVel.top;
            this.playerVel.top += this.playerVel.gravity;
        }

        if (this.playerPos.position > this.mainPlatform.leftPosition + this.mainPlatform.width) {
            this.playerPos.top += this.playerVel.top;
            this.playerVel.top += this.playerVel.gravity;
        }

        if (this.playerPos.top <= this.mainPlatform.leftPosition) {
            this.playerPos.top += this.playerVel.top;
            this.playerVel.top += this.playerVel.gravity;
        }

        if (this.playerPos.top > this.playerPos.base) {
            alert('Game Over', this.Player)
        }

        //    if (this.playerPos.top>)




        this.updatePosition()
    }

    updatePosition() {

        this.playerElement.style.left = `${this.playerPos.position}px`;
        this.playerElement.style.top = `${this.playerPos.top}px`


        //  this.playerVel.top -= 0.5; CON ESTA LINEA, AL INICIAR EMPIEZAN A LEVITAR DESDE EL INICIO 
    }

    left() {

        if (this.playerPos.position > 0) {
            this.playerPos.position -= 20;
            console.log(this.playerPos.top, this.playerPos.base)
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

        //queremos que pueda saltar x veces seguidas


        this.playerPos.top -= 180;
        this.playerVel.top -= 8;
    }

    /* este era el codigo que habia en la funcion move() para que saltara
    if (this.playerPos.top < this.playerPos.base) {       // está saltando!
        this.playerPos.top += this.playerVel.top;
        this.playerVel.top += this.playerVel.gravity;
    } else {
        this.playerPos.top = this.playerPos.base;
        this.playerVel.top = 1;
    }
    
    this.updatePosition()*/
}