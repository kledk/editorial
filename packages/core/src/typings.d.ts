import { BaseEditor, BaseText, BaseElement } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";

/**
 * Default CSS definition for typescript,
 * will be overridden with file-specific definitions by rollup
 */
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

interface SvgrComponent
  extends React.StatelessComponent<React.SVGAttributes<SVGElement>> {}

declare module "*.svg" {
  const svgUrl: string;
  const svgComponent: SvgrComponent;
  export default svgUrl;
  export { svgComponent as ReactComponent };
}

export type EditorialEditor = BaseEditor & ReactEditor & HistoryEditor;

type CustomText = { text: string };
type CustomElement = { type: string; children: CustomText[], [x: string]: any };

declare module "slate" {
  interface CustomTypes {
    Editor: EditorialEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
