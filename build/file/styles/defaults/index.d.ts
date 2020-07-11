import { IParagraphPropertiesOptions } from "../../../file/paragraph/properties";
import { IRunPropertiesOptions } from "../../../file/paragraph/run/properties";
import { XmlComponent } from "../../../file/xml-components";
export interface IDocumentDefaultsOptions {
    readonly paragraph?: IParagraphPropertiesOptions;
    readonly run?: IRunPropertiesOptions;
}
export declare class DocumentDefaults extends XmlComponent {
    private readonly runPropertiesDefaults;
    private readonly paragraphPropertiesDefaults;
    constructor(options?: IDocumentDefaultsOptions);
}
