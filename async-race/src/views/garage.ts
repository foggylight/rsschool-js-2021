import { ICar, PageType } from '../models';
import Component from '../components/component';
import { getCars } from '../service';
import state from '../state';
import View from './view';
import Button from '../components/button';
import CarImage from '../components/carImage';

export default class Garage extends View {
  path: string;

  carsContainer: Component;

  selectButtons: HTMLButtonElement[];

  removeButtons: HTMLButtonElement[];

  startButtons: HTMLButtonElement[];

  stopButtons: HTMLButtonElement[];

  constructor(parentNode: HTMLElement) {
    super(parentNode);
    this.path = '/';
    this.pageName = PageType.garage;
    this.currentPage = state.garagePage;

    this.carsContainer = new Component(this.node, 'div', ['cars-container']);
    this.addPaginationButtons();

    this.selectButtons = [];
    this.removeButtons = [];
    this.startButtons = [];
    this.stopButtons = [];
  }

  async renderCarsList(): Promise<void> {
    this.carsContainer.clear();
    const cars = await getCars(this.currentPage);
    cars.forEach((car: ICar) => {
      const carContainer = new Component(this.carsContainer.node, 'div', ['car-container']).node;
      const topBlock = new Component(carContainer, 'div', ['car-block']).node;
      const bottomBlock = new Component(carContainer, 'div', ['car-block', 'car-block_bottom'])
        .node;

      const selectBtn = new Button(topBlock, ['btn', 'btn_crud'], 'select', car.id).node;
      this.selectButtons.push(selectBtn);
      const removeBtn = new Button(topBlock, ['btn', 'btn_crud'], 'remove', car.id).node;
      const carName = new Component(topBlock, 'p', ['car-name'], car.name);

      const startBtn = new Button(bottomBlock, ['btn', 'btn_move', 'btn_start'], 'start', car.id)
        .node;
      const stopBtn = new Button(bottomBlock, ['btn', 'btn_move', 'btn_stop'], 'stop', car.id).node;
      const carIcon = new CarImage(bottomBlock, car.color);
    });
  }

  paginationHandler(nextPage: boolean): void {
    super.paginationHandler(nextPage);
    this.renderCarsList();
  }

  async render(): Promise<void> {
    this.parent.append(this.node);
    await this.renderItemsCount('Garage');
    await this.renderCarsList();
  }
}
