import BaseComponent from './baseComponent';

export default class Button extends BaseComponent {
  constructor(
    parentNode: HTMLElement,
    type: 'button' | 'submit',
    className: string,
    content: string,
  ) {
    super(parentNode, 'button', ['btn']);
    this.node.setAttribute('type', type);
    this.node.classList.add(className);
    this.node.textContent = content;
  }
}
