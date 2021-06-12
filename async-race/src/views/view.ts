import { PageType } from '../models';
import Component from '../components/component';
import { getItemsCount, paths } from '../service';
import Button from '../components/button';
import state from '../state';

export default class View extends Component {
  parent: HTMLElement;

  currentPage: number;

  heading: HTMLElement;

  pageLabel: HTMLElement;

  prevBtn: HTMLButtonElement;

  nextBtn: HTMLButtonElement;

  pageName: PageType;

  constructor(parentNode: HTMLElement) {
    super();
    this.parent = parentNode;
    this.currentPage = 1;
    this.pageName = PageType.default;

    this.heading = new Component(this.node, 'h1', ['heading']).node;
    this.pageLabel = new Component(this.node, 'p', ['subheading']).node;
    this.updatePageLabel();

    this.prevBtn = new Button(null, ['btn', 'btn-nav', 'btn-pagination'], 'prev').node;
    this.nextBtn = new Button(null, ['btn', 'btn-nav', 'btn-pagination'], 'next').node;
    this.addPaginationListeners();
  }

  updatePageLabel(): void {
    this.pageLabel.textContent = `Page #${this.currentPage}`;
  }

  async renderItemsCount(pageName: string): Promise<void> {
    const itemsCount = await getItemsCount(this.pageName);
    this.heading.textContent = `${pageName} (${itemsCount})`;
  }

  async addPaginationButtons(): Promise<void> {
    const btnContainer = new Component(this.node, 'div', ['nav-btn-container']).node;
    btnContainer.append(this.prevBtn, this.nextBtn);
    await this.checkPaginationButtonState();
  }

  async checkPaginationButtonState(): Promise<void> {
    if (this.currentPage === 1) {
      this.prevBtn.disabled = true;
    } else {
      this.prevBtn.disabled = false;
    }

    const itemsCount = await getItemsCount(this.pageName);
    if (itemsCount - paths[this.pageName].limit * this.currentPage <= 0) {
      this.nextBtn.disabled = true;
    } else {
      this.nextBtn.disabled = false;
    }
  }

  paginationHandler(nextPage: boolean): void {
    this.currentPage = nextPage ? this.currentPage + 1 : this.currentPage - 1;
    if (this.pageName === 'garage')
      state.garagePage = nextPage ? state.garagePage + 1 : state.garagePage - 1;
    if (this.pageName === 'winners')
      state.garagePage = nextPage ? state.winnersPage + 1 : state.winnersPage - 1;
    this.updatePageLabel();
    this.checkPaginationButtonState();
  }

  prevPaginationHandler(): void {
    this.currentPage -= 1;
    if (this.pageName === 'garage') state.garagePage -= 1;
    if (this.pageName === 'winners') state.winnersPage -= 1;
    this.updatePageLabel();
    this.checkPaginationButtonState();
  }

  nextPaginationHandler(): void {
    this.currentPage += 1;
    if (this.pageName === 'garage') state.garagePage += 1;
    if (this.pageName === 'winners') state.winnersPage += 1;
    this.updatePageLabel();
    this.checkPaginationButtonState();
  }

  addPaginationListeners(): void {
    this.prevBtn.addEventListener('click', () => this.paginationHandler(false));
    this.nextBtn.addEventListener('click', () => this.paginationHandler(true));
  }
}
