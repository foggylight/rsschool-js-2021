import Component from './component';

export default class Header extends Component {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'header', ['page-header']);
  }

  render(): void {
    this.node.textContent = 'header';
  }
}
