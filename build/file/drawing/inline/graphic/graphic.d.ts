import { IMediaData } from "../../../../file/media";
import { XmlComponent } from "../../../../file/xml-components";
export declare class Graphic extends XmlComponent {
    private readonly data;
    constructor(mediaData: IMediaData, x: number, y: number, title?: string);
    setXY(x: number, y: number): void;
}
