import {Component, trigger,
    state,
    style,
    transition,
    animate} from '@angular/core';
import {MenuComponent} from "./menu.component";
import {SvgShapeComponent} from "./svg-shape.component"
import {TableService} from "./table.service";


@Component({
    selector: 'my-app',

    template: `<h1 (dragstart)="onDragStart($event)">My First Angular 2 App<button (click)="debugInfo()">debug info</button></h1>
    <h2>dupa 1234 dupa</h2>
    <h3><button (click)="showMenu($event)">Show menu</button></h3>
    <!--<my-svg-shape [text]="text1"></my-svg-shape>-->
    <my-menu [(menuState)]='menuState'></my-menu>
    <my-canvas-shape></my-canvas-shape>
    `,
    providers: [TableService]
})
export class AppComponent {

    menuState: string = 'hide';
    text1: string = "text 1";
    text2: string = "text 2";

    showMenu(event:any) {
        this.menuState = 'show';
    }

    debugInfo(){
        alert(this.menuState);
    }

    onDragStart(event){
        let tekst = window.getSelection().toString();
        event.dataTransfer.setData('text', tekst);
    }
}