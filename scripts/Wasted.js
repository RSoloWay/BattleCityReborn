export default class Wasted extends Phaser.Scene{
    constructor(){
        super({key: 'wasted',active: false})  
    }

    preload(){

    }

    create(){
        var baner = this.make.image({ key: 'wasted' });
        baner.scaleX = 0.5;
        baner.scaleY = 0.5;
        baner.x = 250;
        baner.y = 200;
    }
}