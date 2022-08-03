import { XmlAttributeComponent } from "file/xml-components";

export interface INonVisualPropertiesAttributes {
    readonly id?: number;
    readonly name?: string;
    readonly descr?: string;
    readonly title?: string;
}

export class NonVisualPropertiesAttributes extends XmlAttributeComponent<INonVisualPropertiesAttributes> {
    protected readonly xmlKeys = {
        id: "id",
        name: "name",
        descr: "desc",
        title: "title",
    };
}
