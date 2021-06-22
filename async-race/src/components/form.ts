import { FormType, IGarage } from '../models';
import { createCar, updateCar } from '../service';
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

    this.colorInput = document.createElement('input');
    this.colorInput.type = 'color';
    this.colorInput.name = 'color';

    this.node.append(this.nameInput, this.colorInput);

    this.btn = new Button(this.node, ['btn-form', 'btn-crud'], type).node;
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

  setDefaultValue(): void {
    this.nameInput.value = '';
    this.colorInput.value = '#000000';
  }

  addListeners(): void {
    const getData = (e: Event): { name: string; color: string } => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      const carName = formData.get('name') as string;
      const carColor = formData.get('color') as string;
      return { name: carName, color: carColor };
    };

    if (this.formType === FormType.create) {
      this.node.addEventListener('submit', async e => {
        const { name, color } = getData(e);
        const reload = await this.parent.checkCarsListReloadNeed();
        await createCar(name, color);
        this.setDefaultValue();
        if (reload) this.parent.renderCarsList();
        this.parent.renderItemsCount('Garage');
        this.parent.checkPaginationButtonState();
      });
    }
    if (this.formType === FormType.update) {
      this.node.addEventListener('submit', async e => {
        const { name, color } = getData(e);
        const id = this.parent.currentCarId;
        if (!id) throw new Error('no current car id');
        await updateCar(id, name, color);
        this.setDefaultValue();
        this.disable(true);
        this.parent.renderCarsList();
      });
    }
  }
}
