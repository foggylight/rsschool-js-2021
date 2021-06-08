import { Page } from '../../app.models';

export default class BasePage {
  public path: string;

  public node: HTMLElement;

  constructor(readonly parent: Page) {
    this.parent = parent;
    this.path = '/';

    this.node = document.createElement('div');
    this.node.classList.add('content');
  }
}
