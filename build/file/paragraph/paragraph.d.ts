import { FootnoteReferenceRun } from "../../file/footnotes/footnote/run/reference-run";
import { IXmlableObject, XmlComponent } from "../../file/xml-components";
import { File } from "../file";
import { PageBreak } from "./formatting/page-break";
import { Bookmark, HyperlinkRef } from "./links";
import { IParagraphPropertiesOptions } from "./properties";
import { PictureRun, Run, SequentialIdentifier, SymbolRun, TextRun } from "./run";
export interface IParagraphOptions extends IParagraphPropertiesOptions {
    readonly text?: string;
    readonly children?: Array<TextRun | PictureRun | SymbolRun | Bookmark | PageBreak | SequentialIdentifier | FootnoteReferenceRun | HyperlinkRef>;
}
export declare class Paragraph extends XmlComponent {
    private readonly properties;
    constructor(options: string | PictureRun | IParagraphOptions);
    prepForXml(file: File): IXmlableObject | undefined;
    addRunToFront(run: Run): Paragraph;
}
