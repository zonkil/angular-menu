export interface Drawable {
    draw(context:CanvasRenderingContext2D): void
}

export interface Selectable extends Drawable {
    isIn(clickX:number, clickY:number):boolean
    setSelected(selected:boolean): void
}

export interface Movable extends Selectable {
    move(dx:number, dy:number): boolean
}