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
    //  platform2: undefined,

    // obstacles: [],

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
                    console.log(this.mainPlatform)
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

        this.mainPlatform = new Platform(50, 50, 50, 50)
        this.player1 = new Player(this.gameScreen, this.gameSize, 50, 'red')
        this.player2 = new Player(this.gameScreen, this.gameSize, this.gameSize.w - 100, 'blue')

        //  this.obstacles = []
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

        //  this.background.move()
        this.player1.move()
        this.player2.move()
        // this.obstacles.forEach(obs => obs.move())
    },


}