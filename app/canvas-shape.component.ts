import {Component, ViewChild, HostListener} from '@angular/core';
import {RectShape} from "./RectShape";


@Component({
    selector: 'my-canvas-shape',
    template: `
        <canvas width="578" height="200" #myCanvas  style="border-style: solid; cursor: pointer;">

        </canvas>
    `
})
export class CanvasShapeComponent {
    @ViewChild('myCanvas') canvasElement:any;
    shapes:Array<RectShape> = [];

    clickX:number;
    clickY:number;

    mouseDown:boolean = false;
    downX:number = 0;
    downY:number = 0;

    dragRect:RectShape = null;

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

        for (let i = this.shapes.length - 1; i >= 0; i--) {
            let isIn:boolean = this.shapes[i].isIn(this.clickX, this.clickY);
            if (isIn) {
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

    @HostListener('mouseup')
    onMouseup() {
        this.mouseDown = false;
        if (this.dragRect != null) {
            this.dragRect.setDrag(false);
        }
        this.draw();
    }

    @HostListener('mousemove', ['$event'])
    onMousemove(event:MouseEvent) {
        if (this.mouseDown && this.dragRect !== null) {
            let offsetLeft = this.canvasElement.nativeElement.offsetLeft;
            let offsetTop = this.canvasElement.nativeElement.offsetTop;
            let dX = event.x - offsetLeft;
            let dY = event.y - offsetTop;

            //this.drawDebug();
            this.dragRect.move(dX - this.downX, dY - this.downY);
            this.draw();
            this.downX = dX;
            this.downY = dY;
        }
    }

    @HostListener('mousedown', ['$event'])
    onMousedown(event) {
        this.mouseDown = true;
        this.dragRect = this.findRect(event);
        if (this.dragRect !== null) {
            this.dragRect.setDrag(true);
            let offsetLeft = this.canvasElement.nativeElement.offsetLeft;
            let offsetTop = this.canvasElement.nativeElement.offsetTop;
            this.downX = event.x - offsetLeft;
            this.downY = event.y - offsetTop;
            this.draw();
        }

    }

    @HostListener('drop', ['$event'])
    onDrop(event) {
        console.log(event);
    }

    @HostListener('dragover', ['$event'])
    onDragOver(event) {
        console.log(event);
        event.preventDefault();
    }

    findRect(event:any):RectShape {
        let offsetLeft = this.canvasElement.nativeElement.offsetLeft;
        let offsetTop = this.canvasElement.nativeElement.offsetTop;
        this.clickX = event.x - offsetLeft;
        this.clickY = event.y - offsetTop;
        this.drawDebug();

        for (let i = this.shapes.length - 1; i >= 0; i--) {
            let isIn:boolean = this.shapes[i].isIn(this.clickX, this.clickY);
            if (isIn) {
                return this.shapes[i];
            }
        }
        return null;
    }
}
