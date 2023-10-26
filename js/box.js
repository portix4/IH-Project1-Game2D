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
            top: 0
        }

        this.boxVel = {
            top: 10
        }

        this.boxSprite = {
            backgroundPositionX: 0,
            totalFrames: 9,
            currentFrame: 1,
            frameSpeed: 10
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
        this.spriteElement.style.backgroundSize = `650px 100px`
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

