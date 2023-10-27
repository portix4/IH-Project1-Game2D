class Box {

    constructor(gameScreen, gameSize, playerPos, playerSize) {

        this.gameScreen = gameScreen;
        this.gameSize = gameSize;
        this.playerPos = playerPos;
        this.playerSize = playerSize;

        this.boxSize = {
            w: 68,
            h: 85
        }

        this.boxPos = {
            left: Math.floor(Math.random() * gameSize.w),
            top: 0
        }

        this.boxVel = {
            top: 10
        }

        this.boxSprite = {
            backgroundPositionX: 0,
            totalFrames: 5,
            currentFrame: 0,
            frameSpeed: 16
        }

        this.init()
    }

    init() {
        this.spriteElement = document.createElement('div')

        this.spriteElement.style.position = "absolute"
        //  this.boxPos.Element.style.backgroundColor = `black`
        this.spriteElement.style.width = `${this.boxSize.w}px`
        this.spriteElement.style.height = `${this.boxSize.h}px`
        this.spriteElement.style.left = `${this.boxPos.left}px`
        this.spriteElement.style.top = `${this.boxPos.top}px`

        this.spriteElement.style.backgroundImage = `url(./img/vidas.png)`
        this.spriteElement.style.backgroundSize = `674px 95px`
        this.spriteElement.style.overflow = "hidden"
        this.spriteElement.style.backgroundRepeat = "no-repeat"
        this.spriteElement.style.backgroundPositionX = "20px"

        this.gameScreen.appendChild(this.spriteElement)
    }

    move(framesCounter) {

        this.boxPos.top += this.boxVel.top

        this.animateSprite(framesCounter)

        this.updatePosition()

    }


    animateSprite(framesCounter) {

        if (framesCounter % this.boxSprite.frameSpeed == 0) {
            this.boxSprite.currentFrame++
            console.log("voy por el frame------>", this.boxSprite.currentFrame)
        }
        if (this.boxSprite.currentFrame >= this.boxSprite.totalFrames) {
            console.log("llego al total de frames")
            this.boxSprite.currentFrame = 0
        }
        this.boxSprite.backgroundPositionX = -this.boxSize.w * this.boxSprite.currentFrame
        this.updateSprite()
    }

    updatePosition() {
        this.spriteElement.style.left = `${this.boxPos.left}px`
        this.spriteElement.style.top = `${this.boxPos.top}px`
    }

    /* updateSprite() {
 
         this.spriteElement.style.backgroundPositionX = `${this.spriteElement.backgroundPositionX}px`
     }*/
    updateSprite() {

        this.spriteElement.style.backgroundPositionX = `${this.boxSprite.backgroundPositionX}px`
    }
}

