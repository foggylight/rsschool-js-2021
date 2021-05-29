import state from '../state';
import Form from './form';

import Button from './shared/btn';
import Heading from './shared/heading';
import ModalBox from './shared/modalBox';

export default class RegisterButton extends Button {
  private parent: HTMLElement;

  private modal: ModalBox | null;

  constructor(parentNode: HTMLElement) {
    super('button', ['user-block__btn-register'], 'register new player');
    this.parent = parentNode;

    this.modal = null;

    this.initModalForm();
    this.addListener();
  }

  addToPage(): void {
    super.addToPage(this.parent);
  }

  initModalForm(): void {
    const content = [];
    const heading = new Heading('Register new Player').node;
    content.push(heading);

    this.modal = new ModalBox(this.parent);

    const form = new Form(this.modal).node;
    content.push(form);

    this.modal.addContent(content);

    this.parent.append();
  }

  addListener(): void {
    const btnHandler = () => {
      this.modal?.open();
    };
    this.node.addEventListener('click', btnHandler);
  }
}
