import { Injectable } from '@angular/core';
import {Table} from "./table/Table";
import {Selectable} from "./interfaces";
import {TableDrawer} from "./table/TableDrawer";

@Injectable()
export class TableService {

    tables: Array<Selectable> = [];

    getTables(): Promise<Selectable[]> {

        let t1 = new Table();
        t1.tableName = "Moja tabela";
        t1.position = [200,100];
        t1.fields.push("Pole 1");
        t1.fields.push("Pole 234566775");

        let t3 = new Table();
        t3.tableName = "Moja tabela";
        t3.position = [400, 150];
        t3.fields.push("Pole 1");
        t3.fields.push("Pole 234566775");

        let t2 = new Table();
        t2.tableName = "Moja tabela 2";
        t2.position = [100, 250];
        t2.fields.push("Pole 1");
        t2.fields.push("Pole 2345");
        t2.foreginKeys.push(t1);
        t2.foreginKeys.push(t3);

        this.tables.push(new TableDrawer(t1));
        this.tables.push(new TableDrawer(t2));
        this.tables.push(new TableDrawer(t3));

        return Promise.resolve(this.tables);
    }
}