import { IParagraphPropertiesOptions } from "../../../file/paragraph";
import { IRunPropertiesOptions } from "../../../file/paragraph/run/properties";
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
export declare class ParagraphStyle extends Style {
    private readonly paragraphProperties;
    private readonly runProperties;
    constructor(options: IParagraphStyleOptions);
}
