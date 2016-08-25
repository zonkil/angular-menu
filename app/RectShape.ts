export class RectShape {
    x:number = 0;
    y:number = 0;

    width:number;
    height:number;

    napis:string = 'Hello world';
    textHeight:number = 20;

    checked:boolean = false;

    constructor(x:number, y:number, napis:string) {
        this.x = x;
        this.y = y;
        this.napis = napis;
    }

    draw(context:CanvasRenderingContext2D) {
        context.save();
        context.font = this.textHeight + 'px sans-serif';

        let measure = context.measureText(this.napis);
        this.width = measure.width + 10;
        this.height = this.textHeight + 4;


        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        if(this.checked){
            context.fillStyle = 'green';
            context.fill();
            context.fillStyle = 'black';
        }
        //context.stroke();
        context.fillText(this.napis, this.x, this.y + this.textHeight);
        context.stroke();

        context.restore();
    }

    public setCheck(){
        this.checked = !this.checked;
    }

    isIn(clickX:Number, clickY:Number):boolean {
        let isX:boolean = false;
        let isY:boolean = false;
        if(clickX >= this.x && clickX <= this.x + this.width){
            isX = true;
        }
        if(clickY >= this.y && clickY <= this.y + this.height){
            isY = true;
        }
        return (isX && isY);
    }
}
