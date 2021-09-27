import BaseTank from './BaseTank.js';


var directions = ['top', 'bottom', 'right', 'left']

export default class Enemy extends BaseTank {


    constructor(context, params) {
        super(context);
        this.context = context;
        this.params = params;
        this.currentDir = params.startDir;
        this.type = 'Enemy'
        this.init(context, params);
        this.tank.tankType = this.type;
        this.initMove(params.startDir);
        this.shoot(this.currentDir);
        this.prevTime = 0;
        context.manager.allEnemys.push(this);
        this.tank.destroyClass = this.destroyClass.bind(this);
        this.tank.setOnCollideActive(()=>{
            var newTime = new Date().getTime();
            if(Math.floor(Math.random()*255)%64 && newTime - this.prevTime > 1000){
                this.prevTime = newTime;
                this.stop()
                setTimeout(()=>{
                    if(this.type){
                        var i = Math.floor(Math.random()*100)%4
                        this.initMove(directions[i])
                        this.currentDir = directions[i];
                    }
                },100);
            }
        })

    }

    destroyClass(){
        console.log('sadsd')
        for(var i=0; i<this.context.manager.allEnemys.length; i++){
            if(this == this.context.manager.allEnemys[i]){
                this.stop();
                this.type = null;
                this.context.manager.allEnemys.splice(i, 1);
                this.context.manager.prevTime = 0;
                this.context.audioManager.enemy_explode.play();
                var explode = this.context.add.sprite(this.tank.x, this.tank.y, 'tank');
                this.context.anims.create({
                    key: "explode",
                    frames: this.context.anims.generateFrameNumbers('tank', {frames:[263,264,265]}),
                    frameRate: 10,
                    repeat: 0
                });
                explode.anims.play('explode', true);
                explode.on('animationcomplete', ()=>{explode.destroy()});
                break;
            }
        }
        this.context.manager.increaseScore(this.params.tankParams)
        this.context.manager.enemyIcon.pop().destroy();
        this.context.enemyCounter++
    }
}