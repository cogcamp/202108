
var loadScene = new Phaser.Scene("loadScene");

loadScene.preload = function () {
    // スタート画像
    this.load.image('startButton', 'assets/images/invaderstart.gif');

    // パドル画像
    this.load.image('paddle1','./assets/images/paddle1.png');
    this.load.image('minecraft','./assets/images/steve.png')
    this.load.image('kick','./assets/images/kick.png');

    // ブロック画像
    this.load.image('mariobox','./assets/images/luckybox.png');
    this.load.image('brokenbrick','./assets/images/brokenbrick.png');
    this.load.image('coolshape','./assets/images/coolshpe.png');
    this.load.image('ammo','./assets/images/ammo.png');
    this.load.image('greenrick','./assets/images/dead rick.png');
    this.load.image('pow','./assets/images/pow.png');
    this.load.image('battery','./assets/images/battery.png');
    this.load.image('yellow2','./assets/images/yellow2.png');
    this.load.image('purple1','./assets/images/purple1.png');
    this.load.image('purple2','./assets/images/purple2.png');
    this.load.image('meeseeks','./assets/images/meeseeks.png');
    this.load.image('silver2','./assets/images/silver2.png');
    
    // ボール画像
    this.load.image('mario','./assets/images/mario.png');
    this.load.image('ball2','./assets/images/ball2.png');
    this.load.image('morty','./assets/images/morty.png');
};

loadScene.create = function() {
    // スタートシーンを自動的に開始します
    this.scene.start("startScene");
};
