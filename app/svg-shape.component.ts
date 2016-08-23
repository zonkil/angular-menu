import {Component, Input} from '@angular/core';


@Component({
    selector: 'my-svg-shape',
    template: `
    <svg>
        <text x="10" y="15" fill="red">{{text}}</text>
        <rect width="200" height="100" style="fill:rgb(0,0,255);stroke-width:2;stroke:rgb(0,0,0);fill-opacity:0.1;stroke-opacity:0.9"></rect>
        Sorry, your browser does not support inline SVG.
    </svg>
    `
})
export class SvgShapeComponent {
    @Input() text:string = "I love SVG"
}
