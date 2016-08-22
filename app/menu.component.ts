import { Component, Input, Output, trigger,
    state,
    style,
    transition,
    animate,
    EventEmitter} from '@angular/core';


const MENU_ITEMS: string[] = ["Item1", "Item2"];

@Component({
    selector: 'my-menu',
    styles: [`
    .menu{  display: block;
        width: 250px;
        height: 100%;
        z-index: 2;
        top: 0;
        position: absolute;
        background-color: yellow;
        float: left;
    }`
    ],
    template: `
    <div id="left-menu" [@leftMenuState]="menuState" class="menu">
        <h1>{{title}}</h1>
        <div *ngFor="let it of items">{{it}}</div>
    </div>
    `,
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
        ])
    ]

})
export class MenuComponent {
    title = "My menu"
    items = MENU_ITEMS;

    @Input() menuState:string = 'hide';
    @Output() menuStateChange = new EventEmitter();

    constructor() {
        window.addEventListener('keyup', (keyEvent:any) => {
            switch (keyEvent.key) {
                case "Escape":
                    this.closeMenu();
                    break;
            }
        });
        window.addEventListener('click', (clickEvent:any) => {
            if( this.menuState === 'hide'){
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

        }, true);
    }

    closeMenu(){
        this.menuState = 'hide';
        this.menuStateChange.emit(this.menuState);
    }

}