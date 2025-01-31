import { IRunPropertiesOptions, RunProperties } from "file/paragraph/run/properties";

import { BasedOn, Link, SemiHidden, UiPriority, UnhideWhenUsed } from "./components";
import { Style } from "./style";

export interface IBaseCharacterStyleOptions {
    readonly basedOn?: string;
    readonly link?: string;
    readonly semiHidden?: boolean;
    readonly run?: IRunPropertiesOptions;
}

export interface ICharacterStyleOptions extends IBaseCharacterStyleOptions {
    readonly id: string;
    readonly name?: string;
}

export class CharacterStyle extends Style {
    private readonly runProperties: RunProperties;

    constructor(options: ICharacterStyleOptions) {
        super({ type: "character", styleId: options.id }, options.name);
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
