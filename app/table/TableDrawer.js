"use strict";
var TableDrawer = (function () {
    function TableDrawer(table) {
        this.x = 0;
        this.y = 0;
        this.textHeight = 20;
        this.longestTextWidth = -1;
        this.selected = false;
        this.x = table.position[0];
        this.y = table.position[1];
        this.table = table;
        this.table.setDrawer(this);
    }
    TableDrawer.prototype.draw = function (context) {
        context.save();
        context.font = this.textHeight + 'px sans-serif';
        this.calculateTextWidth(context);
        this.width = this.longestTextWidth;
        this.height = this.textHeight + 4 + (this.table.fields.length * (this.textHeight + 4));
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        //context.stroke();
        //context.beginPath();
        context.moveTo(this.x, this.y + this.textHeight + 5);
        context.lineTo(this.x + this.width, this.y + this.textHeight + 5);
        context.closePath();
        context.stroke();
        context.beginPath();
        for (var _i = 0, _a = this.table.foreginKeys; _i < _a.length; _i++) {
            var fk = _a[_i];
            context.moveTo(this.x, this.y);
            context.lineTo(fk.getDrawer().x, fk.getDrawer().y);
        }
        context.stroke();
        if (this.selected) {
            context.fillRect(this.x - 2, this.y - 2, 5, 5);
            context.fillRect(this.x + this.width - 2, this.y - 2, 5, 5);
            context.fillRect(this.x - 2, this.y + this.height - 2, 5, 5);
            context.fillRect(this.x + this.width - 2, this.y + this.height - 2, 5, 5);
        }
        context.fillText(this.table.tableName, this.x, this.y + this.textHeight);
        var i = 2;
        for (var _b = 0, _c = this.table.fields; _b < _c.length; _b++) {
            var text = _c[_b];
            context.fillText(text, this.x, this.y + (this.textHeight + 4) * i);
            i += 1;
        }
        context.restore();
    };
    TableDrawer.prototype.calculateTextWidth = function (context) {
        context.save();
        context.font = this.textHeight + 'px sans-serif';
        var text = this.table.tableName;
        var measure = context.measureText(text);
        var textWidth = measure.width;
        for (var _i = 0, _a = this.table.fields; _i < _a.length; _i++) {
            var text_1 = _a[_i];
            measure = context.measureText(text_1);
            if (measure.width > textWidth) {
                textWidth = measure.width;
            }
        }
        this.longestTextWidth = textWidth;
        context.restore();
    };
    TableDrawer.prototype.isIn = function (clickX, clickY) {
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
    TableDrawer.prototype.setSelected = function (selected) {
        this.selected = selected;
    };
    return TableDrawer;
}());
exports.TableDrawer = TableDrawer;
//# sourceMappingURL=TableDrawer.js.map