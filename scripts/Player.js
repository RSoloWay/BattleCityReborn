import BaseTank from './BaseTank.js';

export default class Player extends BaseTank {


    constructor(context) {
        super(context);
        this.isMoving = false;
        this.currentDir = 'top';
        this.type = 'Player';
        this.init(context,{x:176, y:416, startDir:'top', tankParams: 'player'})
        this.tank.destroyClass = this.destroyClass.bind(this);
        this.tank.tankType = this.type;
        this.keyDown = this.keyDown.bind(this);
        this.keyUp = this.keyUp.bind(this);
        this.context.input.keyboard.on('keydown', this.keyDown);
        this.context.input.keyboard.on('keyup', this.keyUp);
        this.life = 2;
    }  
    
    keyDown(e) {
        if(!this.isMoving) {
            switch(e.code){
                case 'ArrowUp':
                    this.isMoving = 'ArrowUp';
                    setTimeout(()=>{this.initMove('top')},10);
                    this.currentDir = 'top';
                    this.context.audioManager.moving.play();
                    break;
                case 'ArrowDown':
                    this.isMoving = 'ArrowDown';
                    setTimeout(()=>{this.initMove('bottom')},10);
                    this.currentDir = 'bottom';
                    this.context.audioManager.moving.play();
                    break;
                case 'ArrowRight':
                    this.isMoving = 'ArrowRight';
                    setTimeout(()=>{this.initMove('right')},10);
                    this.currentDir = 'right';
                    this.context.audioManager.moving.play();
                    break;      
                case 'ArrowLeft':
                    this.isMoving = 'ArrowLeft';
                    setTimeout(()=>{this.initMove('left')},10);
                    this.currentDir = 'left';
                    this.context.audioManager.moving.play();
                    break; 
            }
        } 
    }


    keyUp(e){
        if(e.key == this.isMoving) {
            this.stop();
            this.context.audioManager.moving.stop();
            this.isMoving = false;
        }
        if(e.code == 'Space') {
            if(this.bullets.length == 0) {
                this.context.audioManager.shoot.play();
                this.shoot(this.currentDir);
            }
        }
    }
    destroyClass(){
        var explode = this.context.add.sprite(this.tank.x, this.tank.y, 'tank');
        this.context.audioManager.explode.play();
        this.context.anims.create({
            key: "explode",
            frames: this.context.anims.generateFrameNumbers('tank', {frames:[263,264,265]}),
            frameRate: 10,
            repeat: 0
        });
        
         
        explode.anims.play('explode', true);
        explode.scaleX = 1.5;
        explode.scaleY = 1.5;
        explode.on('animationcomplete', ()=>{explode.destroy()});
        this.life--
        if(this.life){
            this.tank.x = 176;
            this.tank.y = 416;
        } else {
            this.context.input.keyboard.off('keydown', this.keyDown);
            this.context.input.keyboard.off('keyup', this.keyUp);
            this.stop();
            this.tank.destroy();
        }
    }
}