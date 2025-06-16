import { Component } from "../../core/Component";

export type TypographyVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body1" | "body2" | "caption";

export interface TypographyProps {
  variant: TypographyVariant;
  text: string;
  className?: string;
}

export class Typography extends Component {
  private props: TypographyProps;

  constructor(props: TypographyProps) {
    super();
    this.props = props;
    this.render();
  }

  protected render(): void {
    const element = document.createElement(this.getTagName());
    element.textContent = this.props.text;

    if (this.props.className) {
      element.className = this.props.className;
    }

    element.classList.add("typography", `typography-${this.props.variant}`);
    this.element = element;
  }

  private getTagName(): string {
    switch (this.props.variant) {
      case "h1":
      case "h2":
      case "h3":
      case "h4":
      case "h5":
      case "h6":
        return this.props.variant;
      case "body1":
      case "body2":
      case "caption":
        return "p";
      default:
        return "p";
    }
  }
}
