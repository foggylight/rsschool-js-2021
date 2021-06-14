import { FormType, ICar, IEngine, IGarage, IResult, PageType } from '../models';
import Component from '../components/component';
import {
  deleteCar,
  driveCar,
  generateCars,
  getCar,
  getCars,
  startEngine,
  stopEngine,
} from '../service';
import state from '../state';
import View from './view';
import Button from '../components/button';
import CarImage from '../components/carImage';
import Form from '../components/form';

export const startBtnHandler = async (btn: HTMLButtonElement): Promise<IResult> => {
  const { id } = btn.dataset;
  if (!id) throw new Error('no id in btn dataset');
  const car = document.getElementById(`car-${id}`);
  if (!car) throw new Error(`can't find the car`);
  const res: IEngine = await startEngine(+id);
  console.log(res);
  let finishTime: number = res.distance / res.velocity;
  car.style.animationDuration = `${finishTime}ms`;
  car.classList.add('car-icon_driving');
  btn.setAttribute('disabled', 'disabled');
  const stopBtn = document.getElementById(`stop-btn-${id}`);
  stopBtn?.removeAttribute('disabled');
  const drivingStatus = await driveCar(+id);
  console.log(drivingStatus);
  if (drivingStatus === 500) {
    car.style.animationPlayState = 'paused';
    finishTime = 0;
  }
  return { id: +id, time: finishTime };
};

export const stopBtnHandler = async (btn: HTMLButtonElement): Promise<void> => {
  const { id } = btn.dataset;
  if (!id) throw new Error('no id in btn dataset');
  const car = document.getElementById(`car-${id}`);
  if (!car) throw new Error(`can't find the car`);
  await stopEngine(+id);
  car.classList.remove('car-icon_driving');
  btn.setAttribute('disabled', 'disabled');
  const startBtn = document.getElementById(`start-btn-${id}`);
  startBtn?.removeAttribute('disabled');
};

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
      startBtn.id = `start-btn-${car.id}`;
      this.startButtons.push(startBtn);
      const stopBtn = new Button(bottomBlock, ['btn_move', 'btn_stop'], 'stop', car.id).node;
      stopBtn.id = `stop-btn-${car.id}`;
      stopBtn.disabled = true;
      this.stopButtons.push(stopBtn);
      const carIcon = new CarImage(bottomBlock, car.color, car.id);
    });

    this.addCarsButtonsListeners();
    this.addRaceListeners();
  }

  toggleRaceBtns(): void {
    this.raceBtn.disabled = !this.raceBtn.disabled;
    this.resetBtn.disabled = !this.resetBtn.disabled;
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
    this.startButtons.forEach(btn => btn.addEventListener('click', () => startBtnHandler(btn)));
    this.stopButtons.forEach(btn => btn.addEventListener('click', () => stopBtnHandler(btn)));
  }

  addRaceListeners(): void {
    this.raceBtn.addEventListener('click', async () => {
      this.toggleRaceBtns();
      const finishTimes = this.startButtons.map(btn => startBtnHandler(btn));
      const results = await Promise.all(finishTimes);
      const winner = results.filter(res => res.time !== 0).sort((a, b) => a.time - b.time)[0];
      const winnerName = await (await getCar(winner.id)).name;
      const time = Math.round(winner.time / 10) / 100;
      console.log(winnerName, time);
    });
    this.resetBtn.addEventListener('click', async () => {
      this.raceBtn.disabled = false;
      this.resetBtn.disabled = true;
      this.stopButtons.forEach(btn => stopBtnHandler(btn));
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
