// http://officeopenxml.com/WPparagraph.php
import { FootnoteReferenceRun } from "file/footnotes/footnote/run/reference-run";
import { IXmlableObject, XmlComponent } from "file/xml-components";

import { File } from "../file";
import { AlignmentType } from "./formatting/alignment";
import { IBorderOptions } from "./formatting/border";
import { IIndentAttributesProperties } from "./formatting/indent";
import { PageBreak } from "./formatting/page-break";
import { ISpacingProperties } from "./formatting/spacing";
import { HeadingLevel } from "./formatting/style";
import { LeaderType, TabStopPosition, TabStopType } from "./formatting/tab-stop";
import { Bookmark, HyperlinkRef } from "./links";
import { ParagraphProperties } from "./properties";
import { PictureRun, Run, SequentialIdentifier, SymbolRun, TextRun } from "./run";

export interface IParagraphOptions {
    readonly text?: string;
    readonly border?: IBorderOptions;
    readonly spacing?: ISpacingProperties;
    readonly outlineLevel?: number;
    readonly alignment?: AlignmentType;
    readonly heading?: HeadingLevel;
    readonly bidirectional?: boolean;
    readonly thematicBreak?: boolean;
    readonly pageBreakBefore?: boolean;
    readonly contextualSpacing?: boolean;
    readonly indent?: IIndentAttributesProperties;
    readonly keepLines?: boolean;
    readonly keepNext?: boolean;
    readonly tabStops?: Array<{
        readonly position: number | TabStopPosition;
        readonly type: TabStopType;
        readonly leader?: LeaderType;
    }>;
    readonly style?: string;
    readonly bullet?: {
        readonly level: number;
    };
    readonly numbering?: {
        readonly reference: string;
        readonly level: number;
        readonly custom?: boolean;
    };
    readonly children?: Array<
        TextRun | PictureRun | SymbolRun | Bookmark | PageBreak | SequentialIdentifier | FootnoteReferenceRun | HyperlinkRef
    >;
}

export class Paragraph extends XmlComponent {
    private readonly properties: ParagraphProperties;

    constructor(options: string | PictureRun | IParagraphOptions) {
        super("w:p");

        if (typeof options === "string") {
            this.properties = new ParagraphProperties({});
            this.root.push(this.properties);
            this.root.push(new TextRun(options));
            return;
        }

        if (options instanceof PictureRun) {
            this.properties = new ParagraphProperties({});
            this.root.push(this.properties);
            this.root.push(options);
            return;
        }

        this.properties = new ParagraphProperties(options);

        this.root.push(this.properties);

        if (options.text) {
            this.root.push(new TextRun(options.text));
        }

        if (options.children) {
            for (const child of options.children) {
                if (child instanceof Bookmark) {
                    this.root.push(child.start);
                    this.root.push(child.text);
                    this.root.push(child.end);
                    continue;
                }

                this.root.push(child);
            }
        }
    }

    public prepForXml(file: File): IXmlableObject | undefined {
        for (const element of this.root) {
            if (element instanceof HyperlinkRef) {
                const index = this.root.indexOf(element);
                this.root[index] = file.HyperlinkCache[element.id];
            }
        }

        return super.prepForXml();
    }

    public addRunToFront(run: Run): Paragraph {
        this.root.splice(1, 0, run);
        return this;
    }
}
