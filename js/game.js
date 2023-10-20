const Game = {

    gameScreen: document.querySelector('#game-screen'),

    gameSize: {
        w: window.innerWidth,
        h: window.innerHeight
    },

    background: undefined,

    player1: undefined,
    player2: undefined,

    keys1: {
        up1: 'w',
        left1: 'a',
        right1: 'd',
        shoot1: 'Space'
    },

    keys2: {
        up2: 'ArrowUp',
        left2: 'ArrowLeft',
        right2: 'ArrowRight',
        shoot2: 'Enter'
    },

    setEventListeners() {
        document.addEventListener("keydown", e => {
            switch (e.code) {

                case this.keys1.left1:
                    this.player1.left()
                    break;
                case this.keys1.right1:
                    this.player1.right()
                    break;
                case this.keys1.up1:
                    this.player1.up()
                    break;
                case this.keys1.shoot1:
                    this.player1.shoot()
                    break;

                case this.keys2.left2:
                    this.player2.left()
                    break;
                case this.keys2.right2:
                    this.player2.right()
                    break;
                case this.keys2.up2:
                    this.player2.up()
                    break;
                case this.keys2.shoot2:
                    this.player2.shoot()
                    break;
            }
        })
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

    start() {
        this.createElements()
        // this.gameLoop()
    },

    createElements() {
        this.player1 = new Player(this.gameSize, this.gameSize, 50, 'red')
        this.player2 = new Player(this.gameSize, this.gameSize, 800, 'blue')
    },
}