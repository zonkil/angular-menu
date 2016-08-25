import {Component, Input} from '@angular/core';


@Component({
    selector: 'my-svg-shape',
    host: {},
    styles: [`
    .svg-shape {
        position: fixed;
        width: 110px;
    }
    `],
    template: `
    <svg class="svg-shape" [style.left]="left">
        <text x="10" y="15" fill="red">{{text}}</text>
        <rect width="100" height="100" style="fill:rgb(0,0,255);stroke-width:2;stroke:rgb(0,0,0);fill-opacity:0.1;stroke-opacity:0.9" (click)="bigClick($event)"></rect>
        <rect width="10" height="10" x="95" y="45" style="fill:rgb(255,0,0);stroke-width:1;stroke:rgb(0,0,0);fill-opacity:0.1;stroke-opacity:0.9" (click)="smallClick($event)"></rect>
        Sorry, your browser does not support inline SVG.
    </svg>
    <my-svg-shape *ngIf="showNext" [text]="insideText" [dxleft]="left" ></my-svg-shape>
    `
})
export class SvgShapeComponent {
    @Input() text:string = "I love SVG"
    @Input() dxleft = 0;
    showNext:boolean = false;
    insideText:string = "inside text";

    left = this.dxleft;

    smallClick(event:any){
        console.log(event);
        this.showNext = !this.showNext;
    }

    bigClick(event:any){
        console.log(event);
        alert("big");
    }
}
