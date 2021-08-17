var mainScene = new Phaser.Scene("mainScene");

mainScene.create = function() {
    // 初期設定を実行
    this.config();
    
    // ボール作成
   this.createBall();
   this.ball=this.physics.add.image(400,500,'ball1');
   this.ball.setDisplaySize(22,22);
   this.ball.setCollideWorldBounds(true);
   this.ball.setBounce(1);
   
}
    
