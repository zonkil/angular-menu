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
var MENU_ITEMS = ["Item1", "Item2"];
var MenuComponent = (function () {
    function MenuComponent() {
        var _this = this;
        this.title = "My menu";
        this.items = MENU_ITEMS;
        this.menuState = 'hide';
        this.menuStateChange = new core_1.EventEmitter();
        window.addEventListener('keyup', function (keyEvent) {
            switch (keyEvent.key) {
                case "Escape":
                    _this.closeMenu();
                    break;
            }
        });
        window.addEventListener('click', function (clickEvent) {
            if (_this.menuState === 'hide') {
                return;
            }
            var jest = false;
            var elem = clickEvent.target;
            while (elem != document.body) {
                if (elem.id === 'left-menu') {
                    jest = true;
                    break;
                }
                elem = elem.parentNode;
            }
            if (!jest) {
                _this.closeMenu();
            }
        }, true);
    }
    MenuComponent.prototype.closeMenu = function () {
        this.menuState = 'hide';
        this.menuStateChange.emit(this.menuState);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MenuComponent.prototype, "menuState", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MenuComponent.prototype, "menuStateChange", void 0);
    MenuComponent = __decorate([
        core_1.Component({
            selector: 'my-menu',
            styles: ["\n    .menu{  display: block;\n        width: 250px;\n        height: 100%;\n        z-index: 2;\n        top: 0;\n        position: absolute;\n        background-color: yellow;\n        float: left;\n    }"
            ],
            template: "\n    <div id=\"left-menu\" [@leftMenuState]=\"menuState\" class=\"menu\">\n        <h1>{{title}}</h1>\n        <div *ngFor=\"let it of items\">{{it}}</div>\n    </div>\n    ",
            animations: [
                core_1.trigger('leftMenuState', [
                    core_1.state('hide', core_1.style({
                        left: '-250px'
                    })),
                    core_1.state('show', core_1.style({
                        left: '0px'
                    })),
                    core_1.transition('hide => show', core_1.animate(250)),
                    core_1.transition('show => hide', core_1.animate(250))
                ])
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], MenuComponent);
    return MenuComponent;
}());
exports.MenuComponent = MenuComponent;
//# sourceMappingURL=menu.component.js.map