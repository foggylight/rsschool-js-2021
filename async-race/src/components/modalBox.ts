import Component from './component';

export default class ModalBox extends Component {
  content: HTMLElement;

  constructor(parentNode: HTMLElement, winnerName: string, time: number) {
    super(parentNode, 'div', ['modal-box__cover']);
    this.content = new Component(this.node, 'div', ['modal-box__content']).node;
    if (time === 0) {
      this.content.innerHTML = `
      <p>All cars are broken, there is no winner in this race :(</p>
    `;
    } else {
      this.content.innerHTML = `
      <p><span class="modal-box__name">${winnerName} </span>
      went first in <span class="modal-box__time">${time}</span> sec</p>
    `;
    }
    this.addListener();
  }

  close(): void {
    this.node.classList.add('hidden');
    this.content.classList.add('hidden');
    this.delete();
  }

  private addListener(): void {
    this.node.addEventListener('click', () => this.close());
  }
}
