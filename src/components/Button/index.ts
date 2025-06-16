import { Component } from "../../core/Component";
import "./styles.css";

export type ButtonVariant = "primary" | "secondary" | "outlined" | "text";
export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  text: string;
  disabled?: boolean;
  onClick?: (event: MouseEvent) => void;
  className?: string;
}

export class Button extends Component {
  private props: ButtonProps;

  constructor(props: ButtonProps) {
    super();
    this.props = {
      variant: "primary",
      size: "medium",
      disabled: false,
      ...props,
    };
    this.render();
  }

  protected render(): void {
    const button = document.createElement("button");
    button.textContent = this.props.text;
    button.disabled = this.props.disabled || false;

    if (this.props.className) {
      button.className = this.props.className;
    }

    button.classList.add("button", `button-${this.props.variant}`, `button-${this.props.size}`);

    if (this.props.disabled) {
      button.classList.add("button-disabled");
    }

    if (this.props.onClick) {
      button.addEventListener("click", this.props.onClick);
    }

    this.element = button;
  }
}
