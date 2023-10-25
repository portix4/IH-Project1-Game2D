class Player {

    constructor(gameScreen, gameSize, leftPosition, topPosition, image, mainPlatform) {

        this.gameScreen = gameScreen
        this.gameSize = gameSize
        this.leftPosition = leftPosition
        this.topPosition = topPosition
        this.image = image
        this.mainPlatform = mainPlatform
        this.bullets = []
        this.lastPosition = []
        this.life = 10
        this.direction = 1

        this.numberOfJumps = 0

        this.playerSize = {
            w: 75,
            h: 100
        }

        this.playerPos = {
            position: this.leftPosition,
            top: this.topPosition - this.playerSize.h,
            base: this.mainPlatform.topPosition
        }

        this.playerVel = {
            left: 1,
            top: 1,
            gravity: 0.25
        }

        this.playerSprite = {
            backgroundPositionX: 0,
            totalFrames: 4,
            currentFrame: 0,
            frameSpeed: 14
        }

        this.init()
    }

    init() {/*

        this.playerElement = document.createElement('div')

        this.playerElement.style.position = "absolute"
        this.playerElement.style.width = `${this.playerSize.w}px`
        this.playerElement.style.height = `${this.playerSize.h}px`
        this.playerElement.style.left = `${this.leftPosition}px`
        this.playerElement.style.top = `${this.playerPos.top}px`
        this.playerElement.style.backgroundColor = `${this.image}`

        document.querySelector('#game-screen').appendChild(this.playerElement)*/
        this.playerElement = document.createElement('div')
        this.playerElement.style.position = "absolute"
        this.playerElement.style.width = `${this.playerSize.w}px`
        this.playerElement.style.height = `${this.playerSize.h}px`
        this.playerElement.style.left = `${this.leftPosition}px`
        this.playerElement.style.top = `${this.playerPos.top}px`
        this.playerElement.style.backgroundImage = `${this.image}`
        this.playerElement.style.backgroundSize = `300px 100px`
        this.playerElement.style.overflow = "hidden"
        this.playerElement.style.backgroundRepeat = "no-repeat"
        this.playerElement.style.backgroundPositionX = "0px"
        document.querySelector('#game-screen').appendChild(this.playerElement)


    }

    /*move() {


        if (this.playerPos.top < this.mainPlatform.topPosition - this.playerSize.h) {
            this.playerPos.top += this.playerVel.top;
            this.playerVel.top += this.playerVel.gravity;
        }

        if (this.playerPos.top > this.gameSize.h) { // Si llegan muy abajo, mueren
            alert('Game Over', this.Player)
        }

        this.updatePosition()

        this.bullets.forEach(bullet => bullet.move())

        this.clearBullets()
    }*/

    move(framesIndex) {

        this.playerPos.top += this.playerVel.top;
        this.playerVel.top += this.playerVel.gravity;

        if (this.playerPos.top < this.mainPlatform.topPosition - this.playerSize.h) {
            this.playerPos.top += this.playerVel.top;
            this.playerVel.top += this.playerVel.gravity;
        }

        if (this.playerPos.top > this.gameSize.h) { // Si llegan muy abajo, mueren
            alert('Game Over', this.Player)
        }

        this.animateSprite(framesIndex)

        this.updatePosition()

        this.bullets.forEach(bullet => bullet.move())

        this.clearBullets()
    }

    animateSprite(framesIndex) {
        this.updateSprite()
        if (framesIndex % this.playerSprite.frameSpeed == 0) {
            this.playerSprite.currentFrame++
        }
        if (this.playerSprite.currentFrame >= this.playerSprite.totalFrames) {
            this.playerSprite.currentFrame = 0
        }
        this.playerSprite.backgroundPositionX = -this.playerSize.w * this.playerSprite.currentFrame
    }

    updatePosition() {

        this.playerElement.style.left = `${this.playerPos.position}px`;
        this.playerElement.style.top = `${this.playerPos.top}px`
    }

    updateSprite() {
        this.playerElement.style.backgroundPositionX = `${this.playerSprite.backgroundPositionX}px`
    }

    left() {

        if (this.playerPos.position > 0) {
            this.playerPos.position -= 20;
            this.lastPosition.unshift(this.playerPos.position)
            this.updatePosition()
        }

        this.direction = -1
        this.playerElement.style.transform = `scaleX(-1)`
    }


    right() {

        if (this.playerPos.position < this.gameSize.w - this.playerSize.w) {
            this.playerPos.position += 20;
            this.lastPosition.unshift(this.playerPos.position)
            this.updatePosition()
        }
        this.direction = 1
        this.playerElement.style.transform = `scaleX(1)`

    }

    jump() {

        this.numberOfJumps++
        if (this.playerPos.top > this.playerSize.h && this.playerPos.top > 0) {
            this.playerPos.top -= 40;
            this.playerVel.top -= 10;
            this.updatePosition()
        }

    }

    /*  checkDirection() {
  
          if (this.lastPosition.length >= 2) {
              this.lastPosition.pop()
              if (this.lastPosition[0] < this.lastPosition[1]) {
                  return -1
              }
              else return 1
          }
          else return -1
      }*/

    shoot() {

        this.bullets.push(new Bullets(this.gameScreen, {
            left: this.playerPos.position,
            top: this.playerPos.top
        }, this.playerSize, this.direction));
    }


    clearBullets() {

        this.bullets.forEach((bull, idx) => {
            if (bull.bulletPos.left >= this.gameSize.w || bull.bulletPos.left < 0) {
                bull.bulletElement.remove()
                this.bullets.splice(idx, 1)
            }
        })
    }



}