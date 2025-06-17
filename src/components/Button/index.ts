import { Component } from "../../core/Component";
import "./styles.css";

export type ButtonVariant = "primary" | "secondary" | "outlined" | "text";
export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  className?: string;
}

export class Button extends Component {
  private props: ButtonProps;

  constructor(props: ButtonProps, element?: HTMLButtonElement) {
    super(element);
    this.props = {
      variant: "primary",
      size: "medium",
      disabled: false,
      ...props,
    };
    this.handleClick = this.handleClick.bind(this);
    this.render();
  }

  private handleClick(_event: MouseEvent): void {
    // do something like send analytics event
  }

  protected render(): void {
    const button =
      this.element instanceof HTMLButtonElement ? this.element : document.createElement("button");

    button.disabled = this.props.disabled || false;

    if (this.props.className) {
      button.className = this.props.className;
    }

    button.classList.add("button", `button-${this.props.variant}`, `button-${this.props.size}`);

    if (this.props.disabled) {
      button.classList.add("button-disabled");
    }

    button.addEventListener("click", this.handleClick);

    this.element = button;
  }

  destroy(): void {
    if (this.element) {
      this.element.removeEventListener("click", this.handleClick);
    }
  }
}
