import { XmlAttributeComponent } from "@file/xml-components";

export class DocPropertiesAttributes extends XmlAttributeComponent<{
    readonly id?: number;
    readonly name?: string;
    readonly descr?: string;
    readonly title?: string;
}> {
    protected readonly xmlKeys = {
        id: "id",
        name: "name",
        descr: "descr",
        title: "title"
    };
}
