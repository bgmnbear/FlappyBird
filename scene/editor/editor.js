var Editor = function(game, n) {
    n = n - 1
    var level = levels_by_editor[n]
    var blocks = []
    // 关卡编辑
    game.canvas.addEventListener('mousedown', function(event) {
        var x = event.offsetX
        var y = event.offsetY
        // log(x, y, event)
    })
    game.canvas.addEventListener('mouseup', function(event) {
        var x = event.offsetX
        var y = event.offsetY
        // log(x, y, 'up')
    })
    // 关卡载入
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(game, p)
        blocks.push(b)
    }
    return blocks
}
