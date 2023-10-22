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

        this.mainPlatform = new Platform(this.gameSize.w / 2, this.gameSize.h / 10, this.gameSize.w / 4, this.gameSize.h / 1.5)
        this.player1 = new Player(this.gameScreen, this.gameSize, this.gameSize.w / 4, this.gameSize.h / 1.5, 'red', this.mainPlatform)
        this.player2 = new Player(this.gameScreen, this.gameSize, this.gameSize.w / 4 + this.gameSize.w / 2 - 50, this.gameSize.h / 1.5, 'blue', this.mainPlatform)

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

/// LE PASO POR PARAMETRO MAINPLATFORM PARA GUARDARLA, PERO TMB LE TENGO QUE PASAR EL INICIO Y FIN DEL PLATFORM PARA QUE INICIEN
// LA POSICION ENCIMA, DEBERES PARA MAÑANA