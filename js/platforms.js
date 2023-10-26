class Platform {

    constructor(width, heigth, leftPosition, topPosition) {

        this.width = width
        this.heigth = heigth
        this.leftPosition = leftPosition
        this.topPosition = topPosition

        this.init()
    }

    init() {
        console.log('plataform')

        this.platformElement = document.createElement('div')
        this.platformElement.style.position = "absolute"
        this.platformElement.style.width = `${this.width}px`
        this.platformElement.style.height = `${this.heigth}px`
        this.platformElement.style.left = `${this.leftPosition}px`
        this.platformElement.style.top = `${this.topPosition}px`
        this.platformElement.style.backgroundImage = 'url(./img/ladrillos-removebg-preview.png)'

        document.querySelector('#game-screen').appendChild(this.platformElement)

    }
}


