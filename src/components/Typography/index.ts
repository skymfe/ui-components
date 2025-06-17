import { Component } from "../../core/Component";
import "./styles.css";

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body1"
  | "body2"
  | "caption";

export interface TypographyProps {
  variant: TypographyVariant;
  className?: string;
}

export const getTypographyTagName = (variant: TypographyVariant): string => {
  switch (variant) {
    case "h1":
    case "h2":
    case "h3":
    case "h4":
    case "h5":
    case "h6":
      return variant;
    case "body1":
    case "body2":
    case "caption":
      return "p";
    default:
      return "p";
  }
};

export class Typography extends Component {
  private props: TypographyProps;

  constructor(props: TypographyProps, element?: HTMLElement) {
    super(element);
    this.props = props;
    this.render();
  }

  protected render(): void {
    const element =
      this.element.tagName.toLowerCase() === getTypographyTagName(this.props.variant)
        ? this.element
        : document.createElement(getTypographyTagName(this.props.variant));

    if (this.props.className) {
      element.className = this.props.className;
    }

    element.classList.add("typography", `typography-${this.props.variant}`);
    this.element = element;
  }
}
