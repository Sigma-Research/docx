import { IParagraphPropertiesOptions, ParagraphProperties } from "file/paragraph";
import { IRunPropertiesOptions, RunProperties } from "file/paragraph/run/properties";

import { BasedOn, Link, Next, QuickFormat, SemiHidden, UiPriority, UnhideWhenUsed } from "./components";
import { Style } from "./style";

export interface IBaseParagraphStyleOptions {
    readonly basedOn?: string;
    readonly next?: string;
    readonly quickFormat?: boolean;
    readonly link?: string;
    readonly semiHidden?: boolean;
    readonly uiPriority?: number;
    readonly unhideWhenUsed?: boolean;
    readonly run?: IRunPropertiesOptions;
    readonly paragraph?: IParagraphPropertiesOptions;
}

export interface IParagraphStyleOptions extends IBaseParagraphStyleOptions {
    readonly id: string;
    readonly name?: string;
}

export class ParagraphStyle extends Style {
    private readonly paragraphProperties: ParagraphProperties;
    private readonly runProperties: RunProperties;

    constructor(options: IParagraphStyleOptions) {
        super({ type: "paragraph", styleId: options.id }, options.name);
        this.paragraphProperties = new ParagraphProperties(options.paragraph);
        if (options.run) {
            type Mutable<T> = { -readonly [P in keyof T]: T[P] };
            const runOptions: Mutable<typeof options.run> = { ...options.run };
            if (runOptions.bold && runOptions.boldComplexScript === undefined) {
                runOptions.boldComplexScript = false;
            }
            if (runOptions.italics && runOptions.italicsComplexScript === undefined) {
                runOptions.italicsComplexScript = false;
            }
            if (runOptions.highlight && runOptions.highlightComplexScript === undefined) {
                runOptions.highlightComplexScript = false;
            }
            if ((runOptions.shading || runOptions.shadow) && runOptions.shadingComplexScript === undefined) {
                runOptions.shadingComplexScript = false;
            }
            this.runProperties = new RunProperties(runOptions);
        } else {
            this.runProperties = new RunProperties();
        }
        this.root.push(this.paragraphProperties);
        this.root.push(this.runProperties);

        if (options.basedOn) {
            this.root.push(new BasedOn(options.basedOn));
        }

        if (options.next) {
            this.root.push(new Next(options.next));
        }

        if (options.quickFormat) {
            this.root.push(new QuickFormat());
        }

        if (options.link) {
            this.root.push(new Link(options.link));
        }

        if (options.semiHidden) {
            this.root.push(new SemiHidden());
        }

        if (options.uiPriority) {
            this.root.push(new UiPriority(options.uiPriority));
        }

        if (options.unhideWhenUsed) {
            this.root.push(new UnhideWhenUsed());
        }
    }
}
