class SceneEnd extends GuaScene {
    constructor(game) {
        super(game)
        game.registerAction('r', function(){
            var s = SceneTitle.new(game)
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
