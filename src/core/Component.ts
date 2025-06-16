export abstract class Component {
  protected element: HTMLElement;

  constructor() {
    this.element = document.createElement("div");
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  protected abstract render(): void;
}
