import { Component } from './app.api';
import Header from './layout/header/header';
import PageContent from './layout/pageContent';

import state from './state';

export default class App implements Component {
  private header: Header | null;

  private content: PageContent | null;

  constructor(private readonly rootNode: HTMLElement) {
    state.router.currentRoute = `/${window.location.hash.slice(1)}`;

    this.header = null;
    this.content = null;
  }

  init(): void {
    this.header = new Header(this.rootNode);
    this.content = new PageContent(this.rootNode);
  }

  private enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      state.router.currentRoute = `/${hash}`;
      console.log(state);
      this.render();
    });
  }

  render(): void {
    this.rootNode.innerHTML = '';
    this.init();
    this.header?.render();
    this.content?.render();
    this.enableRouteChange();
    console.log('app render');
  }
}
