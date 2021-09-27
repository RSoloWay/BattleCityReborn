import Level from './Level.js';
import Wasted from './Wasted.js';
import WinWindow from './WinWindow.js';

class Menu extends Phaser.Scene{
    constructor(context){
        super({key: 'menu', active: true});
        this.context = context
    }
    init(){
        console.log('INit Menu')
    }

    preload(){
        this.load.spritesheet('tank', 'assets/graphics/Tanks.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('interface', 'assets/graphics/interface.png',{frameWidth: 16, frameHeight: 16})
        this.load.tilemapTiledJSON('menu', 'assets/graphics/Menu.json');
        this.load.tilemapTiledJSON('win', 'assets/graphics/WinWindow.json');
        this.load.tilemapTiledJSON('map', 'assets/graphics/wallmap.json');
        this.load.image('Ground', 'assets/graphics/Ground.png');
        this.load.image('Bullet', 'assets/graphics/Bullet.png');
        this.load.image('wasted', 'assets/graphics/wasted.jpg');
        this.load.audio('theme', 'assets/audio/levelstarting.ogg');
        this.load.audio('moving', 'assets/audio/moving.ogg');
        this.load.audio('nmoving', 'assets/audio/nmoving.ogg');
        this.load.audio('shoot', 'assets/audio/shoot.ogg');
        this.load.audio('brickhit', 'assets/audio/brickhit.ogg');
        this.load.audio('steelhit', 'assets/audio/steelhit.ogg');
        this.load.audio('explode', 'assets/audio/fexplosion.ogg');
        this.load.audio('enemy_explode', 'assets/audio/eexplosion.ogg');
    }

    create(){
        console.log('Create Menu');
        var menu = this.make.tilemap({ key: 'menu' });
        var tileset = menu.addTilesetImage('Ground');
        this.menuTitle = menu.createLayer('MenuTitle', tileset, 0, 0);
        this.menuTitle.setCollisionByProperty({ collides: true });
        this.matter.world.convertTilemapLayer(this.menuTitle);
        this.add.text(200, 400, 'Press ENTER to start',{ fontFamily: 'PressStart2P'})
        this.input.keyboard.on('keydown', (e)=>{
            if(e.code == 'Enter'){
                this.scene.stop('menu');
                this.scene.start('level');
            }
        });
    }
}

// class Level extends Phaser.Scene{
//     constructor(){
//         super({key: 'level',active: false})  
//     }

//     create(){
//         var map = this.make.tilemap({ key: 'map' });
//         var tileset = map.addTilesetImage('Ground');
//         this.wallLayer = map.createLayer('WallLayer', tileset, 0, 0);
//         this.wallLayer.setCollisionByProperty({ collides: true });
//         this.matter.world.convertTilemapLayer(this.wallLayer);
//         this.border = map.createLayer('WorldBorder', tileset, 0, 0);
//         this.border.setCollisionByProperty({ collides: true });
//         this.matter.world.convertTilemapLayer(this.border);
//         new Player(this)
//         this.manager = new EnemyManager(this);
//         new Enemy(this)
//         this.matter.world.on('collisionstart',(...bodies)=>{
//             // bodies[2].destroy();

//             debugger
//         } )
        
//     }
// }

var config = {
    type: Phaser.AUTO,
    width: 512,
    height: 448,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'matter',
        matter: {
            gravity: {y: 0},
            enableSleep: false,
            debug: false
        },
    },
    scene: [
        new Menu(game),
        new Level(),
        new WinWindow(),
        new Wasted()
    ]
    
};
var game = new Phaser.Game(config);