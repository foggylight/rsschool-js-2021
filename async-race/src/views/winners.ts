import Component from '../components/component';

export default class Winners extends Component {
  path: string;

  parent: HTMLElement;

  constructor(parentNode: HTMLElement) {
    super();
    this.parent = parentNode;
    this.path = '/winners';
  }

  render(): void {
    this.parent.append(this.node);
    this.node.textContent = 'winners';
  }
}
