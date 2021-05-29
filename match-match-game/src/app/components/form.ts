import state from '../state';
import BaseComponent from './baseComponent';
import Button from './shared/btn';
import ModalBox from './shared/modalBox';

export default class Form {
  public node: HTMLFormElement;

  private btnSubmit: HTMLButtonElement;

  private btnCancel: HTMLButtonElement;

  private modalBox: ModalBox;

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
          <label for="first-name">First Name</label>
          <input class="form__input" type="text" placeholder="Enter First Name" name="first-name" required>
        </div>
        <div class="form__input-container">
          <label for="last-name">Last Name</label>
          <input class="form__input" type="text" placeholder="Enter Last Name" name="last-name" required>
        </div>
        <div class="form__input-container">
          <label for="email">E-mail</label>
          <input class="form__input" type="email" placeholder="Enter E-mail" name="email" required>
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

    const btnContainer = new BaseComponent(this.node, 'div', [
      'form__btn-container',
    ]);

    btnContainer.node.append(this.btnSubmit);
    btnContainer.node.append(this.btnCancel);

    this.addAvatarListener();
    this.addCloseBtnListener();
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
      console.log(state.user);
      console.log(imageURL);
      if (imageContainer)
        imageContainer.style.backgroundImage = `url('${imageURL}')`;
    };

    const imageInput: HTMLInputElement | null = this.node.querySelector(
      '.form__avatar-upload',
    );
    if (!imageInput) return;
    console.log(imageInput);

    imageInput.addEventListener('change', () => updateUserImage(imageInput));
  }
}
