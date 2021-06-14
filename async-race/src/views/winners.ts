import CarImage from '../components/carImage';
import Component from '../components/component';
import { IWinner, PageType } from '../models';
import { getCar, getWinners } from '../service';
import state from '../state';
import View from './view';

export default class Winners extends View {
  path: string;

  parent: HTMLElement;

  table: HTMLElement;

  tableHeadings: HTMLElement[];

  tableBody: Component;

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

    const tableHeadingsList = ['Number', 'Car', 'Name', 'Wins', 'Best time (seconds)'];
    this.tableHeadings = tableHeadingsList.map((heading: string) => {
      const tableHeading = new Component(headingRow, 'td', ['winners-table__h-data'], heading).node;
      return tableHeading;
    });
    this.tableBody = new Component(this.table, 'tbody');
    this.addPaginationButtons();
  }

  async renderTableBody(): Promise<void> {
    this.tableBody.clear();
    const winners = await getWinners(this.currentPage);

    winners.map(async (winner: IWinner, index: number) => {
      const row = new Component(this.tableBody.node, 'tr').node;

      const makeTableData = (content: string): Component =>
        new Component(row, 'td', ['winners-table__data'], content);

      const car = await getCar(winner.id);
      makeTableData(`${index + 1}`);
      const carIconCell = makeTableData(``).node;
      const carIcon = new CarImage(carIconCell, car.color, car.id);
      carIcon.node.classList.add('car-icon-container_winners');
      makeTableData(`${car.name}`);
      makeTableData(`${winner.wins}`);
      makeTableData(`${winner.time}`);
    });
  }

  paginationHandler(nextPage: boolean): void {
    super.paginationHandler(nextPage);
    this.renderTableBody();
  }

  async render(): Promise<void> {
    this.parent.append(this.node);
    await this.renderItemsCount('Winners');
    await this.renderTableBody();
  }
}
