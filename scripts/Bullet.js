const directionAngle = {
    'left': 0,
    'right': 180 * Math.PI/180,
    'top': 90 * Math.PI/180,
    'bottom': 270 * Math.PI/180
};
export default class Bullet{

    constructor(parent, direction, tankPos){
        this.context = parent.context;
        this.parent = parent;
        this.startParam = {};
        this.dir = direction;
        this.calcStartParams(direction, tankPos);
        this.init()
        this.isActive = true;
    }
    
    init(){
        this.bullet = this.context.matter.add.sprite(this.startParam.x, this.startParam.y, 'Bullet', 0);
        this.bullet.rotation= directionAngle[this.dir];
        this.bullet.setVelocity(this.startParam.velX, this.startParam.velY); 
        this.bullet.parentType = this.parent.type; 
        this.bullet.setSensor(true);
        this.bullet.deactivated = this.deactivated.bind(this)
        this.bullet.displayWidth = this.bullet.displayWidth * 1.3;
        this.bullet.displayHeight = this.bullet.displayHeight * 1.5;
        this.bullet.setFriction(0);
        this.bullet.setFrictionStatic(0);
        this.bullet.setFrictionAir(0);
        this.bullet.setOnCollideActive((body)=>{
            
            var gameObjA = body.bodyA.gameObject;
            var gameObjB = body.bodyB.gameObject;
            if(this.isActive && gameObjA.tile && gameObjA.tile.layer.name == 'WorldBorder' && this.parent.type == 'Player'){
                this.context.audioManager.steelhit.play();
            }
            if(this.isActive && gameObjA.tile && gameObjA.tile.layer.name == 'WallLayer')
            {
                var tileX = gameObjA.tile.x,
                tileY = gameObjA.tile.y,
                tile = this.context.wallLayer.getTileAt(tileX, tileY);

                if(tile.index != 5){
                    if(this.parent.type == 'Player'){
                        this.context.audioManager.brickhit.play();
                    }
                    this.context.wallLayer.removeTileAt(tileX, tileY);
                    gameObjA.destroy();
                } else if(tile.index == 5 && this.parent.type == 'Player') {
                    this.context.audioManager.steelhit.play();
                }

            } else if(this.isActive && gameObjA.texture && gameObjA.texture.key == 'tank' && gameObjA.tankType != this.parent.type){
                gameObjA.destroyClass();
                if(gameObjA.tankType == 'Enemy') {
                    gameObjA.destroy();
                }
            } else if(this.isActive && gameObjA.texture && gameObjA.texture.key == 'tank' && gameObjA.tankType == this.parent.type){
                return;
            } else if(this.isActive && gameObjA.texture && gameObjA.texture.key == 'Bullet'&& gameObjB.texture && gameObjB.texture.key == 'Bullet' && gameObjB.parentType == this.parent.type) {
                return;
            } else if(this.isActive && gameObjA.texture && gameObjA.texture.key == 'Bullet'  && gameObjB.texture && gameObjB.texture.key == 'Bullet'){
                gameObjB.deactivated();
            } 
            this.parent.bullets.pop();
            this.bullet.destroy()
            if(this.parent.type == 'Enemy'){
                setTimeout(()=>{
                    try{
                        this.parent.shoot(this.parent.currentDir);
                    } catch(err){
                        console.log(err)
                    }
                    
                },500);
            }
        });
    }

    deactivated() {
        this.isActive = false;
    }

    calcStartParams(dir, tankPos){
        if(dir == 'top') {
            this.startParam.x = tankPos[0];
            this.startParam.y = tankPos[1] - 17;
            this.startParam.velX = 0;
            this.startParam.velY = -5;
        } else if(dir == 'bottom') {
            this.startParam.x = tankPos[0];
            this.startParam.y = tankPos[1] + 17;
            this.startParam.velX = 0;
            this.startParam.velY = +5;
        } else if(dir == 'right') {
            this.startParam.x = tankPos[0] + 16;
            this.startParam.y = tankPos[1];
            this.startParam.velX = +5;
            this.startParam.velY = 0;
        } else if(dir == 'left') {
            this.startParam.x = tankPos[0] - 17;
            this.startParam.y = tankPos[1];
            this.startParam.velX = -5;
            this.startParam.velY = 0;
        }
    }

}