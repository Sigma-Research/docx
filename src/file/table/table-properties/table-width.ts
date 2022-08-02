// http://officeopenxml.com/WPtableWidth.php
import { XmlAttributeComponent, XmlComponent } from "file/xml-components";

import { WidthType } from "../table-cell";

interface ITableWidth {
    readonly type: WidthType;
    readonly w: number | string;
}

class TableWidthAttributes extends XmlAttributeComponent<ITableWidth> {
    protected readonly xmlKeys = { type: "w:type", w: "w:w" };
}

export class PreferredTableWidth extends XmlComponent {
    constructor(type: WidthType, w: number) {
        super("w:tblW");
        // 为了兼容 wps ，此处不再把 % 加在 width 上
        // const width: number | string = type === WidthType.PERCENTAGE ? `${w}%` : w;
        const width: number | string = w;
        this.root.push(new TableWidthAttributes({ type: type, w: width }));
    }
}
