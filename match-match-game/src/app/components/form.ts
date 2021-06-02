import BaseComponent from './baseComponent';
import Button from './shared/btn';
import ModalBox from './shared/modalBox';

import state from '../state';

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

  const regName = /^[^ ](?![0-9]+$)[^~!@#$%*()_—+=|:;"'`<>,.?/^]{1,30}$/;
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

  private btnSubmit: HTMLButtonElement | HTMLAnchorElement;

  private btnCancel: HTMLButtonElement | HTMLAnchorElement;

  private modalBox: ModalBox;

  private inputsName: NodeListOf<HTMLInputElement> | null;

  private inputEmail: HTMLInputElement | null;

  constructor(parentNode: ModalBox) {
    this.modalBox = parentNode;

    this.node = document.createElement('form');
    this.node.classList.add('form');

    const container = new BaseComponent<HTMLElement>(this.node, 'div', [
      'form__container',
    ]).node;

    container.innerHTML = `
      <div class="form__text-fields">
        <div class="form__input-container">
          <label class="form__label" for="firstname">First Name</label>
          <input class="form__input form__input-name" type="text" placeholder="Enter First Name" name="firstname" required>
        </div>
        <div class="form__input-container">
          <label class="form__label" for="lastname">Last Name</label>
          <input class="form__input form__input-name" type="text" placeholder="Enter Last Name" name="lastname" required>
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
      ['form__btn-submit', 'btn_dark'],
      'Add user',
    ).node;
    this.btnCancel = new Button(
      'button',
      ['form__btn-cancel', 'btn_dark'],
      'cancel',
    ).node;

    const btnContainer = new BaseComponent<HTMLElement>(this.node, 'div', [
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

  private checkFormValidity(): void {
    if (this.btnSubmit instanceof HTMLAnchorElement) return;
    if (this.node.querySelectorAll('.input_valid').length === 3) {
      this.btnSubmit.disabled = false;
    } else {
      this.btnSubmit.disabled = true;
    }
  }

  private addInputNameListener(): void {
    this.inputsName?.forEach(input =>
      input.addEventListener('input', () => {
        validate(input);
        this.checkFormValidity();
      }),
    );
  }

  private addInputEmailListener(): void {
    this.inputEmail?.addEventListener('input', () => {
      validate(this.inputEmail);
      this.checkFormValidity();
    });
  }

  private addCloseBtnListener(): void {
    this.btnCancel.addEventListener('click', () => {
      this.modalBox.close();
    });
  }

  private addAvatarListener(): void {
    const updateUserImage = (input: HTMLInputElement): void => {
      const imageContainer: HTMLElement | null = this.node.querySelector(
        '.form__uploaded-image',
      );
      if (!input.files) return;

      let imageURL;
      const reader = new FileReader();
      reader.onload = () => {
        imageURL = reader.result;
        if (typeof imageURL === 'string') state.user.imageSrc = imageURL;
        if (imageContainer)
          imageContainer.style.backgroundImage = `url('${imageURL}')`;
      };
      reader.readAsDataURL(input.files[0]);
    };

    const imageInput: HTMLInputElement | null = this.node.querySelector(
      '.form__avatar-upload',
    );
    if (!imageInput) return;

    imageInput.addEventListener('change', () => {
      updateUserImage(imageInput);
      imageInput.value = '';
    });
  }
}
