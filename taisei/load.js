
var loadScene = new Phaser.Scene("loadScene");

loadScene.preload = function () {
    // スタート画像
    this.load.image('startButton', 'assets/images/invaderstart.gif');
    // パドル画像
    this.load.image('paddle1','./assets/images/paddle1.png');
    this.load.image('minecraft','./assets/images/steve.png')
    this.load.image('kick','./assets/images/boot.png');

    // ブロック画像
    this.load.image('mariobox','./assets/images/luckybox.png');
    this.load.image('brokenbrick','./assets/images/brokenbrick.png');
    this.load.image('cool','./assets/images/cool.png');
    this.load.image('ammo','./assets/images/ammo.png');
    this.load.image('greenrick','./assets/images/dead rick.png');
    this.load.image('jar','./assets/images/jar.png');
    this.load.image('battery','./assets/images/battery.png');
    this.load.image('laser','./assets/images/laser.png');
    this.load.image('purple1','./assets/images/purple1.png');
    this.load.image('purple2','./assets/images/purple2.png');
    this.load.image('baby','./assets/images/Roshan.png');
    this.load.image('enemy','./assets/images/bed.png');
    
    // ボール画像
    this.load.image('mario','./assets/images/mario.png');
    this.load.image('ball2','./assets/images/ball2.png');
    this.load.image('morty','./assets/images/morty.png');
};

loadScene.create = function() {
    // スタートシーンを自動的に開始します
    this.scene.start("startScene");
};
