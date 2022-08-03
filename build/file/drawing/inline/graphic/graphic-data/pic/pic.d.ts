import { IMediaData } from "../../../../../../file/media";
import { XmlComponent } from "../../../../../../file/xml-components";
export declare class Pic extends XmlComponent {
    private readonly shapeProperties;
    constructor(mediaData: IMediaData, x: number, y: number, title?: string);
    setXY(x: number, y: number): void;
}
