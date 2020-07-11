import { IParagraphPropertiesOptions } from "file/paragraph/properties";
import { IRunPropertiesOptions } from "file/paragraph/run/properties";
import { XmlComponent } from "file/xml-components";
import { ParagraphPropertiesDefaults } from "./paragraph-properties";
import { RunPropertiesDefaults } from "./run-properties";

export interface IDocumentDefaultsOptions {
    readonly paragraph?: IParagraphPropertiesOptions;
    readonly run?: IRunPropertiesOptions;
}

export class DocumentDefaults extends XmlComponent {
    private readonly runPropertiesDefaults: RunPropertiesDefaults;
    private readonly paragraphPropertiesDefaults: ParagraphPropertiesDefaults;

    constructor(options?: IDocumentDefaultsOptions) {
        super("w:docDefaults");
        this.runPropertiesDefaults = new RunPropertiesDefaults(options && options.run);
        this.paragraphPropertiesDefaults = new ParagraphPropertiesDefaults(options && options.paragraph);
        this.root.push(this.runPropertiesDefaults);
        this.root.push(this.paragraphPropertiesDefaults);
    }
}
