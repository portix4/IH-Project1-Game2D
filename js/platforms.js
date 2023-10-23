class Platform {

    constructor(width, heigth, leftPosition, topPosition) {

        this.width = width
        this.heigth = heigth
        this.leftPosition = leftPosition
        this.topPosition = topPosition

        this.init()
    }

    init() {

        this.platformElement = document.createElement('div')
        this.platformElement.style.position = "absolute"
        this.platformElement.style.width = `${this.width}px`
        this.platformElement.style.height = `${this.heigth}px`
        this.platformElement.style.left = `${this.leftPosition}px`
        this.platformElement.style.top = `${this.topPosition}px`
        this.platformElement.style.backgroundColor = "rgb(116, 63, 10)"

        document.querySelector('#game-screen').appendChild(this.platformElement)

    }
}


