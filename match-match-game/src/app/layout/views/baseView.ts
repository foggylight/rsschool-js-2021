import { View } from '../../app.api';

export default class BasePage implements View {
  public path: string;

  public node: HTMLElement;

  constructor(readonly parentNode: HTMLElement) {
    this.parentNode = parentNode;
    this.path = '/';

    const elem = document.createElement('div');
    elem.classList.add('content');
    this.node = elem;

    this.init();
  }

  init(): void {
    this.parentNode.append(this.node);
  }
}
