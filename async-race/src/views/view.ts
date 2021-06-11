import { PageType } from '../models';
import Component from '../components/component';
import { getItemsCount } from '../service';

export default class View extends Component {
  parent: HTMLElement;

  page: number;

  heading: HTMLElement;

  pageLabel: HTMLElement;

  constructor(parentNode: HTMLElement) {
    super();
    this.parent = parentNode;
    this.page = 1;

    this.heading = new Component(this.node, 'h1', ['heading']).node;
    this.pageLabel = new Component(this.node, 'p', ['subheading']).node;
    this.updatePageLabel();
  }

  updatePageLabel(): void {
    this.pageLabel.textContent = `Page #${this.page}`;
  }

  async renderItemsCount(pageName: string): Promise<void> {
    const name = pageName.toLowerCase() as PageType;
    const itemsCount = await getItemsCount(name);
    this.heading.textContent = `${pageName} (${itemsCount})`;
  }
}
