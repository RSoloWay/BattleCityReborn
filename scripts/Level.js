import AudioManager from "./AudioManager.js";
import Base from "./Base.js";
import LevelManager from "./LevelManager.js";
import Player from "./Player.js";


export default class Level extends Phaser.Scene{
    constructor(){
        super({key: 'level',active: false})  
    }

    preload(){
        this.audioManager = new AudioManager(this);
    }

    create(){
        
        this.audioManager.theme.play();
        this.audioManager.background_sound.play()
        var map = this.make.tilemap({ key: 'map' });
        var tileset = map.addTilesetImage('Ground');
        this.wallLayer = map.createLayer('WallLayer', tileset, 0, 0);
        this.wallLayer.setCollisionByProperty({ collides: true });
        this.matter.world.convertTilemapLayer(this.wallLayer);
        this.border = map.createLayer('WorldBorder', tileset, 0, 0);
        this.border.setCollisionByProperty({ collides: true });
        this.matter.world.convertTilemapLayer(this.border);
        this.isLevelActive = true;
        this.player = new Player(this)
        this.base = new Base(this)
        this.manager = new LevelManager(this);
        this.manager.startGame();
        this.enemyCounter = 0;
    }
}