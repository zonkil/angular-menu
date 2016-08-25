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
var SvgShapeComponent = (function () {
    function SvgShapeComponent() {
        this.text = "I love SVG";
        this.dxleft = 0;
        this.showNext = false;
        this.insideText = "inside text";
        this.left = this.dxleft;
    }
    SvgShapeComponent.prototype.smallClick = function (event) {
        console.log(event);
        this.showNext = !this.showNext;
    };
    SvgShapeComponent.prototype.bigClick = function (event) {
        console.log(event);
        alert("big");
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SvgShapeComponent.prototype, "text", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SvgShapeComponent.prototype, "dxleft", void 0);
    SvgShapeComponent = __decorate([
        core_1.Component({
            selector: 'my-svg-shape',
            host: {},
            styles: ["\n    .svg-shape {\n        position: fixed;\n        width: 110px;\n    }\n    "],
            template: "\n    <svg class=\"svg-shape\" [style.left]=\"left\">\n        <text x=\"10\" y=\"15\" fill=\"red\">{{text}}</text>\n        <rect width=\"100\" height=\"100\" style=\"fill:rgb(0,0,255);stroke-width:2;stroke:rgb(0,0,0);fill-opacity:0.1;stroke-opacity:0.9\" (click)=\"bigClick($event)\"></rect>\n        <rect width=\"10\" height=\"10\" x=\"95\" y=\"45\" style=\"fill:rgb(255,0,0);stroke-width:1;stroke:rgb(0,0,0);fill-opacity:0.1;stroke-opacity:0.9\" (click)=\"smallClick($event)\"></rect>\n        Sorry, your browser does not support inline SVG.\n    </svg>\n    <my-svg-shape *ngIf=\"showNext\" [text]=\"insideText\" [dxleft]=\"left\" ></my-svg-shape>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], SvgShapeComponent);
    return SvgShapeComponent;
}());
exports.SvgShapeComponent = SvgShapeComponent;
//# sourceMappingURL=svg-shape.component.js.map