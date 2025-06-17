export abstract class Component {
  protected element: HTMLElement;

  constructor(element?: HTMLElement) {
    this.element = element || document.createElement("div");
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  protected abstract render(): void;
}
