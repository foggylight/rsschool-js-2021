import Component from '../components/component';
import { IWinner } from '../models';
import { getCar, getWinners } from '../service';
import View from './view';

export default class Winners extends View {
  path: string;

  parent: HTMLElement;

  table: HTMLElement;

  tableHeadings: string[] | HTMLElement[];

  tableBody: Component;

  constructor(parentNode: HTMLElement) {
    super(parentNode);
    this.parent = parentNode;
    this.path = '/winners';

    this.table = new Component(this.node, 'table', ['winners-table']).node;
    const tableHead = new Component(this.table, 'thead').node;
    const headingRow = new Component(tableHead, 'tr', ['winners-table__h-row'])
      .node;

    const tableHeadingsList = [
      'Number',
      'Car',
      'Name',
      'Wins',
      'Best time (seconds)',
    ];
    this.tableHeadings = tableHeadingsList.map((heading: string) => {
      const tableHeading = new Component(
        headingRow,
        'td',
        ['winners-table__h-data'],
        heading,
      ).node;
      return tableHeading;
    });
    this.tableBody = new Component(this.table, 'tbody');
  }

  async initTableBody(): Promise<void> {
    this.tableBody.clear();
    const winners = await getWinners();
    console.log(winners);

    winners.map(async (winner: IWinner, index: number) => {
      const row = new Component(this.tableBody.node, 'tr').node;

      const makeTableData = (content: string): Component =>
        new Component(row, 'td', ['winners-table__data'], content);

      const car = await getCar(winner.id);
      makeTableData(`${index + 1}`);
      makeTableData(`${car.color}`);
      makeTableData(`${car.name}`);
      makeTableData(`${winner.wins}`);
      makeTableData(`${winner.time}`);
    });
  }

  async render(): Promise<void> {
    this.parent.append(this.node);
    await this.renderItemsCount('Winners');
    await this.initTableBody();
  }
}
