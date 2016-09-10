import {Table} from "./Table";
import {Selectable} from "../interfaces";

export class TableDrawer implements Selectable {
    x:number = 0;
    y:number = 0;

    width:number;
    height:number;

    table:Table;

    textHeight:number = 20;
    longestTextWidth:number = -1;
    selected:boolean = false;

    constructor(table:Table) {
        this.x = table.position[0];
        this.y = table.position[1];
        this.table = table;
        this.table.setDrawer(this);
    }


    draw(context:CanvasRenderingContext2D) {
        context.save();
        context.font = this.textHeight + 'px sans-serif';

        this.calculateTextWidth(context);
        this.width = this.longestTextWidth;
        this.height = this.textHeight + 4 + (this.table.fields.length * (this.textHeight + 4));


        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        //context.stroke();

        //context.beginPath();
        context.moveTo(this.x, this.y + this.textHeight + 5);
        context.lineTo(this.x + this.width, this.y + this.textHeight + 5)
        context.closePath();
        context.stroke();

        context.beginPath();
        for(let fk of this.table.foreginKeys){
            context.moveTo(this.x, this.y);
            context.lineTo(fk.getDrawer().x, fk.getDrawer().y);
        }
        context.stroke();

        if (this.selected) {
            context.fillRect(this.x - 2, this.y - 2, 5, 5);
            context.fillRect(this.x + this.width - 2, this.y - 2, 5, 5);

            context.fillRect(this.x - 2, this.y + this.height - 2, 5, 5);
            context.fillRect(this.x + this.width - 2, this.y + this.height - 2, 5, 5);
        }

        context.fillText(this.table.tableName, this.x, this.y + this.textHeight);
        let i:number = 2;
        for (let text of this.table.fields) {
            context.fillText(text, this.x, this.y + (this.textHeight + 4) * i);
            i += 1;
        }


        context.restore();
    }

    calculateTextWidth(context:CanvasRenderingContext2D) {
        context.save();
        context.font = this.textHeight + 'px sans-serif';

        let text = this.table.tableName;
        let measure = context.measureText(text);
        let textWidth = measure.width;

        for (let text of this.table.fields) {
            measure = context.measureText(text);
            if (measure.width > textWidth) {
                textWidth = measure.width;
            }
        }
        this.longestTextWidth = textWidth;
        context.restore();
    }


    isIn(clickX:number, clickY:number):boolean {
        let isX:boolean = false;
        let isY:boolean = false;
        if (clickX >= this.x && clickX <= this.x + this.width) {
            isX = true;
        }
        if (clickY >= this.y && clickY <= this.y + this.height) {
            isY = true;
        }
        return (isX && isY);
    }

    setSelected(selected:boolean):void {
        this.selected = selected;
    }
}

