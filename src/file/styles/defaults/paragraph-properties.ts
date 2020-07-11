import { IParagraphPropertiesOptions, ParagraphProperties } from "file/paragraph/properties";
import { XmlComponent } from "file/xml-components";

export class ParagraphPropertiesDefaults extends XmlComponent {
    constructor(options?: IParagraphPropertiesOptions) {
        super("w:pPrDefault");
        this.root.push(new ParagraphProperties(options));
    }
}
