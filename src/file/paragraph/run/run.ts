// http://officeopenxml.com/WPtext.php
import { ShadingType } from "file/table";
import { XmlComponent } from "file/xml-components";

import { FootnoteReferenceRun } from "file/footnotes/footnote/run/reference-run";
import { FieldInstruction } from "file/table-of-contents/field-instruction";
import { Break } from "./break";
import { EmphasisMarkType } from "./emphasis-mark";
import { Begin, End, Separate } from "./field";
import { NumberOfPages, NumberOfPagesSection, Page } from "./page-number";
import { RunProperties } from "./properties";
import { Text } from "./run-components/text";
import { IFontAttributesProperties } from "./run-fonts";
import { UnderlineType } from "./underline";

interface IFontOptions {
    readonly name: string;
    readonly hint?: string;
}

export interface IRunOptions {
    readonly bold?: boolean;
    readonly italics?: boolean;
    readonly underline?: {
        readonly color?: string;
        readonly type?: UnderlineType;
    };
    readonly emphasisMark?: {
        readonly type?: EmphasisMarkType;
    };
    readonly color?: string;
    readonly size?: number;
    readonly rightToLeft?: boolean;
    readonly smallCaps?: boolean;
    readonly allCaps?: boolean;
    readonly strike?: boolean;
    readonly doubleStrike?: boolean;
    readonly subScript?: boolean;
    readonly superScript?: boolean;
    readonly style?: string;
    readonly font?: string | IFontOptions | IFontAttributesProperties;
    readonly highlight?: string;
    readonly shading?: {
        readonly type: ShadingType;
        readonly fill: string;
        readonly color: string;
    };
    readonly children?: Array<Begin | FieldInstruction | Separate | End | PageNumber | FootnoteReferenceRun | string>;
    readonly text?: string;
}

export enum PageNumber {
    CURRENT = "CURRENT",
    TOTAL_PAGES = "TOTAL_PAGES",
    TOTAL_PAGES_IN_SECTION = "TOTAL_PAGES_IN_SECTION",
}

export class Run extends XmlComponent {
    protected readonly properties: RunProperties;

    constructor(options: IRunOptions) {
        super("w:r");
        this.properties = new RunProperties(options);
        this.root.push(this.properties);

        if (options.children) {
            for (const child of options.children) {
                if (typeof child === "string") {
                    switch (child) {
                        case PageNumber.CURRENT:
                            this.root.push(new Begin());
                            this.root.push(new Page());
                            this.root.push(new Separate());
                            this.root.push(new End());
                            break;
                        case PageNumber.TOTAL_PAGES:
                            this.root.push(new Begin());
                            this.root.push(new NumberOfPages());
                            this.root.push(new Separate());
                            this.root.push(new End());
                            break;
                        case PageNumber.TOTAL_PAGES_IN_SECTION:
                            this.root.push(new Begin());
                            this.root.push(new NumberOfPagesSection());
                            this.root.push(new Separate());
                            this.root.push(new End());
                            break;
                        default:
                            this.root.push(new Text(child));
                            break;
                    }
                    continue;
                }

                this.root.push(child);
            }
        } else if (options.text) {
            this.root.push(new Text(options.text));
        }
    }

    public break(): Run {
        this.root.splice(1, 0, new Break());
        return this;
    }
}
