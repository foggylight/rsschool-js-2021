import { Component } from './app.api';
import Header from './layout/header/header';
import PageContent from './layout/pageContent';

export default class App implements Component {
  private app: HTMLElement | null;

  private header: Header | null;

  private content: PageContent | null;

  constructor(private readonly rootNode: HTMLElement) {
    this.app = null;
    this.header = null;
    this.content = null;

    this.render();
  }

  public init(): void {
    this.app = document.createElement('div');
    this.rootNode.append(this.app);
    this.header = new Header(this.app);
    this.header.init();
    this.content = new PageContent(this.app);
    this.content.init();
  }

  render(): void {
    console.log('hello from app', this.app);
  }
}
