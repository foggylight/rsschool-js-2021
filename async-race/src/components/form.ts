import { FormType, IGarage } from '../models';
import { createCar, updateCar } from '../service';
// import state from '../state';
import Button from './button';

export default class Form {
  private formType: string;

  public node: HTMLFormElement;

  nameInput: HTMLInputElement;

  colorInput: HTMLInputElement;

  btn: HTMLButtonElement;

  parent: IGarage;

  constructor(parentNode: IGarage, classNames: string[] = [], type: FormType) {
    this.formType = type;
    this.node = document.createElement('form');
    this.node.classList.add('form', ...classNames);
    this.parent = parentNode;

    parentNode.node.append(this.node);

    this.nameInput = document.createElement('input');
    this.nameInput.type = 'text';
    this.nameInput.name = 'name';
    this.nameInput.classList.add('form__input');
    // this.nameInput.value = state[this.formType as FormType.create | FormType.update].text;

    this.colorInput = document.createElement('input');
    this.colorInput.type = 'color';
    this.colorInput.name = 'color';
    // this.colorInput.value = state[this.formType as FormType.create | FormType.update].color;

    this.node.append(this.nameInput, this.colorInput);

    this.btn = new Button(this.node, ['btn-form'], type).node;
    this.btn.type = 'submit';

    if (type === FormType.update) {
      this.disable(true);
    }

    this.addListeners();
  }

  disable(shouldDisable: boolean): void {
    this.nameInput.disabled = shouldDisable;
    this.colorInput.disabled = shouldDisable;
    this.btn.disabled = shouldDisable;
  }

  // inputHandler(input: HTMLInputElement): void {
  //   console.log(input.value);
  //   if (input.type === 'color')
  //     state[this.formType as FormType.create | FormType.update].color = input.value;
  //   else state[this.formType as FormType.create | FormType.update].text = input.value;
  //   console.log(state);
  // }

  addListeners(): void {
    // this.colorInput.addEventListener('input', () => this.inputHandler(this.colorInput));
    // this.nameInput.addEventListener('input', () => this.inputHandler(this.nameInput));

    if (this.formType === FormType.create) {
      this.node.addEventListener('submit', async e => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const carName = formData.get('name') as string;
        const carColor = formData.get('color') as string;
        await createCar(carName, carColor);
        this.nameInput.value = '';
        this.colorInput.value = '#000000';
        this.parent.renderItemsCount('Garage');
      });
    }
    if (this.formType === FormType.update) {
      this.node.addEventListener('submit', async e => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const carName = formData.get('name') as string;
        const carColor = formData.get('color') as string;
        const id = this.parent.currentCarId;
        if (!id) throw new Error('no current car id');
        await updateCar(id, carName, carColor);
        this.nameInput.value = '';
        this.colorInput.value = '#000000';
        this.disable(true);
        this.parent.renderCarsList();
      });
    }
  }
}
