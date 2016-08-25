import {Component, ViewChild} from '@angular/core';
import {RectShape} from "./RectShape";


@Component({
    selector: 'my-canvas-shape',
    template: `
        <canvas width="578" height="200" #myCanvas (click)="canvasClick($event)" style="border-style: solid">

        </canvas>
    `
})
export class CanvasShapeComponent {
    @ViewChild('myCanvas') canvasElement:any;
    shapes:Array<RectShape> = [];

    clickX:number;
    clickY:number;

    ngAfterViewInit() {
        var context = this.canvasElement.nativeElement.getContext("2d");

        this.shapes.push(new RectShape(10, 10, 'Hello'));
        this.shapes.push(new RectShape(50, 25, 'world! asdlfkjalsdkjf'));

        this.draw();
    }

    canvasClick(event:any) {
        let offsetLeft = this.canvasElement.nativeElement.offsetLeft;
        let offsetTop = this.canvasElement.nativeElement.offsetTop;
        this.clickX = event.x - offsetLeft;
        this.clickY = event.y - offsetTop;
        this.drawDebug();

        for(let i = this.shapes.length -1; i>=0;  i--){
            let isIn:boolean = this.shapes[i].isIn(this.clickX, this.clickY);
            if(isIn){
                this.shapes[i].setCheck();
                this.draw();
                return;
            }
        }

    }

    draw() {
        var context = this.canvasElement.nativeElement.getContext("2d");
        context.clearRect(0, 0, this.canvasElement.nativeElement.width, this.canvasElement.nativeElement.height);

        for (let rect of this.shapes) {
            rect.draw(context)
        }
        this.drawDebug();
    }

    drawDebug() {
        var context = this.canvasElement.nativeElement.getContext("2d");
        context.clearRect(10, 140, 500, 12);

        context.beginPath();
        context.font = 'italic 10pt Calibri';
        context.fillText('(' + this.clickX + "," + this.clickY + ')', 10, 150);
        context.stroke();
    }
}
