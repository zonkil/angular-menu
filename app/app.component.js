"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var AppComponent = (function () {
    function AppComponent() {
        this.hide = true;
        this.show = false;
    }
    AppComponent.prototype.showMenu = function () {
        console.log('dupa');
        this.hide = false;
        this.show = true;
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            styles: ["\n    .menu{  display: block;\n    width: 250px;\n    height: 100%;\n    z-index: 2;\n    top: 0;\n    position: absolute;\n    background-color: yellow;\n    float: left;\n    \n    }\n    .menu_hide{\n    left: -250px;\n    }\n    .menu_show{\n    left: 0px;\n    }"
            ],
            template: '<h1>My First Angular 2 App</h1><h2>dupa 1234 dupa</h2><h3><button (click)="showMenu()">Show menu</button></h3><my-menu class="menu" [ngClass]="{menu_hide:hide, menu_show:show}"></my-menu>'
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map