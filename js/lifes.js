class Life {

    constructor(gameScreen, gameSize, lifes, leftPosition) {

        this.gameScreen = gameScreen
        this.gameSize = gameSize
        this.lifes = lifes
        this.leftPosition = leftPosition
        this.counterPosition = leftPosition + 70

        this.init()
    }

    init() {

        this.lifeElement = document.createElement('img')
        this.lifeElement.style.position = "absolute"
        this.lifeElement.style.width = "50px"
        this.lifeElement.style.height = "50px"
        this.lifeElement.style.left = `${this.leftPosition}px`
        this.lifeElement.style.top = "50px"
        this.lifeElement.src = "./img/heart.png"
        this.lifeElement.style.zIndex = '5'

        this.Counter = document.createElement('div')
        this.Counter.style.fontSize = "40px"
        this.Counter.style.position = "absolute"
        this.Counter.style.width = "50px"
        this.Counter.style.height = "50px"
        this.Counter.style.left = `${this.counterPosition}px`
        this.Counter.style.fontFamily = "ArcadeClassic"
        this.Counter.style.top = "60px"
        this.Counter.src = "./img/heart.png"
        this.Counter.style.zIndex = '5'
        this.Counter.innerHTML = `${this.lifes}`


        document.querySelector('#game-screen').appendChild(this.lifeElement)
        document.querySelector('#game-screen').appendChild(this.Counter)
    }

    updateLives(lifes) {
        this.Counter.innerHTML = `${lifes}`
    }
}

