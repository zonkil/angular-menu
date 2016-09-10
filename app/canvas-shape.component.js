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
var TableDrawer_1 = require("./table/TableDrawer");
var table_service_1 = require("./table.service");
var CanvasShapeComponent = (function () {
    function CanvasShapeComponent(tableService) {
        this.tableService = tableService;
        this.shapes = [];
        this.tables = [];
        this.items = [];
        this.clickPos = null;
        this.mouseDown = false;
        this.downPos = null;
        this.dragRect = null;
        this.selectedTable = null;
        this.selectedItem = null;
        this.mouseStyle = "pointer";
    }
    CanvasShapeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.tableService.getTables().then(function (tables) {
            _this.items = tables;
            _this.draw();
        });
    };
    CanvasShapeComponent.prototype.ngAfterViewInit = function () {
        this.shapes.push(new RectShape_1.RectShape(10, 10, 'Hello'));
        this.shapes.push(new RectShape_1.RectShape(50, 25, 'world! asdlfkjalsdkjf'));
        this.draw();
    };
    CanvasShapeComponent.prototype.canvasClick = function (event) {
        this.clickPos = this.calculateClickPosition(event);
        this.drawDebug();
        for (var i = this.shapes.length - 1; i >= 0; i--) {
            var isIn = this.shapes[i].isIn(this.clickPos[0], this.clickPos[1]);
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
        for (var _b = 0, _c = this.tables; _b < _c.length; _b++) {
            var table = _c[_b];
            table.draw(context);
        }
        for (var _d = 0, _e = this.items; _d < _e.length; _d++) {
            var item = _e[_d];
            item.draw(context);
        }
        this.drawDebug();
    };
    CanvasShapeComponent.prototype.drawDebug = function () {
        var context = this.canvasElement.nativeElement.getContext("2d");
        context.clearRect(10, 140, 100, 12);
        context.beginPath();
        context.font = 'italic 10pt Calibri';
        context.fillText('(' + this.clickPos[0] + "," + this.clickPos[1] + ')', 10, 150);
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
            var delta = this.calculateClickPosition(event);
            this.dragRect.move(delta[0] - this.downPos[0], delta[1] - this.downPos[1]);
            this.draw();
            this.downPos = delta;
        }
        var tmp = this.findItem(event);
        if (tmp !== null) {
            this.mouseStyle = "default";
        }
        else {
            this.mouseStyle = "pointer";
        }
    };
    CanvasShapeComponent.prototype.onMousedown = function (event) {
        this.unselectItem();
        this.mouseDown = true;
        this.dragRect = this.findRect(event);
        if (this.dragRect !== null) {
            this.dragRect.setDrag(true);
            this.downPos = this.calculateClickPosition(event);
        }
        this.selectItem(event);
        this.draw();
    };
    CanvasShapeComponent.prototype.onDrop = function (event) {
        event.preventDefault();
        console.log(event.dataTransfer.getData('text'));
        var dropPos = this.calculateClickPosition(event);
        this.addRect(dropPos[0], dropPos[1], event.dataTransfer.getData('text'));
        this.draw();
    };
    CanvasShapeComponent.prototype.onDragOver = function (event) {
        event.preventDefault();
    };
    CanvasShapeComponent.prototype.findRect = function (event) {
        this.clickPos = this.calculateClickPosition(event);
        this.drawDebug();
        for (var i = this.shapes.length - 1; i >= 0; i--) {
            var isIn = this.shapes[i].isIn(this.clickPos[0], this.clickPos[1]);
            if (isIn) {
                return this.shapes[i];
            }
        }
        return null;
    };
    CanvasShapeComponent.prototype.addRect = function (x, y, text) {
        this.shapes.push(new RectShape_1.RectShape(x, y, text));
    };
    CanvasShapeComponent.prototype.addTable = function (table) {
        this.items.push(new TableDrawer_1.TableDrawer(table));
    };
    CanvasShapeComponent.prototype.selectItem = function (event) {
        var table = this.findItem(event);
        if (table !== null) {
            this.unselectItem();
            this.selectedItem = table;
            this.selectedItem.setSelected(true);
        }
    };
    CanvasShapeComponent.prototype.unselectItem = function () {
        if (this.selectedItem != null) {
            this.selectedItem.setSelected(false);
        }
    };
    CanvasShapeComponent.prototype.findItem = function (event) {
        this.clickPos = this.calculateClickPosition(event);
        this.drawDebug();
        for (var i = this.items.length - 1; i >= 0; i--) {
            var isIn = this.items[i].isIn(this.clickPos[0], this.clickPos[1]);
            if (isIn) {
                return this.items[i];
            }
        }
        return null;
    };
    CanvasShapeComponent.prototype.calculateClickPosition = function (event) {
        var offsetLeft = this.canvasElement.nativeElement.offsetLeft;
        var offsetTop = this.canvasElement.nativeElement.offsetTop;
        return [event.x - offsetLeft, event.y - offsetTop];
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
            template: "\n        <canvas width=\"578\" height=\"500\" #myCanvas  style=\"border-style: solid\" [ngStyle]=\"{'cursor': mouseStyle}\">\n        </canvas>\n    "
        }), 
        __metadata('design:paramtypes', [table_service_1.TableService])
    ], CanvasShapeComponent);
    return CanvasShapeComponent;
}());
exports.CanvasShapeComponent = CanvasShapeComponent;
//# sourceMappingURL=canvas-shape.component.js.map