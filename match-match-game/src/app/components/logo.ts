import BaseComponent from './baseComponent';

export default class Logo extends BaseComponent {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'a', ['logo']);
    this.node.setAttribute('href', '/');
  }

  init(): void {
    const spanTop = document.createElement('span');
    spanTop.textContent = 'match';

    const spanBottom = document.createElement('span');
    spanBottom.textContent = 'match';

    const topBlock = document.createElement('div');
    topBlock.classList.add('logo__top-block');
    topBlock.append(spanTop);

    const bottomBlock = document.createElement('div');
    bottomBlock.classList.add('logo__bottom-block');
    bottomBlock.append(spanBottom);

    this.node.append(topBlock);
    this.node.append(bottomBlock);
  }
}
