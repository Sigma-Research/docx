import { ShadingType } from "file/table";
import { IgnoreIfEmptyXmlComponent, XmlComponent } from "file/xml-components";
import { Caps, SmallCaps } from "./caps";
import { EmphasisMark, EmphasisMarkType } from "./emphasis-mark";
import {
    Bold,
    BoldComplexScript,
    CharacterSpacing,
    Color,
    DoubleStrike,
    Highlight,
    HighlightComplexScript,
    Italics,
    ItalicsComplexScript,
    RightToLeft,
    Shading,
    ShadowComplexScript,
    Size,
    SizeComplexScript,
    Strike,
} from "./formatting";
import { IFontAttributesProperties, RunFonts } from "./run-fonts";
import { SubScript, SuperScript } from "./script";
import { Style } from "./style";
import { Underline, UnderlineType } from "./underline";

interface IFontOptions {
    readonly name: string;
    readonly hint?: string;
}

export interface IRunPropertiesOptions {
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
    readonly characterSpacing?: number;
    readonly shading?: {
        readonly type: ShadingType;
        readonly fill: string;
        readonly color: string;
    };
    readonly shadow?: {
        readonly type: ShadingType;
        readonly fill: string;
        readonly color: string;
    };
}

export class RunProperties extends IgnoreIfEmptyXmlComponent {
    constructor(options?: IRunPropertiesOptions) {
        super("w:rPr");

        if (!options) {
            return;
        }

        if (options.bold) {
            this.push(new Bold());
            this.push(new BoldComplexScript());
        }

        if (options.italics) {
            this.push(new Italics());
            this.push(new ItalicsComplexScript());
        }

        if (options.underline) {
            this.push(new Underline(options.underline.type, options.underline.color));
        }

        if (options.emphasisMark) {
            this.push(new EmphasisMark(options.emphasisMark.type));
        }

        if (options.color) {
            this.push(new Color(options.color));
        }

        if (options.size) {
            this.push(new Size(options.size));
            this.push(new SizeComplexScript(options.size));
        }

        if (options.rightToLeft) {
            this.push(new RightToLeft());
        }

        if (options.smallCaps) {
            this.push(new SmallCaps());
        }

        if (options.allCaps) {
            this.push(new Caps());
        }

        if (options.strike) {
            this.push(new Strike());
        }

        if (options.doubleStrike) {
            this.push(new DoubleStrike());
        }

        if (options.subScript) {
            this.push(new SubScript());
        }

        if (options.superScript) {
            this.push(new SuperScript());
        }

        if (options.style) {
            this.push(new Style(options.style));
        }

        if (options.font) {
            if (typeof options.font === "string") {
                this.push(new RunFonts(options.font));
            } else if ("name" in options.font) {
                this.push(new RunFonts(options.font.name, options.font.hint));
            } else {
                this.push(new RunFonts(options.font));
            }
        }

        if (options.highlight) {
            this.push(new Highlight(options.highlight));
            this.push(new HighlightComplexScript(options.highlight));
        }

        if (options.characterSpacing) {
            this.push(new CharacterSpacing(options.characterSpacing));
        }

        if (options.shading) {
            this.push(new Shading(options.shading.type, options.shading.fill, options.shading.color));
            this.push(new ShadowComplexScript(options.shading.type, options.shading.fill, options.shading.color));
        } else if (options.shadow) {
            this.push(new Shading(options.shadow.type, options.shadow.fill, options.shadow.color));
            this.push(new ShadowComplexScript(options.shadow.type, options.shadow.fill, options.shadow.color));
        }
    }

    public push(item: XmlComponent): void {
        this.root.push(item);
    }
}
