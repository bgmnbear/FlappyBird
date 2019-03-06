class SceneEnd extends Scene {
    constructor(game) {
        super(game)
        game.registerAction('r', function(){
            var s = SceneBegin.new(game)
            game.replaceScene(s)
        })
    }
    draw() {
        // draw labels
        this.game.context.fillText('按 r 重新开始游戏', 100, 100)
    }
    update() {

    }
}
