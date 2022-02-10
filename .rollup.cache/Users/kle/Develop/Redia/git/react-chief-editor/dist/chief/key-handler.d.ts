import { Editor } from "slate";
export declare type KeyHandler = {
    /** Key pattern used to trigger, eg. "mod+b"*/
    pattern?: string | null | string[];
    /** Handler function for key trigger.*/
    handler: (e: KeyboardEvent, editor: Editor) => boolean | undefined | void;
    priority?: "high" | "low";
};
//# sourceMappingURL=key-handler.d.ts.map