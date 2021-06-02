import { Page } from '../../app.api';

export default class BasePage {
  public path: string;

  public node: HTMLElement;

  constructor(readonly parent: Page) {
    this.parent = parent;
    this.path = '/';

    const elem = document.createElement('div');
    elem.classList.add('content');
    this.node = elem;
  }
}
