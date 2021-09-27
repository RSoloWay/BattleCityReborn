import Bullet from "./Bullet.js";

const TANK_PARAMS = {
    'slow':{
        startFrame: 4,
        animatioFrame: [4,36],
        moveDelay: 15,
        xp: 100
    },
    'slow_bonus':{
        startFrame: 0,
        animatioFrame: [0,32],
        moveDelay: 15,
        xp: 100
    },
    'fast': {
        startFrame: 68,
        animatioFrame: [68,100],
        moveDelay: 7,
        xp: 200
    },
    'player': {
        startFrame: 20,
        animatioFrame: [20,52],
        moveDelay: 10
    }
}

const directionAngle = {
    'top': 0,
    'bottom': 180 * Math.PI/180,
    'right': 90 * Math.PI/180,
    'left': 270 * Math.PI/180
};

export default class BaseTank{

    
    constructor() {
        this.moveTic = null;
        this.bullets = [];
        this.init = this.init.bind(this);
    }
    
    init(context, params){
        this.x=params.x;
        this.y=params.y;
        this.tankParams = params.tankParams;
        this.context = context;
        this.moveDelay = TANK_PARAMS[this.tankParams].moveDelay;
        this.tank = this.context.matter.add.sprite(params.x, params.y, 'tank', TANK_PARAMS[this.tankParams].startFrame);
        this.context.anims.create({
            key: this.tankParams,
            frames: this.context.anims.generateFrameNumbers('tank', {frames:TANK_PARAMS[this.tankParams].animatioFrame}),
            frameRate: 10,
            repeat: -1
        });
        this.tank.rotation = directionAngle[params.startDir]
        this.tank.displayWidth = 31;
        this.tank.displayHeight = 31;
    }
    

    initMove(dir){
        clearInterval(this.moveTic);
        this.tank.rotation = directionAngle[dir];
        switch(dir){
            case 'top':
                this.tank.x = this.x = this.autoPilot(this.tank.x);
                this.moveTic = setInterval(()=>{
                    this.tank.y--;
                    this.y = Math.ceil(this.tank.y) + 1;
                },this.moveDelay);
                this.tank.anims.play(this.tankParams, true);
                break;
            case 'bottom':
                this.tank.x = this.x = this.autoPilot(this.tank.x);
                this.moveTic = setInterval(()=>{
                    this.tank.y++;
                    this.y = this.tank.y - 1;
                },this.moveDelay);
                this.tank.anims.play(this.tankParams, true);
                break;
            case 'right':
                this.tank.y = this.y = this.autoPilot(this.tank.y);
                this.moveTic = setInterval(()=>{
                    this.tank.x++;
                    this.x = this.tank.x - 1;
                },this.moveDelay);
                this.tank.anims.play(this.tankParams, true);
                break;
            case 'left':
                this.tank.y = this.y = this.autoPilot(this.tank.y);
                this.moveTic = setInterval(()=>{
                    this.tank.x--;
                    this.x = Math.ceil(this.tank.x + 1);
                },this.moveDelay);
                this.tank.anims.play(this.tankParams, true);
                break;
        }
    }

    autoPilot(coord){

        if(coord%16>0 && coord%16  < 8){
            return coord - coord%16;
        } else if(coord%16>=8) {
            return coord + (16 - coord%16)
        } else {
            return coord
        }
    }

    stop(){
        clearInterval(this.moveTic);
        this.tank.anims.stop(this.tankParams, true);
    }

    shoot(direction){
        if(this.bullets.length == 0&&this.type){
            this.bullets.push(new Bullet(this,direction, [this.tank.x, this.tank.y]));
        }
    }

}