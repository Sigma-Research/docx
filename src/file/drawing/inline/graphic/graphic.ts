import { IMediaData } from "file/media";
import { XmlAttributeComponent, XmlComponent } from "file/xml-components";

import { GraphicData } from "./graphic-data";

interface IGraphicProperties {
    readonly a: string;
}

class GraphicAttributes extends XmlAttributeComponent<IGraphicProperties> {
    protected readonly xmlKeys = {
        a: "xmlns:a",
    };
}

export class Graphic extends XmlComponent {
    private readonly data: GraphicData;

    constructor(mediaData: IMediaData, x: number, y: number, title?: string) {
        super("a:graphic");
        this.root.push(
            new GraphicAttributes({
                a: "http://schemas.openxmlformats.org/drawingml/2006/main",
            }),
        );

        this.data = new GraphicData(mediaData, x, y, title);

        this.root.push(this.data);
    }

    public setXY(x: number, y: number): void {
        this.data.setXY(x, y);
    }
}
