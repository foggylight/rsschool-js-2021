import BaseComponent from '../components/baseComponent';

export default class PageContent extends BaseComponent {
  content: BaseComponent;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['content-wrapper']);
    this.content = new BaseComponent(this.node, 'div', ['content']);

    this.render();
  }

  render(): void {
    console.log('content', this.content.node);
  }
}
