import { Size, SizeComplexScript } from "file/paragraph/run/formatting";
import { IRunPropertiesOptions, RunProperties } from "file/paragraph/run/properties";
import { IFontAttributesProperties, RunFonts } from "file/paragraph/run/run-fonts";
import { XmlComponent } from "file/xml-components";

export class RunPropertiesDefaults extends XmlComponent {
    private readonly properties: RunProperties;

    constructor(options?: IRunPropertiesOptions) {
        super("w:rPrDefault");
        this.properties = new RunProperties(options);
        this.root.push(this.properties);
    }
}
