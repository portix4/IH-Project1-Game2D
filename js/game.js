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

    isOnPlatform: false,

    platforms: [],

    bullets: [],

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

            switch (e.key) { // Hemos cambiado el e.code por e.key, porque no nos lo cogia
                case this.keys.left1:
                    this.player1.left()
                    break;
                case this.keys.right1:
                    this.player1.right()
                    break;
                case this.keys.up1:
                    if (this.player1.numberOfJumps < 5)
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
                    if (this.player2.numberOfJumps < 5)
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
        this.player1 = new Player(this.gameScreen, this.gameSize, this.gameSize.w / 4, this.gameSize.h / 1.4, 'url(./img/players.png)', this.mainPlatform)
        this.player2 = new Player(this.gameScreen, this.gameSize, this.gameSize.w / 4 + this.gameSize.w / 2 - 70, this.gameSize.h / 1.4, 'url(./img/player2.png)', this.mainPlatform, this.auxPlatform)
        this.bullets = []
        this.platforms = []
        this.platforms.push(this.auxPlatform)
        this.platforms.push(this.mainPlatform)

    },

    /* checkPlatform() {  ANTIGUO
         // FALTA PARA PLAYER2
         this.platforms.forEach(element => {
 
             if (this.player1.playerPos.position + this.player1.playerSize.w >= element.leftPosition &&
                 this.player1.playerPos.top + this.player1.playerSize.h >= element.topPosition &&
                 this.player1.playerPos.position <= element.leftPosition + element.width) {
 
                 this.isOnPlatform = true
                 this.player1.numberOfJumps = 0
 
                 this.player1.playerVel.top = 0
                 this.player1.playerPos.base = element.topPosition
 
                 return true
             }
             else { // SIN ESTE ELSE, NO SE CAE DE MAINPLATFORM - CON EL ELSE, NO SE QUEDA EN LA PLATAFORMA DE ENCIMA
                 this.isOnPlatform = false
                 this.player1.playerPos.top += this.player1.playerVel.top / 2
                 this.player1.playerVel.top += this.player1.playerVel.gravity / 2
                 return false
             }
         }) //  console.log(this.isOnPlatform)
         // return this.isOnPlatform
         this.platforms.forEach(element => {
             if (this.player2.playerPos.position + this.player2.playerSize.w >= element.leftPosition &&
                 this.player2.playerPos.top + this.player2.playerSize.h >= element.topPosition &&
                 this.player2.playerPos.position <= element.leftPosition + element.width) {
 
                 this.isOnPlatform = true
                 this.player2.numberOfJumps = 0
 
                 this.player2.playerVel.top = 0
                 this.player2.playerPos.base = element.topPosition
 
                 return true
             }
             else { // SIN ESTE ELSE, NO SE CAE DE MAINPLATFORM - CON EL ELSE, NO SE QUEDA EN LA PLATAFORMA DE ENCIMA
                 this.isOnPlatform = false
                 this.player2.playerPos.top += this.player2.playerVel.top / 2
                 this.player2.playerVel.top += this.player2.playerVel.gravity / 2
                 return false
             }
 
         })
         //  console.log(this.isOnPlatform)
         //   return this.isOnPlatform
 
         // CODIGO DE LORENA
         /*   this.platforms.forEach(element => {
                if (
                    this.player1.playerPos.position + this.player1.playerSize.w >= element.leftPosition &&
                    this.player1.playerPos.top + this.player1.playerSize.h >= element.topPosition &&
                    this.player1.playerPos.position <= element.leftPosition + element.width
                ) {
                    // Colisión desde abajo
                    if (this.player1.playerPos.top + this.player1.playerSize.h - this.player1.playerVel.top <= element.topPosition) {
                        this.isOnPlatform = true;
                        this.player1.playerVel.top = 0;
                        this.player1.playerPos.top = element.topPosition - this.player1.playerSize.h;
                    }
                }
            });
    
            console.log(this.isOnPlatform)
    
            return this.isOnPlatform
 
     }, */

    checkPlatform() {


        this.platforms.forEach(element => {
            if (
                this.player1.playerPos.position + this.player1.playerSize.w >= element.leftPosition &&
                this.player1.playerPos.top + this.player1.playerSize.h >= element.topPosition &&
                this.player1.playerPos.position <= element.leftPosition + element.width
            ) {
                if (this.player1.playerPos.top + this.player1.playerSize.h - this.player1.playerVel.top <= element.topPosition) {
                    this.player1.playerVel.top = 0;
                    this.player1.playerPos.top = element.topPosition - this.player1.playerSize.h;
                }
                this.player1.numberOfJumps = 0
            }

            if (
                this.player2.playerPos.position + this.player2.playerSize.w >= element.leftPosition &&
                this.player2.playerPos.top + this.player2.playerSize.h >= element.topPosition &&
                this.player2.playerPos.position <= element.leftPosition + element.width
            ) {
                if (this.player2.playerPos.top + this.player2.playerSize.h - this.player2.playerVel.top <= element.topPosition) {
                    this.player2.playerVel.top = 0;
                    this.player2.playerPos.top = element.topPosition - this.player2.playerSize.h;
                }
            }
            this.player2.numberOfJumps = 0
        });



    },



    gameLoop() {

        this.framesCounter > 5000 ? this.framesCounter = 0 : this.framesCounter++

        this.drawAll()

        this.incrementFrames()

        this.checkPlatform()

        this.checkCollision()

        window.requestAnimationFrame(() => this.gameLoop())
    },

    incrementFrames() {
        this.framesIndex > 5000 ? this.framesIndex = 0 : this.framesIndex++
    },

    drawAll() {

        this.background.move()
        this.player1.move(this.framesIndex)
        this.player2.move(this.framesIndex)
    },



    checkCollision() {
        for (let i = 0; i < this.player1.bullets.length; i++) {
            const bullet = this.player1.bullets[i];
            if (this.player2.playerPos.position <= bullet.bulletPos.left &&
                this.player2.playerPos.position + this.player2.playerSize.w >= bullet.bulletPos.left &&
                this.player2.playerPos.top <= bullet.bulletPos.top &&
                this.player2.playerPos.top + this.player2.playerSize.h >= bullet.bulletPos.top) {
                console.log('Colisión con Player 2');
                this.player2.playerPos.position += 15
                if (this.player2.life > 0) {
                    this.player2.life--;
                    console.log(this.player1.bullets[i])
                    this.player1.bullets[i].bulletElement.remove()
                    this.player1.bullets.splice(i, 1);
                }
                if (this.player2.life <= 0) {
                    alert("GANADOR 2");
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
                this.player1.playerPos.position -= 15
                if (this.player1.life > 0) {
                    this.player1.life--;
                    this.player2.bullets[i].bulletElement.remove()
                } console.log(this.player1.life)
                this.player2.bullets.splice(i, 1);
                // Eliminar la bala al colisionar
                if (this.player1.life <= 0) {
                    alert("GANADOR 1");
                }
            }
        }
        return this.player1.life <= 0 || this.player2.life <= 0;
    }


}

