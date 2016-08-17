import { Component } from '@angular/core';

const MENU_ITEMS: string[] = ["Item1", "Item2"];

@Component({
    selector: 'my-menu',
    template: `<h1>{{title}}</h1>
        <div *ngFor="let it of items">{{it}}</div>
    `

})
export class MenuComponent {
    title = "My menu"
    items = MENU_ITEMS;
}