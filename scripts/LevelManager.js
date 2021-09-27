import Enemy from "./Enemy.js";

var EnemyData = ['slow','slow','slow','slow_bonus','slow','slow','slow','slow','slow','slow','slow_bonus','slow','slow','slow','slow','slow','slow','slow_bonus','fast','fast',]
var startX = [240, 48, 432];
const xp = {'slow': 100, 'slow_bonus': 100, 'fast': 200}
export var score = 0;

export default class LevelManager {

    constructor(context) {
        this.allEnemys = [];
        this.directions = ['top', 'bottom', 'right', 'left']
        this.updateLevel = this.updateLevel.bind(this);
        this.increaseScore = this.increaseScore.bind(this)
        this.context = context;
        this.prevInitTime = 0;
        this.startXInd = 0;
        this.enemyIcon = [];
    } 
    
    increaseScore(name){
        score += xp[name]
    }

    startGame() {
        this.createInterface()
        this.updateInterval = setInterval(this.updateLevel, 1000/30);
    }

    createInterface(){
        var iconX;
        var iconY;
        for(var i = 0; i < 20; i++){
            
            if(i == 0){
                iconX = 472;
                iconY = 56;
            } else if(i%2 == 0){
                iconX = 472;
                iconY +=16;
            } else if(i%2 != 0 ){
                iconX +=16;
            }
            var icon = this.context.add.sprite(iconX, iconY, 'interface', 3);
            this.enemyIcon.push(icon)
        }
        this.context.add.sprite(472, 376, 'interface', 0);
        this.context.add.sprite(488, 376, 'interface', 1);
        this.context.add.sprite(472, 392, 'interface', 2);
        this.lifeCounter = this.context.add.text(485, 382, this.context.player.life,{ fontFamily: 'PressStart2P', metrics: {ascent:16, descent:16,fontSize: 16}})
    }

    updateLevel(){


        this.lifeCounter.text = this.context.player.life;

        if(this.context.enemyCounter == 20){
            clearInterval(this.updateInterval);
            
            setTimeout(()=>{
                this.context.scene.start('win');
                this.allEnemys.forEach(element => {
                    element.stop();
                });
                this.context.sound.stopAll();
                this.context.scene.remove('level');
            }, 1000)
        }
        if(this.lifeCounter.text == 0){
            clearInterval(this.updateInterval);
            
            setTimeout(()=>{
                this.context.scene.start('wasted');
                this.allEnemys.forEach(element => {
                    element.stop();
                });
                this.context.sound.stopAll();
                this.context.scene.remove('level');
            }, 1000)
        }
        if(this.allEnemys.length<4 && EnemyData.length>0 &&new Date().getTime()- this.prevInitTime  >= 3000){
            new Enemy(this.context, {x:startX[this.startXInd], y:32, startDir: 'bottom', tankParams: EnemyData[0]});
            if(this.startXInd == 2){
                this.startXInd = 0;
            } else {
                this.startXInd++;
            }
            this.prevInitTime = new Date().getTime();
            EnemyData.shift()
        } 
        
        var seed = Math.round(Math.random()*255)
        this.allEnemys.forEach(element => {
            var newTime = new Date().getTime();            
            if(Math.floor(element.x) % 16 == 0 && Math.floor(element.y) % 16 == 0 && seed%8==0 && element.prevTime - newTime > 1000){
                element.prevTime = newTime;
                this.stop();
                setTimeout(()=>{
                    try{
                        element.initMove(this.directions[Math.floor(Math.random()*100)%4])
                    } catch(err) {
                        console.log(err);
                    }
                },100);
            }
        });
    }
}