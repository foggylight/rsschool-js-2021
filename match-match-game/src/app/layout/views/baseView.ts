import { Page, View } from '../../app.api';

export default class BasePage implements View {
  public path: string;

  public node: HTMLElement;

  constructor(readonly parent: Page) {
    this.parent = parent;
    this.path = '/';

    const elem = document.createElement('div');
    elem.classList.add('content');
    this.node = elem;
  }

  init(): void {
    this.parent.node.append(this.node);
  }
}
