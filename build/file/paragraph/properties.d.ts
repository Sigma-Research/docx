import { IgnoreIfEmptyXmlComponent, XmlComponent } from "../../file/xml-components";
import { AlignmentType } from "./formatting/alignment";
import { IBorderOptions } from "./formatting/border";
import { IIndentAttributesProperties } from "./formatting/indent";
import { ISpacingProperties } from "./formatting/spacing";
import { HeadingLevel } from "./formatting/style";
import { LeaderType, TabStopPosition, TabStopType } from "./formatting/tab-stop";
export interface IParagraphPropertiesOptions {
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
    readonly rightTabStop?: number;
    readonly leftTabStop?: number;
    readonly style?: string;
    readonly bullet?: {
        readonly level: number;
    };
    readonly numbering?: {
        readonly reference: string;
        readonly level: number;
        readonly custom?: boolean;
    };
}
export declare class ParagraphProperties extends IgnoreIfEmptyXmlComponent {
    constructor(options?: IParagraphPropertiesOptions);
    push(item: XmlComponent): void;
}
