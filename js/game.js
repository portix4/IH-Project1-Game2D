const Game = {

    gameScreen: document.querySelector('#game-screen'),

    gameSize: {
        w: window.innerWidth,
        h: window.innerHeight
    },


    framesCounter: 0,
    framesIndex: 0,

    background: undefined,

    player1: undefined,
    player2: undefined,

    mainPlatform: undefined,
    auxPlatform: undefined,

    heart1: undefined,

    isOnPlatform: false,

    boxDensity: 250,

    platforms: [],

    bullets: [],

    boxes: [],

    keys: {
        up1: 'w',
        left1: 'a',
        right1: 'd',
        shoot1: ' ',
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

            switch (e.key) {
                case this.keys.left1:
                    this.player1.left()
                    break;
                case this.keys.right1:
                    this.player1.right()
                    break;

                    break;
                case this.keys.left2:
                    this.player2.left()
                    break;
                case this.keys.right2:
                    this.player2.right()
                    break;

            }
        })

        document.addEventListener("keyup", e => {
            switch (e.key) {
                case this.keys.shoot1:
                    this.player1.shoot()
                    break
                case this.keys.shoot2:
                    this.player2.shoot()
                    break
                case this.keys.up1:
                    if (this.player1.numberOfJumps < 5)
                        this.player1.jump()
                    break
                case this.keys.up2:
                    if (this.player2.numberOfJumps < 5)
                        this.player2.jump()
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
        this.player1 = new Player(this.gameScreen, this.gameSize, this.gameSize.w / 4, this.gameSize.h / 1.4, 'url(./img/players.png)', this.mainPlatform)
        this.player2 = new Player(this.gameScreen, this.gameSize, this.gameSize.w / 4 + this.gameSize.w / 2 - 70, this.gameSize.h / 1.4, 'url(./img/player2.png)', this.mainPlatform, this.auxPlatform)
        this.heart1 = new Life(this.gameScreen, this.gameSize, this.player1.life, 50)
        this.heart2 = new Life(this.gameScreen, this.gameSize, this.player2.life, this.gameSize.w - 200)
        this.bullets = []
        this.platforms = []
        this.platforms.push(this.auxPlatform)
        this.platforms.push(this.mainPlatform)
        this.boxes = []

    },

    checkPlatform(player) {

        for (let i = 0; i < this.platforms.length; i++) {
            if (
                player.playerPos.position + player.playerSize.w >= this.platforms[i].leftPosition &&
                player.playerPos.top + player.playerSize.h >= this.platforms[i].topPosition &&
                player.playerPos.position <= this.platforms[i].leftPosition + this.platforms[i].width
            ) {
                if (player.playerPos.top + player.playerSize.h - player.playerVel.top <= this.platforms[i].topPosition) {
                    player.playerVel.top = 0;
                    player.playerPos.top = this.platforms[i].topPosition - player.playerSize.h;
                    player.numberOfJumps = 0
                    return true
                }

            }
        }
    },


    gameLoop() {

        this.framesCounter > 5000 ? this.framesCounter = 0 : this.framesCounter++

        this.drawAll()

        this.incrementFrames()

        this.generateBoxes()

        this.collisionBoxPlatform()

        this.checkPlatform(this.player1)
        this.checkPlatform(this.player2)


        this.checkCollision()

        this.collisionPlayerBox(this.player1)
        this.collisionPlayerBox(this.player2)

        this.clearBoxes()


        window.requestAnimationFrame(() => this.gameLoop())
    },

    incrementFrames() {
        this.framesIndex > 5000 ? this.framesIndex = 0 : this.framesIndex++
    },

    drawAll() {

        this.background.move()
        this.player1.move(this.framesIndex)
        this.player2.move(this.framesIndex)
        this.boxes.forEach(obs => obs.move())
    },

    generateBoxes() {

        if (this.framesCounter % this.boxDensity === 0) {
            let newBoxes = new Box(this.gameScreen, this.gameSize, this.player1.playerPos, this.player1.playerSize)
            this.boxes.push(newBoxes)
            //hay que meter al otro jugador y en su clase y las plataformas - o no?
        }
    },

    checkCollision() {
        for (let i = 0; i < this.player1.bullets.length; i++) {
            const bullet = this.player1.bullets[i];
            if (this.player2.playerPos.position <= bullet.bulletPos.left &&
                this.player2.playerPos.position + this.player2.playerSize.w >= bullet.bulletPos.left &&
                this.player2.playerPos.top <= bullet.bulletPos.top &&
                this.player2.playerPos.top + this.player2.playerSize.h >= bullet.bulletPos.top) {
                console.log('Colisión con Player 2');
                this.player2.playerPos.position += 30
                if (this.player2.life > 0) {
                    this.player2.life--;
                    this.heart2.updateLives(this.player2.life)
                    console.log(this.player1.bullets[i])
                    this.player1.bullets[i].bulletElement.remove()
                    this.player1.bullets.splice(i, 1);
                }
                if (this.player2.life <= 0) {
                    alert("GANADOR 1");
                }
            }
        }

        for (let i = 0; i < this.player2.bullets.length; i++) {
            const bullet = this.player2.bullets[i];
            if (
                this.player1.playerPos.position <= bullet.bulletPos.left &&
                this.player1.playerPos.position + this.player1.playerSize.w >= bullet.bulletPos.left &&
                this.player1.playerPos.top <= bullet.bulletPos.top &&
                this.player1.playerPos.top + this.player1.playerSize.h >= bullet.bulletPos.top
            ) {
                console.log('Colisión con Player 1');
                this.player1.playerPos.position -= 30
                if (this.player1.life > 0) {
                    this.player1.life--;
                    this.heart1.updateLives(this.player1.life)
                    this.player2.bullets[i].bulletElement.remove()
                } console.log(this.player1.life)
                this.player2.bullets.splice(i, 1);
                // Eliminar la bala al colisionar
                if (this.player1.life <= 0) {
                    alert("GANADOR 2");
                }
            }
        }
        return this.player1.life <= 0 || this.player2.life <= 0;
    },

    collisionBoxPlatform() {
        for (let i = 0; i < this.boxes.length; i++) {
            for (let j = 0; j < this.platforms.length; j++) {
                if (
                    this.boxes[i].boxPos.left + this.boxes[i].boxSize.w >= this.platforms[j].leftPosition &&
                    this.boxes[i].boxPos.top + this.boxes[i].boxSize.h >= this.platforms[j].topPosition &&
                    this.boxes[i].boxPos.left <= this.platforms[j].leftPosition + this.platforms[j].width
                ) {
                    this.boxes[i].boxVel.top = 0
                    this.boxes[i].boxPos.top = this.platforms[j].topPosition - this.boxes[i].boxSize.h
                }
            }
        }
    },

    clearBoxes() {

        this.boxes.forEach((box, idx) => {
            if (box.boxPos.top >= this.gameSize.h) {
                box.boxPos.Element.remove()
                this.boxes.splice(idx, 1)
            }
        })

    },


    collisionPlayerBox(player) {
        for (let i = 0; i < this.boxes.length; i++) {
            if (
                this.boxes[i].boxPos.left + this.boxes[i].boxSize.w >= player.playerPos.position &&
                this.boxes[i].boxPos.top + this.boxes[i].boxSize.h >= player.playerPos.top &&
                this.boxes[i].boxPos.left <= player.playerPos.position + player.playerSize.w
            ) // falta que lo pille por encima
            {
                player.life += 2
                console.log(player.life)
                this.boxes[i].boxPos.Element.remove()
                this.boxes.splice(i, 1)
            }
        }
        this.heart1.updateLives(this.player1.life)
        this.heart2.updateLives(this.player2.life)

    }


}
