import BaseComponent from './baseComponent';

export default class Navigation extends BaseComponent {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'nav', ['navigation']);

    this.init();
    this.render();
  }

  init(): void {
    const list = document.createElement('ul');
    const listContent = [
      { name: 'About Game', class: 'navigation__about', href: '/' },
      { name: 'Best Score', class: 'navigation__score', href: '/score' },
      {
        name: 'Game Settings',
        class: 'navigation__settings',
        href: '/settings',
      },
    ];

    for (let i = 0; i < listContent.length; i += 1) {
      const listItem = document.createElement('li');

      const link = document.createElement('a');
      link.classList.add('navigation__link', listContent[i].class);
      link.textContent = listContent[i].name;
      link.href = listContent[i].href;

      listItem.append(link);
      list.append(listItem);
    }

    this.node.append(list);
  }

  render(): void {
    console.log('navigation', this.node);
  }
}
