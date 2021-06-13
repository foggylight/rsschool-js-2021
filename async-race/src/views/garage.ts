import { FormType, ICar, IGarage, PageType } from '../models';
import Component from '../components/component';
import { deleteCar, generateCars, getCar, getCars } from '../service';
import state from '../state';
import View from './view';
import Button from '../components/button';
import CarImage from '../components/carImage';
import Form from '../components/form';

export default class Garage extends View implements IGarage {
  path: string;

  carsContainer: Component;

  selectButtons: HTMLButtonElement[];

  removeButtons: HTMLButtonElement[];

  startButtons: HTMLButtonElement[];

  stopButtons: HTMLButtonElement[];

  formUpdate: Form;

  formCreate: Form;

  currentCarId: number | null;

  raceBtn: HTMLButtonElement;

  resetBtn: HTMLButtonElement;

  generateBtn: HTMLButtonElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode);
    this.path = '/';
    this.pageName = PageType.garage;
    this.currentPage = state.garagePage;
    this.currentCarId = null;

    this.formCreate = new Form(this, [], FormType.create);
    this.formUpdate = new Form(this, [], FormType.update);

    const btnContainer = new Component(this.node, 'div', ['race-btn-container']).node;
    this.raceBtn = new Button(btnContainer, [], 'race').node;
    this.resetBtn = new Button(btnContainer, [], 'reset').node;
    this.resetBtn.disabled = true;
    this.generateBtn = new Button(btnContainer, [], 'generate cars').node;
    this.addGenerateListener();

    this.initHeadings();

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

      const selectBtn = new Button(topBlock, ['btn_crud'], 'select', car.id).node;
      this.selectButtons.push(selectBtn);
      const removeBtn = new Button(topBlock, ['btn_crud'], 'remove', car.id).node;
      this.removeButtons.push(removeBtn);
      const carName = new Component(topBlock, 'p', ['car-name'], car.name);

      const startBtn = new Button(bottomBlock, ['btn_move', 'btn_start'], 'start', car.id).node;
      const stopBtn = new Button(bottomBlock, ['btn_move', 'btn_stop'], 'stop', car.id).node;
      const carIcon = new CarImage(bottomBlock, car.color);
    });

    this.addCarsButtonsListeners();
  }

  paginationHandler(nextPage: boolean): void {
    super.paginationHandler(nextPage);
    this.renderCarsList();
  }

  async handlerSelect(id: number): Promise<void> {
    this.formUpdate.disable(false);
    this.currentCarId = id;
    const car = await getCar(id);
    this.formUpdate.nameInput.value = car.name;
    this.formUpdate.colorInput.value = car.color;
  }

  async handlerRemove(id: number): Promise<void> {
    await deleteCar(id);
    await this.renderItemsCount('Garage');
    await this.renderCarsList();
    await this.checkPaginationButtonState();
  }

  addCarsButtonsListeners(): void {
    this.selectButtons.forEach(btn => {
      const carId = btn.dataset.id;
      if (carId) btn.addEventListener('click', () => this.handlerSelect(+carId));
    });
    this.removeButtons.forEach(btn => {
      const carId = btn.dataset.id;
      if (carId) btn.addEventListener('click', () => this.handlerRemove(+carId));
    });
  }

  addGenerateListener(): void {
    this.generateBtn.addEventListener('click', async () => {
      await generateCars(5);
      await this.renderItemsCount('Garage');
      await this.renderCarsList();
      await this.checkPaginationButtonState();
    });
  }

  async render(): Promise<void> {
    this.parent.append(this.node);
    await this.renderItemsCount('Garage');
    await this.renderCarsList();
  }
}
