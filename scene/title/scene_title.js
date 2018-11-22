class Pipes {
    constructor(game) {
        this.game = game
        this.pipes = []
        this.pipeSpace = 150
        this.管子横向间距 = 150
        this.columsOfPipe = 3
        this.currentPipeDown = null
        this.currentPipeUp = null
        for (var i = 0; i < this.columsOfPipe; i++) {
            var p1 = GuaImage.new(game, 'pipe_down')
            p1.flipY = true
            p1.x = 500 + i * this.管子横向间距
            var p2 = GuaImage.new(game, 'pipe_up')
            p2.x = p1.x
            this.resetPipesPosition(p1, p2)
            this.pipes.push(p1)
            this.pipes.push(p2)

            if (i == 0) {
              this.currentPipeDown = p1
              this.currentPipeUp = p2
            }
        }
    }
    static new(game) {
        return new this(game)
    }
    resetPipesPosition(p1, p2) {
        p1.y = randomBetween(-200, 0)
        p2.y = p1.y + p1.h + this.pipeSpace
    }
    collide(b) {
      let p1 = this.currentPipeDown
      let p2 = this.currentPipeUp
      if (b.y > p1.y && b.y < p1.y + p1.h) {
          if (b.x > p1.x && b.x < p1.x + p1.w) {
              return true
          }
      }
      if (b.y > p2.y && b.y < p2.y + p2.h) {
          if (b.x > p2.x && b.x < p2.x + p2.w) {
              return true
          }
      }
      return false
    }
    score() {
      window.score += 10
    }
    debug() {
        this.管子横向间距 = config.管子横向间距.value
        this.pipeSpace = config.pipe_space.value
    }
    update() {
        for (var i = 0; i < this.pipes.length / 2; i += 2) {
            var p1 = this.pipes[i]
            var p2 = this.pipes[i+1]
            p1.x -= 5
            p2.x -= 5
            if (p1.x < -100) {
                p1.x += this.管子横向间距 * this.columsOfPipe
            }
            if (p2.x < -100) {
                p2.x += this.管子横向间距 * this.columsOfPipe
                this.resetPipesPosition(p1, p2)
            }

            if (p1.x == 200) {
              this.currentPipeDown = p1
              this.currentPipeUp = p2
            }
            if (p1.x == 100) {
              this.score()
            }
        }
    }
    draw() {
        var context = this.game.context
        for (var p of this.pipes) {
            context.save()

            var w2 = p.w / 2
            var h2 = p.h / 2
            context.translate(p.x + w2, p.y + h2)
            var scaleX = p.flipX ? -1 : 1
            var scaleY = p.flipY ? -1 : 1
            context.scale(-1, 1)
            context.rotate(p.rotation * Math.PI / 180)
            context.translate(-w2, -h2)

            context.drawImage(p.texture, 0, 0)

            context.restore()
        }
    }
}
class Score {
  constructor(game) {
    this.game = game
    this.score = window.score
  }
  update() {
    this.score = window.score
  }
  static new(game) {
      return new this(game)
  }
  draw() {
    var ctx = document.getElementById('id-canvas').getContext('2d');
    ctx.fillText(this.score, 10, 50);
  }
}
class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        // var label = GuaLabel.new(game, 'hello from gua')
        // this.addElement(label)

        // bg
        var bg = GuaImage.new(game, 'bg')
        this.addElement(bg)
        // 加入分数
        window.score = 0
        this.score = Score.new(game)
        this.addElement(this.score)
        // 加入水管
        this.pipe = Pipes.new(game)
        this.addElement(this.pipe)
        // 循环移动的地面
        this.grounds = []
        for (var i = 0; i < 30; i++) {
            var g = GuaImage.new(game, 'ground')
            g.x = i * 15
            g.y = 450
            this.addElement(g)
            this.grounds.push(g)
        }
        this.skipCount = 4
        // bird
        this.birdSpeed = 2
        var b = GuaAnimation.new(game)
        b.x = 100
        b.y = 180
        this.b = b
        this.addElement(b)

        this.setupInputs()
    }
    debug() {
        this.birdSpeed = config.bird_speed.value
    }
    update() {
        super.update()
        // 地面移动
        this.skipCount--
        var offset = -5
        if (this.skipCount == 0) {
            this.skipCount = 4
            offset = 15
        }
        for (var i = 0; i < 30; i++) {
            var g = this.grounds[i]
            g.x += offset
        }
        // 碰撞检测
        var hitPipe = this.pipe.collide(this.b)
        var hitGround = (this.b.y > 410)
        if (hitPipe || hitGround) {
          var end = SceneEnd.new(this.game)
          this.game.replaceScene(end)
        }
    }
    setupInputs() {
        var self = this
        var b = this.bird
        self.game.registerAction('a', function(keyStatus){
            self.b.move(-self.birdSpeed, keyStatus)
        })
        self.game.registerAction('d', function(keyStatus){
            self.b.move(self.birdSpeed, keyStatus)
        })
        self.game.registerAction('j', function(keyStatus){
            self.b.jump()
        })

    }
}
