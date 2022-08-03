import { Drawing } from "../../drawing";
import { IDrawingOptions } from "../../drawing/drawing";
import { IMediaData } from "../../media/data";
import { Run } from "../run";

export class PictureRun extends Run {
    constructor(imageData: IMediaData, drawingOptions?: IDrawingOptions, title?: string) {
        super({});

        const drawing = new Drawing(imageData, drawingOptions, title);

        this.root.push(drawing);
    }
}
