import {Component, ViewChild, HostListener, OnInit} from '@angular/core';
import {RectShape} from "./RectShape";
import {TableDrawer} from "./table/TableDrawer";
import {Table} from "./table/Table";
import {Movable} from "./interfaces";
import {Selectable} from "./interfaces";
import {TableService} from "./table.service";


@Component({
    selector: 'my-canvas-shape',
    template: `
        <canvas width="578" height="500" #myCanvas  style="border-style: solid" [ngStyle]="{'cursor': mouseStyle}">
        </canvas>
    `
})
export class CanvasShapeComponent implements OnInit {

    @ViewChild('myCanvas') canvasElement:any;
    shapes:Array<RectShape> = [];
    tables:Array<TableDrawer> = [];

    items:Array<Selectable> = [];

    clickPos:[number, number] = null;

    mouseDown:boolean = false;
    downPos:[number, number] = null;

    dragRect:RectShape = null;
    selectedTable:TableDrawer = null;

    selectedItem:Selectable = null;
    mouseStyle:string = "pointer";

    constructor(private tableService:TableService) {
    }

    ngOnInit():void {
        this.tableService.getTables().then(
            tables => {
                this.items = tables;
                this.draw();
            });
    }

    ngAfterViewInit() {
        this.shapes.push(new RectShape(10, 10, 'Hello'));
        this.shapes.push(new RectShape(50, 25, 'world! asdlfkjalsdkjf'));

        this.draw();
    }

    canvasClick(event:any) {
        this.clickPos = this.calculateClickPosition(event);
        this.drawDebug();

        for (let i = this.shapes.length - 1; i >= 0; i--) {
            let isIn:boolean = this.shapes[i].isIn(this.clickPos[0], this.clickPos[1]);
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
        for (let table of this.tables) {
            table.draw(context)
        }

        for (let item of this.items) {
            item.draw(context)
        }
        this.drawDebug();
    }

    drawDebug() {
        var context = this.canvasElement.nativeElement.getContext("2d");
        context.clearRect(10, 140, 100, 12);

        context.beginPath();
        context.font = 'italic 10pt Calibri';
        context.fillText('(' + this.clickPos[0] + "," + this.clickPos[1] + ')', 10, 150);
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
            let delta = this.calculateClickPosition(event);

            this.dragRect.move(delta[0] - this.downPos[0], delta[1] - this.downPos[1]);
            this.draw();
            this.downPos = delta;
        }


        let tmp = this.findItem(event);
        if (tmp !== null) {
            this.mouseStyle = "default";
        } else {
            this.mouseStyle = "pointer";
        }

    }

    @HostListener('mousedown', ['$event'])
    onMousedown(event) {
        this.unselectItem();
        this.mouseDown = true;
        this.dragRect = this.findRect(event);
        if (this.dragRect !== null) {
            this.dragRect.setDrag(true);
            this.downPos = this.calculateClickPosition(event);

            //this.draw();
        }

        this.selectItem(event);
        this.draw();
    }

    @HostListener('drop', ['$event'])
    onDrop(event) {
        event.preventDefault();
        console.log(event.dataTransfer.getData('text'));
        let dropPos = this.calculateClickPosition(event);
        this.addRect(dropPos[0], dropPos[1], event.dataTransfer.getData('text'));
        this.draw();
    }

    @HostListener('dragover', ['$event'])
    onDragOver(event) {
        event.preventDefault();
    }

    findRect(event:any):RectShape {
        this.clickPos = this.calculateClickPosition(event);
        this.drawDebug();

        for (let i = this.shapes.length - 1; i >= 0; i--) {
            let isIn:boolean = this.shapes[i].isIn(this.clickPos[0], this.clickPos[1]);
            if (isIn) {
                return this.shapes[i];
            }
        }
        return null;
    }

    addRect(x, y, text) {
        this.shapes.push(new RectShape(x, y, text));
    }

    addTable(table:Table) {
        this.items.push(new TableDrawer(table));
    }


    selectItem(event) {
        let table = this.findItem(event);

        if (table !== null) {
            this.unselectItem();
            this.selectedItem = table;
            this.selectedItem.setSelected(true);
        }
    }

    unselectItem() {
        if (this.selectedItem != null) {
            this.selectedItem.setSelected(false);
        }
    }

    findItem(event:any):Selectable {
        this.clickPos = this.calculateClickPosition(event);
        this.drawDebug();

        for (let i = this.items.length - 1; i >= 0; i--) {
            let isIn:boolean = this.items[i].isIn(this.clickPos[0], this.clickPos[1]);
            if (isIn) {
                return this.items[i];
            }
        }
        return null;
    }

    private calculateClickPosition(event):[number, number] {
        let offsetLeft = this.canvasElement.nativeElement.offsetLeft;
        let offsetTop = this.canvasElement.nativeElement.offsetTop;
        return [event.x - offsetLeft, event.y - offsetTop];
    }
}
