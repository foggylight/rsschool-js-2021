import Component from '../components/component';

export default class Garage extends Component {
  path: string;

  parent: HTMLElement;

  constructor(parentNode: HTMLElement) {
    super();
    this.parent = parentNode;
    this.path = '/';
  }

  render(): void {
    this.parent.append(this.node);
    this.node.textContent = 'garage';
  }
}
