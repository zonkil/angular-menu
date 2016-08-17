import {Component} from '@angular/core';
@Component({
    selector: 'my-app',
    styles: [`
    .menu{  display: block;
    width: 250px;
    height: 100%;
    z-index: 2;
    top: 0;
    position: absolute;
    background-color: yellow;
    float: left;
    
    }
    .menu_hide{
    left: -250px;
    }
    .menu_show{
    left: 0px;
    }`
    ],
    template: '<h1>My First Angular 2 App</h1><h2>dupa 1234 dupa</h2><h3><button (click)="showMenu()">Show menu</button></h3><my-menu class="menu" [ngClass]="{menu_hide:hide, menu_show:show}"></my-menu>'
})
export class AppComponent {
    hide: boolean = true;
    show:boolean = false;

    showMenu(){
        console.log('dupa');
        this.hide = false;
        this.show = true;
    }
}