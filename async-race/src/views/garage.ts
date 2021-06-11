import { ICar } from '../models';
import Component from '../components/component';
import { getCars } from '../service';
import state from '../state';
import View from './view';

export default class Garage extends View {
  path: string;

  page: number;

  carsContainer: Component;

  constructor(parentNode: HTMLElement) {
    super(parentNode);
    this.path = '/';
    this.page = state.garagePage;

    this.carsContainer = new Component(this.node, 'div', ['cars-container']);
  }

  async initCarsList(): Promise<void> {
    this.carsContainer.clear();
    const cars = await getCars(this.page);
    cars.forEach((car: ICar) => {
      const carContainer = new Component(this.carsContainer.node, 'div', [
        'car-container',
      ]).node;
      const nameBlock = new Component(carContainer, 'div', ['car-block']).node;
      const mainBlock = new Component(carContainer, 'div', ['car-block']).node;
      const carName = new Component(nameBlock, 'p', ['car-name'], car.name);
    });
  }

  async render(): Promise<void> {
    this.parent.append(this.node);
    await this.renderItemsCount('Garage');
    await this.initCarsList();
  }
}
