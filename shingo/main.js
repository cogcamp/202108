var mainScene = new Phaser.Scene("mainScene");

mainScene.create = function() {
    // 初期設定を実行する
    this.config();
    
    // ボール作成
    this.createBall();
    
    // パドル作成
    
    this.createPaddle();
    // スペースキーのクリックでボール発射
    this.input.keyboard.on('keydown-SPACE',function(event){
        if(this.paddle.isStart){
            this.ball.setVelocity(this.ballSpeedX,this.ballSpeedY);
            this.paddle.isStart = false;
        }
    },this);
    
    // ブロック作成
    this.createBlocks();
    
    // ライフのテキスト表示
    this.lifeText = this.add.text(30,20,'ライフ:' +this.life,{
        font:'20px Open Sans',
       fill:'#ff0000'
    });
    //テクスト
     this.Text = this.add.text(170,0,'近未来の稲作:' +this.block,{
        font:'20px Open Sans',
       fill:'#87CEEB'
    });
};

mainScene.update = function() {
    // ボールがシーンの最下部に到達した&注目
   if (this.ball.y >= this.game.config.height - this.ball.width/2){
       this.failToHit();
   }
    // キーボードのカーソルオブジェクトを取得
    var cursors = this.input.keyboard.createCursorKeys();
    var x = 0;
    var y = 0;
    //右カーソルクリック時
    if (cursors.right.isDown){
        x=this.paddle.x+this.paddleSpeed;
        this.paddle.x = Phaser.Math.Clamp(x,52,748);
    }
    //左クリック
           if (cursors.left.isDown){
        x=this.paddle.x-this.paddleSpeed;
        this.paddle.x = Phaser.Math.Clamp(x,52,748);
           }  
           //上クリック（仮）
           if (cursors.up.isDown){
        y=this.paddle.y-this.paddleSpeed;
        this.paddle.y = Phaser.Math.Clamp(x,y,748);
           }      
           if (cursors.down.isDown){
        y=this.paddle.y+this.paddleSpeed;
        this.paddle.y = Phaser.Math.Clamp(x,y,748);
           }   
           
        if (this.paddle.isStart){
            this.ball.setPosition(this.paddle.x,500);
        
    }
    
};

mainScene.config = function() {
    // 背景色の設定
    this.cameras.main.setBackgroundColor('#CCFF33');
    
    // パドルの移動速度
    this.paddleSpeed = 10;
    
    // ボール発射の加速度
    this.ballSpeedX = 0;
    this.ballSpeedY = -300;
    
    // ライフ
    this.life = 50;
};

mainScene.createBall = function() {
    // ボール作成
     this.ball =this.physics.add.image(400,500,'ball1');
    this.ball.setDisplaySize(22,22);
    this.ball.setCollideWorldBounds(true);
    this.ball.setBounce(1);
};

mainScene.createPaddle = function() {
     // パドル作成
    this.paddle = this.physics.add.image(400,550,'paddle1');
     this.paddle.setDisplaySize(100,39);
    this.paddle.setImmovable();
    this.paddle.isStart = true;
    this.physics.add.collider(this.paddle,this.ball,this.hitPaddle,null,this)
    
    
};

mainScene.hitPaddle = function (paddle, ball) {
    // ボールにX方向の角度を設定
    var diff = 0;
    if (ball.x < paddle.x){
        diff =paddle.x-ball.x;
        ball.setVelocityX(-10  * diff);
    }else if (ball.x >paddle.x){
           diff =ball.x-paddle.x;
        ball.setVelocityX(10  * diff);
    }else{
        ball.setVelocityX(0);
    }
    
};

mainScene.createBlocks = function() {
    // 横10列、縦6行並べる
    var blockColors=['blue1','silver1','yellow1','green1','green1','red1'];
    this.blocks = this.physics.add.staticGroup();
    //縦６行
    for(var i =0;i<6;i++){
        for(var j= 0;j<10;j++){
    var color = blockColors[i];
    var block =this.blocks.create(80+j*64,80+i*32,color);
    block.setOrigin(0,0);
    block.setDisplaySize(64,32);
    block.refreshBody();
        }
    }
    this.physics.add.collider(this.ball,this.blocks,this.hitBlock,null,this);
};

mainScene.hitBlock = function (ball, block) {
    // 衝突したブロックを削除
    block.destroy();
    // ブロックの残りを判定
    if (this.blocks.countActive() == 0) {
        // ブロックがなくなると、0.5秒後にゲームクリア
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
    alert("完");

    this.scene.start("startScene");
};

mainScene.failToHit =  function () {
    // ボールを打ち返すことに失敗
    this.ball.setVelocity(0);
    this.paddle.isStart = true;
    // ライフを減らす
    this.life--;
    this.lifeText.text = 'ライフ：' + this.life;
    // ライフが0になると
    if(this.life <= 0) {
        // 0.5秒後にゲームオーバー
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
    alert("あきらめるものか");
    // スタートシーンに移動　以前のものを撤去
   this.scene.start("startScene");
};