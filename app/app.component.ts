import {Component, trigger,
    state,
    style,
    transition,
    animate} from '@angular/core';

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
    template: `<h1>My First Angular 2 App</h1>
    <h2>dupa 1234 dupa</h2>
    <h3><button (click)="showMenu($event)">Show menu</button></h3>
    <my-menu @leftMenuState="state" id="left-menu" class="menu" ></my-menu>`,
    animations: [
        trigger('leftMenuState', [
            state('hide', style({
                left: '-250px'
            })),
            state('show',   style({
                left: '0px'
            })),
            transition('hide => show', animate(250)),
            transition('show => hide', animate(250))
             /*   [
                style({left:'*'}),
                animate(250, style({left:'0'}))
            ]
            )*/
        ])
    ]
})
export class AppComponent {
    hide:boolean = true;
    show:boolean = false;
    state:String = 'hide';

    constructor() {
        window.addEventListener('keyup', (keyEvent:any) => {
            switch (keyEvent.key) {
                case "Escape":
                    this.closeMenu();
                    break;
            }
        });
        window.addEventListener('click', (clickEvent:any) => {
            if(this.hide){
                return;
            }

            let jest = false;
            let elem = clickEvent.target;
            while(elem != document.body){
                if( elem.id === 'left-menu' ){
                    jest = true;
                    break;
                }
                elem = elem.parentNode;
            }
            if(!jest){
                this.closeMenu();
            }

        });
    }

    showMenu(event:any) {
        this.hide = false;
        this.state = 'show';
        event.stopPropagation();
    }

    closeMenu() {
        this.hide = true;
        this.state = 'hide';
    }

}