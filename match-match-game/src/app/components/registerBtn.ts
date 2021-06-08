import Form from './form';
import Button from './shared/button';
import Heading from './shared/heading';
import ModalBox from './shared/modalBox';

import state from '../state';
import { ButtonType, Component } from '../app.models';

export default class RegisterButton extends Button {
  private parentComponent: Component;

  private parentNode: HTMLElement;

  private modal: ModalBox | null;

  constructor(parentComponent: Component) {
    super(
      ButtonType.button,
      ['user-block__btn-register'],
      'register new player',
    );
    this.parentComponent = parentComponent;
    this.parentNode = parentComponent.node;

    this.modal = null;

    this.initModalForm();
    this.addBtnListener();
  }

  private initModalForm(): void {
    const content = [];
    const heading = new Heading('Register new Player').node;
    content.push(heading);

    this.modal = new ModalBox(this.parentNode);

    const form = new Form(this.modal).node;
    content.push(form);

    this.modal.addContent(content);

    this.parentNode.append();

    this.addFormListener();
  }

  private addBtnListener(): void {
    const btnHandler = () => {
      this.modal?.open();
    };
    this.node.addEventListener('click', btnHandler);
  }

  private addFormListener(): void {
    this.parentNode
      .querySelector('.form')
      ?.addEventListener('submit', (e: Event) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        state.user.name = `${formData.get('firstname')} ${formData.get(
          'lastname',
        )}`;
        state.user.email = `${formData.get('email')}`;

        this.modal?.close();
        this.parentComponent.render();
      });
  }
}
