import { XmlComponent } from "file/xml-components";
import { ChildNonVisualProperties } from "./child-non-visual-pic-properties/child-non-visual-pic-properties";
import { NonVisualProperties } from "./non-visual-properties/non-visual-properties";

export class NonVisualPicProperties extends XmlComponent {
    constructor(title?: string) {
        super("pic:nvPicPr");

        this.root.push(new NonVisualProperties(title));
        this.root.push(new ChildNonVisualProperties());
    }
}
