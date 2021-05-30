import state from '../state';
import BaseComponent from './baseComponent';
import Button from './shared/btn';
import ModalBox from './shared/modalBox';

const validate = (input: HTMLInputElement | null): void => {
  if (!input) return;
  const label: HTMLLabelElement | undefined | null = input
    .closest('.form__input-container')
    ?.querySelector('.form__label');

  const addWarning = (): void => {
    if (!label) return;
    const warning = document.createElement('span');
    warning.classList.add('form__input-warning');
    warning.textContent = 'Value is invalid';
    if (!label.querySelector('.form__input-warning')) {
      label.append(warning);
    }
  };

  const regName = /^[^ ][^0-9~!@#$%*()_—+=|:;"'`<>,.?/^]{1,30}$/;
  const regEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (
    input.type === 'text'
      ? regName.test(input.value)
      : regEmail.test(input.value) && input.value.length < 31
  ) {
    label?.querySelector('.form__input-warning')?.remove();
    input.classList.remove('input_invalid');
    input.classList.add('input_valid');
  } else {
    addWarning();
    input.classList.add('input_invalid');
    input.classList.remove('input_valid');
  }
};

export default class Form {
  public node: HTMLFormElement;

  private btnSubmit: HTMLButtonElement;

  private btnCancel: HTMLButtonElement;

  private modalBox: ModalBox;

  private inputsName: NodeListOf<HTMLInputElement> | null;

  private inputEmail: HTMLInputElement | null;

  constructor(parentNode: ModalBox) {
    this.modalBox = parentNode;
    const form = document.createElement('form');
    form.method = 'POST';
    form.classList.add('form');
    this.node = form;

    const container = new BaseComponent(this.node, 'div', ['form__container']);
    container.node.innerHTML = `
      <div class="form__text-fields">
        <div class="form__input-container">
          <label class="form__label" for="first-name">First Name</label>
          <input class="form__input form__input-name" type="text" placeholder="Enter First Name" name="first-name" required>
        </div>
        <div class="form__input-container">
          <label class="form__label" for="last-name">Last Name</label>
          <input class="form__input form__input-name" type="text" placeholder="Enter Last Name" name="last-name" required>
        </div>
        <div class="form__input-container">
          <label class="form__label" for="email">E-mail</label>
          <input class="form__input form__input-email" type="email" placeholder="Enter E-mail" name="email" required>
        </div>
      </div>
      <div class="form__avatar-container">
        <input type="file" name="file" id="avatar" class="form__avatar-upload" accept=".png, .jpeg, .jpg">
        <label for="avatar" class="form__avatar-label form__uploaded-image"></label>
      </div>
    `;

    this.btnSubmit = new Button(
      'submit',
      ['form__btn-submit', 'btn_dark', 'btn_invalid'],
      'Add user',
    ).node;
    this.btnCancel = new Button(
      'button',
      ['form__btn-cancel', 'btn_dark'],
      'cancel',
    ).node;

    const btnContainer = new BaseComponent(this.node, 'div', [
      'form__btn-container',
    ]);

    btnContainer.node.append(this.btnSubmit);
    btnContainer.node.append(this.btnCancel);

    this.inputsName = this.node.querySelectorAll('.form__input-name');
    this.inputEmail = this.node.querySelector('.form__input-email');

    this.addAvatarListener();
    this.addCloseBtnListener();
    this.addInputNameListener();
    this.addInputEmailListener();
  }

  addInputNameListener(): void {
    this.inputsName?.forEach(input =>
      input.addEventListener('input', () => validate(input)),
    );
  }

  addInputEmailListener(): void {
    this.inputEmail?.addEventListener('input', () => validate(this.inputEmail));
  }

  addCloseBtnListener(): void {
    this.btnCancel.addEventListener('click', () => {
      this.modalBox.close();
    });
  }

  addAvatarListener(): void {
    const updateUserImage = (input: HTMLInputElement): void => {
      const imageContainer: HTMLElement | null = this.node.querySelector(
        '.form__uploaded-image',
      );
      if (!input.files) return;

      // const file = input.files[0];
      // const reader = new FileReader();
      // reader.onload = () => {
      //   image.src = reader.result;
      // };
      // reader.readAsDataURL(file);

      const imageURL = URL.createObjectURL(input.files[0]);
      state.user.imageSrc = imageURL;
      console.log(input.value);
      console.log(imageURL);
      if (imageContainer)
        imageContainer.style.backgroundImage = `url('${imageURL}')`;
    };

    const imageInput: HTMLInputElement | null = this.node.querySelector(
      '.form__avatar-upload',
    );
    if (!imageInput) return;
    console.log(imageInput);

    imageInput.addEventListener('change', () => {
      updateUserImage(imageInput);
      imageInput.value = '';
    });
  }
}
