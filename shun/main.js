var mainScene = new Phaser.Scene("mainScene");

mainScene.create = function() {
    // 初期設定を実行する
    this.config();
    
    // ボール作成
    this.createBall();

    
    // パドル作成
    this.createPaddle();
    
    //スペースキーのクリックでボール発射
    this.input.keyboard.on('keydown-SPACE',function(event){
        //ゲーム開始状態ならば
        if (this.paddle.isStart){
            //ボール発射
            this.ball.setVelocity(this.ballSpeedX, this.ballSpeedY);
            this.paddle.isStart = false;
        }
    },this);
    
    // ブロック作成
    this.createBlocks();
    
    // ライフのテキスト表示
    this.lifeText = this.add.text(30,20, 'ライフ:'  + this.life, {
        font: '20px open Sans',
        fill: '#ff0000'

      });
    };

mainScene.update = function() {
    // ボールがシーンの最下部に到達した]
    if (this.ball.y >= this.game.config.height - this.ball.width / 2) {
        this.failToHit();
    }
    
    // キーボードのカーソルオブジェクトを取得
    var cursors = this.input.keyboard.createCursorKeys();
    var x = 0;
    // 右カーソルをクリックすると
    if(cursors.right.isDown){
        x = this.paddle.x + this.paddleSpeed;
       this.paddle.x =Phaser.Math.Clamp(x, 52,748);
    }
    //　左カーソルをクリックすると
     if(cursors.left.isDown){
        x = this.paddle.x - this.paddleSpeed;
        this.paddle.x =Phaser.Math.Clamp(x, 52,748);
     }
    //　パドルの上にボールが乗っているなら
    if(this.paddle.isStart) {
        this.ball.setPosition(this.paddle.x, 500);
    }
};

mainScene.config = function() {
    // 背景色の設定
    this.cameras.main.setBackgroundColor('#cccccc');
    
    // パドルの移動速度
    this.paddleSpeed = 18 
    // ボール発射の加速度
    this.ballSpeedX = 20;
    this.ballSpeedY = -300;
    
    // ライフ
    this.life = 0
};

mainScene.createBall = function() {
    // ボール作成
    this.ball = this.physics.add.image(400,500, 'ball1');
    this.ball.setDisplaySize(22,22);
    this.ball.setCollideWorldBounds(true);
    this.ball.setBounce(1);
};

mainScene.createPaddle = function() {
     // パドル作成
     this.paddle = this.physics.add.image(400,550, 'paddle1');
     this.paddle.setDisplaySize(104,24);
     this.paddle.setImmovable();
     this.paddle.isStart = true;
    this.physics.add.collider(this.paddle, this.ball, this.hitPaddle, null, this)
};

mainScene.hitPaddle = function (paddle, ball) {
    // ボールにX方向の角度を設定
    var diff = 0;
    if (ball.x < paddle.x) {
        // ボールがパドルの左側に衝突
        diff = paddle.x - ball.x;
        ball.setVelocityX(-10 * diff);
    } else if (ball.x > paddle.x) {
        //ボールがパドルの右側に衝突
        diff = ball.x -paddle.x;
        ball.setVelocityX(10 * diff);
} else {
    // x方向の加速度なし
    ball.setVelocityX(0);
}
};

mainScene.createBlocks = function() {
    // 縦10列,横10行並べる
    //ブロックの色の配列
    var blockColors= ['red2' , 'green2' , 'yellow2' , 'silver2' , 'blue2', 'purple2' ];
    
    //物理エンジンの対象固定オブジェクトグループ作成
    this.blocks = this.physics.add.staticGroup();
    
    //縦に12行
    for(var i = 0; i < 12; i++) {
        // 横に１０列
        for( var j = 0; j < 10; j++) {
            var color = blockColors[i];
            var block = this.blocks.create(80 + j * 64, 80 + i * 32, color);
            block.setOrigin(0,0);
            block.setDisplaySize(64, 32);
            block.refreshBody();
        }
    }
    
    
    
    this.physics.add.collider(this.ball, this.blocks, this.hitBlock, null, this);
};

mainScene.hitBlock = function (ball, block) {
    // 衝突したブロックを削除
    block.destroy();
    // ブロックの残りを判定
    if (this.blocks.countActive() == 0) {
        // ブロックがなくなると、1.0秒後にゲームクリア
        this.time.addEvent({
            duration: 500,
            callback: this.gameClear,
            loop: false,
            callbackScope: this,
        });
    }
};

mainScene.gameClear = function() {
    // ゲームクリア
    var life =8;
    
    if ( life == 10) {
        console.log(' パーフェクトです');
    } else if( life >= 9) {
        console.log('かなり良い点数です');
    } else if( life >= 8 ) {
        console.log('良い点数です');
    } else if( life >= 7 ) {
        console.log('普通の点数です');
    } else {
        console.log('頑張ろう');
    }
    // スタートシーンに移動
    this.scene.start("startScene");
};

mainScene.failToHit =  function () {
    // ボールを打ち返すことに失敗
    this.ball.setVelocity(-10);
    this.paddle.isStart = true;
    // ライフを減らす
    this.life--;
    this.lifeText.text = 'ライフ：' + this.life;
    // ライフが-100になると
    if(this.life <= -100) {
        // 1秒後にゲームオーバー
        this.time.addEvent({
            duration: 500,
            callback: this.gameOver,
            loop: false,
            callbackScope: this,
        });
    }
};

mainScene.gameOver = function() {
    // ゲームオーバー
    alert("ゲームオーバー");
    // スタートシーンに移動
    this.scene.start("startScene");
};
