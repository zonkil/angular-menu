"use strict";
var RectShape = (function () {
    function RectShape(x, y, napis) {
        this.x = 0;
        this.y = 0;
        this.napis = 'Hello world';
        this.textHeight = 20;
        this.checked = false;
        this.x = x;
        this.y = y;
        this.napis = napis;
    }
    RectShape.prototype.draw = function (context) {
        context.save();
        context.font = this.textHeight + 'px sans-serif';
        var measure = context.measureText(this.napis);
        this.width = measure.width + 10;
        this.height = this.textHeight + 4;
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        if (this.checked) {
            context.fillStyle = 'green';
            context.fill();
            context.fillStyle = 'black';
        }
        //context.stroke();
        context.fillText(this.napis, this.x, this.y + this.textHeight);
        context.stroke();
        context.restore();
    };
    RectShape.prototype.setCheck = function () {
        this.checked = !this.checked;
    };
    RectShape.prototype.isIn = function (clickX, clickY) {
        var isX = false;
        var isY = false;
        if (clickX >= this.x && clickX <= this.x + this.width) {
            isX = true;
        }
        if (clickY >= this.y && clickY <= this.y + this.height) {
            isY = true;
        }
        return (isX && isY);
    };
    return RectShape;
}());
exports.RectShape = RectShape;
//# sourceMappingURL=RectShape.js.map