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
        this.menuState = 'hide';
        this.text1 = "text 1";
        this.text2 = "text 2";
    }
    AppComponent.prototype.showMenu = function (event) {
        this.menuState = 'show';
    };
    AppComponent.prototype.debugInfo = function () {
        alert(this.menuState);
    };
    AppComponent.prototype.onDragStart = function (event) {
        var tekst = window.getSelection().toString();
        event.dataTransfer.setData('text', tekst);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "<h1 (dragstart)=\"onDragStart($event)\">My First Angular 2 App<button (click)=\"debugInfo()\">debug info</button></h1>\n    <h2>dupa 1234 dupa</h2>\n    <h3><button (click)=\"showMenu($event)\">Show menu</button></h3>\n    <!--<my-svg-shape [text]=\"text1\"></my-svg-shape>-->\n    <my-menu [(menuState)]='menuState'></my-menu>\n    <my-canvas-shape></my-canvas-shape>\n    ",
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map