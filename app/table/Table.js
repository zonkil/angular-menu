"use strict";
var Table = (function () {
    function Table() {
        this.tableName = "defaultName";
        this.fields = [];
        this.foreginKeys = [];
        this.position = null;
        this.drawer = null;
    }
    Table.prototype.setDrawer = function (drawer) {
        this.drawer = drawer;
    };
    Table.prototype.getDrawer = function () {
        return this.drawer;
    };
    return Table;
}());
exports.Table = Table;
//# sourceMappingURL=Table.js.map