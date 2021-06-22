import { FormType, ICar, IEngine, IGarage, IResult, PageType } from '../models';
import Component from '../components/component';
import {
  createWinner,
  deleteCar,
  driveCar,
  generateCars,
  getCar,
  getCars,
  getItemsCount,
  getWinner,
  paths,
  startEngine,
  stopEngine,
  updateWinner,
} from '../service';
import state from '../state';
import View from './view';
import Button from '../components/button';
import Car from '../components/car';
import Form from '../components/form';
import ModalBox from '../components/modalBox';

const race = async (promises: Promise<IResult>[], ids: number[]): Promise<IResult> => {
  const res: IResult = await Promise.race(promises);
  if (res.time === 0 && promises.length !== 1) {
    const failedIndex = ids.findIndex(id => id === res.id);
    const newPromises = [
      ...promises.slice(0, failedIndex),
      ...promises.slice(failedIndex + 1, promises.length),
    ];
    const newIds = [...ids.slice(0, failedIndex), ...ids.slice(failedIndex + 1, ids.length)];
    const newRace = await race(newPromises, newIds);
    return newRace;
  }
  return { id: res.id, time: res.time };
};

const startBtnHandler = async (btn: HTMLButtonElement): Promise<IResult> => {
  const { id } = btn.dataset;
  if (!id) throw new Error('no id in btn dataset');
  const car = document.getElementById(`car-${id}`);
  if (!car) throw new Error(`can't find the car`);
  btn.setAttribute('disabled', 'disabled');
  const res: IEngine = await startEngine(+id);
  let finishTime: number = res.distance / res.velocity;
  car.style.animationDuration = `${finishTime}ms`;
  car.classList.add('car-icon_driving');
  const stopBtn = document.getElementById(`stop-btn-${id}`);
  stopBtn?.removeAttribute('disabled');
  const drivingStatus = await driveCar(+id);
  if (drivingStatus === 500) {
    car.style.animationPlayState = 'paused';
    finishTime = 0;
  }
  return { id: +id, time: finishTime };
};

const stopBtnHandler = async (btn: HTMLButtonElement): Promise<void> => {
  const { id } = btn.dataset;
  if (!id) throw new Error('no id in btn dataset');
  const car = document.getElementById(`car-${id}`);
  if (!car) throw new Error(`can't find the car`);
  await stopEngine(+id);
  car.style.animationPlayState = 'running';
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
    this.raceBtn = new Button(btnContainer, ['btn-race'], 'race').node;
    this.resetBtn = new Button(btnContainer, ['btn-reset'], 'reset').node;
    this.resetBtn.disabled = true;
    this.addRaceListeners();
    this.generateBtn = new Button(btnContainer, ['btn-generate'], 'generate cars').node;
    this.addGenerateListener();

    this.initHeadings();

    this.carsContainer = new Component(this.node, 'div', ['cars-container']);
    this.addPaginationButtons();

    this.selectButtons = [];
    this.removeButtons = [];
    this.startButtons = [];
    this.stopButtons = [];

    this.renderCarsList();
    this.hide();
    this.parent.append(this.node);
  }

  resetCarsContainer(): void {
    this.carsContainer.clear();
    this.selectButtons = [];
    this.removeButtons = [];
    this.startButtons = [];
    this.stopButtons = [];
  }

  async renderCarsList(): Promise<void> {
    this.resetCarsContainer();
    this.raceBtn.disabled = false;
    this.resetBtn.disabled = true;
    const cars = await getCars(this.currentPage);
    cars.forEach((car: ICar) => {
      const carContainer = new Component(this.carsContainer.node, 'div', ['car-container']).node;
      const topBlock = new Component(carContainer, 'div', ['car-block']).node;
      const bottomBlock = new Component(carContainer, 'div', ['car-block', 'car-block_bottom'])
        .node;

      const selectBtn = new Button(topBlock, ['btn-crud'], 'select', car.id).node;
      this.selectButtons.push(selectBtn);
      const removeBtn = new Button(topBlock, ['btn-crud'], 'remove', car.id).node;
      this.removeButtons.push(removeBtn);
      const carName = new Component(null, 'p', ['car-name'], car.name).node;
      topBlock.append(carName);

      const startBtn = new Button(bottomBlock, ['btn-move', 'btn_start'], 'start', car.id).node;
      startBtn.id = `start-btn-${car.id}`;
      this.startButtons.push(startBtn);
      const stopBtn = new Button(bottomBlock, ['btn-move', 'btn_stop'], 'stop', car.id).node;
      stopBtn.id = `stop-btn-${car.id}`;
      stopBtn.disabled = true;
      this.stopButtons.push(stopBtn);
      const carIcon = new Car(null, car.color, car.id).node;
      bottomBlock.append(carIcon);
    });

    this.addCarsButtonsListeners();
  }

  toggleRaceBtns(): void {
    this.raceBtn.disabled = !this.raceBtn.disabled;
    this.resetBtn.disabled = !this.resetBtn.disabled;
  }

  async checkCarsListReloadNeed(): Promise<boolean> {
    const itemsCount = await getItemsCount(this.pageName);
    return itemsCount - paths[this.pageName].limit * (this.currentPage - 1) < 7;
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
    this.startButtons.forEach(btn =>
      btn.addEventListener('click', () => {
        startBtnHandler(btn);
      }),
    );
    this.stopButtons.forEach(btn => btn.addEventListener('click', () => stopBtnHandler(btn)));
  }

  addRaceListeners(): void {
    this.raceBtn.addEventListener('click', async () => {
      this.toggleRaceBtns();
      const startingCars = await this.startButtons.map(async btn => {
        const res = await startBtnHandler(btn);
        return res;
      });
      const ids: number[] = this.startButtons.map(btn => {
        if (!btn.dataset.id) throw Error('start btn: no id in dataset');
        return +btn.dataset.id;
      });
      const winner = await race(startingCars, ids);
      const winnerName = await (await getCar(winner.id)).name;
      const time = Math.round(winner.time / 10) / 100;
      const modal = new ModalBox(null, winnerName, time).node;
      this.node.append(modal);
      if (winner.time === 0) return;
      if ((await (await getWinner(winner.id)).status) === 200) {
        await updateWinner(winner.id, time);
      } else {
        await createWinner(winner.id, time);
      }
    });

    this.resetBtn.addEventListener('click', async () => {
      const stopBtnPromises = await this.stopButtons.map(async btn => {
        const res = await stopBtnHandler(btn);
        return res;
      });
      await Promise.all(stopBtnPromises);
      this.toggleRaceBtns();
    });
  }

  addGenerateListener(): void {
    this.generateBtn.addEventListener('click', async () => {
      const reload = await this.checkCarsListReloadNeed();
      await generateCars(100);
      await this.checkPaginationButtonState();
      if (reload) await this.renderCarsList();
      await this.renderItemsCount('Garage');
    });
  }

  async render(): Promise<void> {
    this.show();
    await this.renderItemsCount('Garage');
  }
}
