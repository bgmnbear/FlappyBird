class Image {
    constructor(game, name) {
        this.game = game
        this.texture = game.textureByName(name)
        this.x = 0
        this.y = 0
        this.w = this.texture.width
        this.h = this.texture.height
        //
        this.flipY = false
        this.rotation = 0
        //
        this.name = name
        this.alive = true
    }
    static new(game, name) {
        var i = new this(game, name)
        return i
    }
    draw() {
        if(this.alive) {
            this.game.drawImage(this)
        }
    }
    update() {

    }
}
