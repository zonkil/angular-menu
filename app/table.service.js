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
var Table_1 = require("./table/Table");
var TableDrawer_1 = require("./table/TableDrawer");
var TableService = (function () {
    function TableService() {
        this.tables = [];
    }
    TableService.prototype.getTables = function () {
        var t1 = new Table_1.Table();
        t1.tableName = "Moja tabela";
        t1.position = [200, 100];
        t1.fields.push("Pole 1");
        t1.fields.push("Pole 234566775");
        var t3 = new Table_1.Table();
        t3.tableName = "Moja tabela";
        t3.position = [400, 150];
        t3.fields.push("Pole 1");
        t3.fields.push("Pole 234566775");
        var t2 = new Table_1.Table();
        t2.tableName = "Moja tabela 2";
        t2.position = [100, 250];
        t2.fields.push("Pole 1");
        t2.fields.push("Pole 2345");
        t2.foreginKeys.push(t1);
        t2.foreginKeys.push(t3);
        this.tables.push(new TableDrawer_1.TableDrawer(t1));
        this.tables.push(new TableDrawer_1.TableDrawer(t2));
        this.tables.push(new TableDrawer_1.TableDrawer(t3));
        return Promise.resolve(this.tables);
    };
    TableService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], TableService);
    return TableService;
}());
exports.TableService = TableService;
//# sourceMappingURL=table.service.js.map