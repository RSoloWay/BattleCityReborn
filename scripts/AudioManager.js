export default class AudioManager{
    constructor(context){
        this.theme = context.sound.add('theme',{volume: 0.3});
        this.moving = context.sound.add('moving',{loop: true, volume: 0.3});
        this.background_sound = context.sound.add('nmoving',{loop: true, volume: 0.2});
        this.shoot = context.sound.add('shoot',{loop: false, volume: 0.3});
        this.brickhit = context.sound.add('brickhit',{loop: false, volume: 1});
        this.steelhit = context.sound.add('steelhit',{loop: false, volume: 1});
        this.explode = context.sound.add('explode',{loop: false, volume: 1});
        this.enemy_explode = context.sound.add('enemy_explode',{loop: false, volume: 1});
    }
}