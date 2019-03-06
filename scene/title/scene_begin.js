class SceneBegin extends Scene {
    constructor(game) {
        super(game)
        game.registerAction('j', function(){
            var s = SceneTitle.new(game)
            game.replaceScene(s)
        })
    }
    draw() {
        // draw labels
        this.game.context.fillText('按 j 开始游戏', 100, 100)
    }
    update() {

    }
}
