export default class Base{
    constructor(context){
        this.context = context;
        this.base = this.context.matter.add.sprite(240, 416, 'tank', 92);
        this.context.isBase = true;
        this.base.destroyClass = this.destroyClass.bind(this);
    }
    
    destroyClass(){
        if(this.context.isBase) {
            this.base.destroy();
            this.base = this.context.matter.add.sprite(240, 416, 'tank', 93);
            this.base.destroyClass = this.destroyClass.bind(this);   
            this.context.isBase = false;
        }
    }
    
}