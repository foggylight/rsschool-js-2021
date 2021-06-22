import Car from '../components/car';
import Component from '../components/component';
import { IWinner, PageType, SortOrder } from '../models';
import { getCar, getWinners } from '../service';
import state from '../state';
import View from './view';

export default class Winners extends View {
  path: string;

  parent: HTMLElement;

  table: HTMLElement;

  tableHeadings: HTMLElement[];

  tableBody: Component;

  wins: HTMLElement | null;

  time: HTMLElement | null;

  constructor(parentNode: HTMLElement) {
    super(parentNode);
    this.parent = parentNode;
    this.path = '/winners';
    this.pageName = PageType.winners;
    this.currentPage = state.winnersPage;

    this.initHeadings();

    this.table = new Component(this.node, 'table', ['winners-table']).node;
    const tableHead = new Component(this.table, 'thead').node;
    const headingRow = new Component(tableHead, 'tr', ['winners-table__h-row']).node;

    this.wins = null;
    this.time = null;
    const tableHeadingsList = ['Number', 'Car', 'Name', 'Wins', 'Best time (seconds)'];
    this.tableHeadings = tableHeadingsList.map((heading: string) => {
      const tableHeading = new Component(headingRow, 'td', ['winners-table__h-data'], heading).node;
      if (heading === 'Wins') {
        this.wins = tableHeading;
        this.wins.classList.add('winners-table__h-sort');
      }
      if (heading === 'Best time (seconds)') {
        this.time = tableHeading;
        this.time.classList.add('winners-table__h-sort');
      }
      return tableHeading;
    });
    this.sortingBtnsListeners();
    this.tableBody = new Component(this.table, 'tbody');
    this.addPaginationButtons();

    this.hide();
    this.parent.append(this.node);
  }

  resetSortingClasses(): void {
    this.time?.classList.remove('winners-table__h-sort_asc', 'winners-table__h-sort_desc');
    this.wins?.classList.remove('winners-table__h-sort_asc', 'winners-table__h-sort_desc');
  }

  renderSortingBtns(): void {
    if (state.sortBy === 'wins') {
      this.resetSortingClasses();
      this.wins?.classList.add(
        state.sortOrder === SortOrder.asc
          ? 'winners-table__h-sort_asc'
          : 'winners-table__h-sort_desc',
      );
    }
    if (state.sortBy === 'time') {
      this.resetSortingClasses();
      this.time?.classList.add(
        state.sortOrder === SortOrder.asc
          ? 'winners-table__h-sort_asc'
          : 'winners-table__h-sort_desc',
      );
    }
  }

  async sortingHandler(sort: string): Promise<void> {
    if (state.sortBy === `${sort}`) {
      state.sortOrder = state.sortOrder === SortOrder.asc ? SortOrder.desc : SortOrder.asc;
    } else {
      state.sortBy = `${sort}`;
    }
    this.renderSortingBtns();
    await this.renderTableBody();
  }

  sortingBtnsListeners(): void {
    this.wins?.addEventListener('click', () => this.sortingHandler('wins'));
    this.time?.addEventListener('click', () => this.sortingHandler('time'));
  }

  async renderTableBody(): Promise<void> {
    const winners = await getWinners(this.currentPage, state.sortBy, state.sortOrder);
    this.tableBody.clear();

    winners.map(async (winner: IWinner, index: number) => {
      const row = new Component(this.tableBody.node, 'tr').node;

      const makeTableData = (content: string): Component =>
        new Component(row, 'td', ['winners-table__data'], content);

      const car = await getCar(winner.id);
      makeTableData(`${index + 1}`);
      const carIconCell = makeTableData(``).node;
      const carIcon = new Car(carIconCell, car.color, car.id);
      carIcon.node.classList.add('car-icon-container_winners');
      makeTableData(`${car.name}`);
      makeTableData(`${winner.wins}`);
      makeTableData(`${winner.time}`);
    });
  }

  async paginationHandler(nextPage: boolean): Promise<void> {
    super.paginationHandler(nextPage);
    await this.renderTableBody();
  }

  async render(): Promise<void> {
    this.renderTableBody();
    this.show();
    await this.renderItemsCount('Winners');
    await this.checkPaginationButtonState();
  }
}
