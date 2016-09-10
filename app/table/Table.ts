import {TableDrawer} from "./TableDrawer";
export class Table {
    tableName: string = "defaultName";
    fields: Array<string> = [];
    foreginKeys: Array<Table> = [];

    position: [number, number] = null;

    private drawer:TableDrawer = null;

    setDrawer(drawer:TableDrawer){
        this.drawer = drawer;
    }

    getDrawer(): TableDrawer {
        return this.drawer;
    }
}

