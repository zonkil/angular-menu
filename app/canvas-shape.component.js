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
        this.mouseDown = false;
        this.downX = 0;
        this.downY = 0;
        this.dragRect = null;
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
    CanvasShapeComponent.prototype.onMouseup = function () {
        this.mouseDown = false;
        if (this.dragRect != null) {
            this.dragRect.setDrag(false);
        }
        this.draw();
    };
    CanvasShapeComponent.prototype.onMousemove = function (event) {
        if (this.mouseDown && this.dragRect !== null) {
            var offsetLeft = this.canvasElement.nativeElement.offsetLeft;
            var offsetTop = this.canvasElement.nativeElement.offsetTop;
            var dX = event.x - offsetLeft;
            var dY = event.y - offsetTop;
            //this.drawDebug();
            this.dragRect.move(dX - this.downX, dY - this.downY);
            this.draw();
            this.downX = dX;
            this.downY = dY;
        }
    };
    CanvasShapeComponent.prototype.onMousedown = function (event) {
        this.mouseDown = true;
        this.dragRect = this.findRect(event);
        if (this.dragRect !== null) {
            this.dragRect.setDrag(true);
            var offsetLeft = this.canvasElement.nativeElement.offsetLeft;
            var offsetTop = this.canvasElement.nativeElement.offsetTop;
            this.downX = event.x - offsetLeft;
            this.downY = event.y - offsetTop;
            this.draw();
        }
    };
    CanvasShapeComponent.prototype.onDrop = function (event) {
        console.log(event);
    };
    CanvasShapeComponent.prototype.onDragOver = function (event) {
        console.log(event);
        event.preventDefault();
    };
    CanvasShapeComponent.prototype.findRect = function (event) {
        var offsetLeft = this.canvasElement.nativeElement.offsetLeft;
        var offsetTop = this.canvasElement.nativeElement.offsetTop;
        this.clickX = event.x - offsetLeft;
        this.clickY = event.y - offsetTop;
        this.drawDebug();
        for (var i = this.shapes.length - 1; i >= 0; i--) {
            var isIn = this.shapes[i].isIn(this.clickX, this.clickY);
            if (isIn) {
                return this.shapes[i];
            }
        }
        return null;
    };
    __decorate([
        core_1.ViewChild('myCanvas'), 
        __metadata('design:type', Object)
    ], CanvasShapeComponent.prototype, "canvasElement", void 0);
    __decorate([
        core_1.HostListener('mouseup'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], CanvasShapeComponent.prototype, "onMouseup", null);
    __decorate([
        core_1.HostListener('mousemove', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [MouseEvent]), 
        __metadata('design:returntype', void 0)
    ], CanvasShapeComponent.prototype, "onMousemove", null);
    __decorate([
        core_1.HostListener('mousedown', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], CanvasShapeComponent.prototype, "onMousedown", null);
    __decorate([
        core_1.HostListener('drop', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], CanvasShapeComponent.prototype, "onDrop", null);
    __decorate([
        core_1.HostListener('dragover', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], CanvasShapeComponent.prototype, "onDragOver", null);
    CanvasShapeComponent = __decorate([
        core_1.Component({
            selector: 'my-canvas-shape',
            template: "\n        <canvas width=\"578\" height=\"200\" #myCanvas  style=\"border-style: solid; cursor: pointer;\">\n\n        </canvas>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], CanvasShapeComponent);
    return CanvasShapeComponent;
}());
exports.CanvasShapeComponent = CanvasShapeComponent;
//# sourceMappingURL=canvas-shape.component.js.map