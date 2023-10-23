const Game = {

    gameScreen: document.querySelector('#game-screen'),

    gameSize: {
        w: window.innerWidth,
        h: window.innerHeight
    },


    framesCounter: 0,

    background: undefined,

    player1: undefined,
    player2: undefined,

    mainPlatform: undefined,
    auxPlatform: undefined,

    keys: {
        up1: 'w',
        left1: 'a',
        right1: 'd',
        shoot1: 'Space',
        up2: 'ArrowUp',
        left2: 'ArrowLeft',
        right2: 'ArrowRight',
        shoot2: 'Enter'
    },

    init() {

        this.setDimensions()

        this.mainPlatform = {
            width: this.gameSize.w / 2,
            heigth: this.gameSize.h / 15,
            leftPosition: this.gameSize.w / 4,
            topPosition: this.gameSize.h / 1.4
        }

        this.auxPlatform = {
            width: this.gameSize.w / 3,
            heigth: this.gameSize.h / 18,
            leftPosition: this.gameSize.w / 3,
            topPosition: this.gameSize.h / 2.2
        }

        this.setEventListeners()
        this.start()
    },

    setDimensions() {
        this.gameScreen.style.width = `${this.gameSize.w}px`
        this.gameScreen.style.height = `${this.gameSize.h}px`
    },

    setEventListeners() {
        document.addEventListener("keydown", e => {
            switch (e.key) { // Hemos cambiado el e.code por e.key, porque no nos lo cogia
                case this.keys.left1:
                    this.player1.left()
                    break;
                case this.keys.right1:
                    this.player1.right()
                    break;
                case this.keys.up1:
                    this.player1.jump()
                    break;
                case this.keys.shoot1:
                    this.player1.shoot()
                    break;

                case this.keys.left2:
                    this.player2.left()
                    break;
                case this.keys.right2:
                    this.player2.right()
                    break;
                case this.keys.up2:
                    this.player2.jump()
                    break;
                case this.keys.shoot2:
                    this.player2.shoot()
                    break;
            }
        })
    },

    start() {
        this.createElements()
        this.gameLoop()
    },

    createElements() {

        this.background = new Background(this.gameScreen, this.gameSize)
        this.mainPlatform = new Platform(this.mainPlatform.width, this.mainPlatform.heigth, this.mainPlatform.leftPosition, this.mainPlatform.topPosition)
        this.auxPlatform = new Platform(this.auxPlatform.width, this.auxPlatform.heigth, this.auxPlatform.leftPosition, this.auxPlatform.topPosition)
        this.player1 = new Player(this.gameScreen, this.gameSize, this.gameSize.w / 4, this.gameSize.h / 1.4, 'black', this.mainPlatform, this.auxPlatform)
        this.player2 = new Player(this.gameScreen, this.gameSize, this.gameSize.w / 4 + this.gameSize.w / 2 - 50, this.gameSize.h / 1.4, 'rgb(12, 52, 18)', this.mainPlatform, this.auxPlatform)

    },

    gameLoop() {
        this.framesCounter > 5000 ? this.framesCounter = 0 : this.framesCounter++

        this.drawAll()

        //   this.clearAll()
        //  this.generateObstacles()
        //  this.isCollision() && this.gameOver()

        window.requestAnimationFrame(() => this.gameLoop())
    },

    drawAll() {

        this.background.move()
        this.player1.move()
        this.player2.move()
        // this.obstacles.forEach(obs => obs.move())
    },
}