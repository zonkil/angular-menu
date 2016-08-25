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
var RectShape_1 = require("./RectShape");
var CanvasShapeComponent = (function () {
    function CanvasShapeComponent() {
        this.shapes = [];
    }
    CanvasShapeComponent.prototype.ngAfterViewInit = function () {
        var context = this.canvasElement.nativeElement.getContext("2d");
        this.shapes.push(new RectShape_1.RectShape(10, 10, 'Hello'));
        this.shapes.push(new RectShape_1.RectShape(50, 25, 'world! asdlfkjalsdkjf'));
        this.draw();
    };
    CanvasShapeComponent.prototype.canvasClick = function (event) {
        var offsetLeft = this.canvasElement.nativeElement.offsetLeft;
        var offsetTop = this.canvasElement.nativeElement.offsetTop;
        this.clickX = event.x - offsetLeft;
        this.clickY = event.y - offsetTop;
        this.drawDebug();
        for (var i = this.shapes.length - 1; i >= 0; i--) {
            var isIn = this.shapes[i].isIn(this.clickX, this.clickY);
            if (isIn) {
                this.shapes[i].setCheck();
                this.draw();
                return;
            }
        }
    };
    CanvasShapeComponent.prototype.draw = function () {
        var context = this.canvasElement.nativeElement.getContext("2d");
        context.clearRect(0, 0, this.canvasElement.nativeElement.width, this.canvasElement.nativeElement.height);
        for (var _i = 0, _a = this.shapes; _i < _a.length; _i++) {
            var rect = _a[_i];
            rect.draw(context);
        }
        this.drawDebug();
    };
    CanvasShapeComponent.prototype.drawDebug = function () {
        var context = this.canvasElement.nativeElement.getContext("2d");
        context.clearRect(10, 140, 500, 12);
        context.beginPath();
        context.font = 'italic 10pt Calibri';
        context.fillText('(' + this.clickX + "," + this.clickY + ')', 10, 150);
        context.stroke();
    };
    __decorate([
        core_1.ViewChild('myCanvas'), 
        __metadata('design:type', Object)
    ], CanvasShapeComponent.prototype, "canvasElement", void 0);
    CanvasShapeComponent = __decorate([
        core_1.Component({
            selector: 'my-canvas-shape',
            template: "\n        <canvas width=\"578\" height=\"200\" #myCanvas (click)=\"canvasClick($event)\" style=\"border-style: solid\">\n\n        </canvas>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], CanvasShapeComponent);
    return CanvasShapeComponent;
}());
exports.CanvasShapeComponent = CanvasShapeComponent;
//# sourceMappingURL=canvas-shape.component.js.map