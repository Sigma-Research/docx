import { EmphasisMarkType } from "file/paragraph/run/emphasis-mark";
import { RunProperties } from "file/paragraph/run/properties";
import { IFontAttributesProperties } from "file/paragraph/run/run-fonts";
import { UnderlineType } from "file/paragraph/run/underline";
import { ShadingType } from "file/table";

import { BasedOn, Link, SemiHidden, UiPriority, UnhideWhenUsed } from "./components";
import { Style } from "./style";

export interface IBaseCharacterStyleOptions {
    readonly basedOn?: string;
    readonly link?: string;
    readonly semiHidden?: boolean;
    readonly run?: {
        readonly size?: number;
        readonly bold?: boolean;
        readonly italics?: boolean;
        readonly smallCaps?: boolean;
        readonly allCaps?: boolean;
        readonly strike?: boolean;
        readonly doubleStrike?: boolean;
        readonly subScript?: boolean;
        readonly superScript?: boolean;
        readonly underline?: {
            readonly type?: UnderlineType;
            readonly color?: string;
        };
        readonly emphasisMark?: {
            readonly type?: EmphasisMarkType;
        };
        readonly color?: string;
        readonly font?: string | IFontAttributesProperties;
        readonly characterSpacing?: number;
        readonly highlight?: string;
        readonly shadow?: {
            readonly type: ShadingType;
            readonly fill: string;
            readonly color: string;
        };
    };
}

export interface ICharacterStyleOptions extends IBaseCharacterStyleOptions {
    readonly id: string;
    readonly name?: string;
}

export class CharacterStyle extends Style {
    private readonly runProperties: RunProperties;

    constructor(options: ICharacterStyleOptions) {
        super({ type: "character", styleId: options.id }, options.name);
        this.runProperties = new RunProperties(options.run);
        this.root.push(this.runProperties);
        this.root.push(new UiPriority(99));
        this.root.push(new UnhideWhenUsed());

        if (options.basedOn) {
            this.root.push(new BasedOn(options.basedOn));
        }

        if (options.link) {
            this.root.push(new Link(options.link));
        }

        if (options.semiHidden) {
            this.root.push(new SemiHidden());
        }
    }
}
