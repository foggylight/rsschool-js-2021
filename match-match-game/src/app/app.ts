import Component from './app.api';
import Header from './layout/header/header';
import PageContent from './layout/pageContent';

export default class App implements Component {
  private readonly app: HTMLElement;

  private header: Header;

  private content: PageContent;

  constructor(private readonly rootNode: HTMLElement) {
    this.app = document.createElement('div');
    this.rootNode.append(this.app);
    this.header = new Header(this.app);
    this.content = new PageContent(this.app);

    this.render();
  }

  render(): void {
    console.log('hello from app', this.app);
  }
}
