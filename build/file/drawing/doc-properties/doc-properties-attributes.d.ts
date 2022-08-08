import { XmlAttributeComponent } from "../../../file/xml-components";
export declare class DocPropertiesAttributes extends XmlAttributeComponent<{
    readonly id?: number;
    readonly name?: string;
    readonly descr?: string;
    readonly title?: string;
}> {
    protected readonly xmlKeys: {
        id: string;
        name: string;
        descr: string;
        title: string;
    };
}
