import {score} from './LevelManager.js'

export default class Win extends Phaser.Scene{
    constructor(){
        super({key: 'win',active: false})  
    }

    preload(){

    }

    create(){
        var win = this.make.tilemap({ key: 'win' });
        var tileset = win.addTilesetImage('Ground');
        this.window = win.createLayer('Congratulation', tileset, 0, 0);
        this.matter.world.convertTilemapLayer(this.window);
        this.add.text(200, 250, 'Score: '+score ,{ fontFamily: 'PressStart2P'})
    }
}