let prizes_config = {
    count: 12,
    prize_names: ["3000 Credits", "35% Off", "Hard Luck", "70% Off", "Swagpack", "100% Off", "Netflix", "50% Off", "Amazon Voucher", "2 Extra Spin", "CB TShirt", "CB Book"]
}

let config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,

    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);

function preload() {
    // Using Load Object, Load Some Images
    this.load.image('background', '../Assets/back.jpg');
    this.load.image('wheel', '../Assets/wheel.png');
    this.load.image('pin', '../Assets/pin.png');
    this.load.image('stand', '../Assets/stand.png');
    
}

function create() {
    // Create The Background Image
    let W = game.config.width;
    let H = game.config.height;
    let background = this.add.sprite(0, 0, 'background');
    background.setPosition(W/2, H/2);
    background.setScale(0.20)
    
    // Create A Wheel Object
    this.wheel = this.add.sprite(W/2, H/2, "wheel");
    this.wheel.setScale(0.25);
    this.wheel.depth = 1;
    
    // Create A Pin Object
    let pin = this.add.sprite(W/2, H/2 - 250, "pin");
    pin.setScale(0.25);
    pin.depth = 2;
    
    // Create The Stand
    let stand = this.add.sprite(W/2, H/2 + 250, "stand");
    stand.setScale(0.25);
    stand.depth = 0;
    
    // Event Listener For Mouse-Click
    this.input.on("pointerdown", spinwheel, this);

    // Create A Text Object
    font_style = {
        font: "bold 30px Arial",
        align: "center",
        color: "red"
    }
    this.game_text = this.add.text(10,10, "Welcome To Spin & Win !", font_style);
    
}

// Game Loop
function update() {
    
}

function spinwheel() {
    let rounds = Phaser.Math.Between(2, 4);
    let degrees = Phaser.Math.Between(0, 11) * 30;
    let total_angle = rounds*360 + degrees;
    
    let idx = (prizes_config.count - 1) - (Math.floor(degrees/(360/prizes_config.count)));
    
    tween = this.tweens.add({
       targets: this.wheel,
       angle: total_angle,
       ease: "Cubic.easeOut",
       duration: 6000,
       callbackScope: this,
       onComplete: function() {
           this.game_text.setText("You Got : " + prizes_config.prize_names[idx]);
       }
    });
}