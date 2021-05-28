import state from '../state';
import BaseComponent from './baseComponent';

const listContent = [
  { name: 'About Game', class: 'navigation__about', href: '/' },
  { name: 'Best Score', class: 'navigation__score', href: '/score' },
  {
    name: 'Game Settings',
    class: 'navigation__settings',
    href: '/settings',
  },
];

export default class Navigation extends BaseComponent {
  private links: HTMLAnchorElement[];

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'nav', ['navigation']);

    this.links = [];

    const list = document.createElement('ul');
    list.classList.add('navigation__list');

    for (let i = 0; i < listContent.length; i += 1) {
      const listItem = document.createElement('li');
      listItem.classList.add('navigation__item');

      const link = document.createElement('a');
      link.classList.add('navigation__link', listContent[i].class);
      if (state.router.currentRoute === listContent[i].href) {
        link.classList.add('navigation__link_active');
      }
      link.textContent = listContent[i].name;
      link.dataset.link = listContent[i].href;
      link.href = `#${listContent[i].href.slice(1)}`;

      this.links.push(link);
      listItem.append(link);
      list.append(listItem);
    }

    this.node.append(list);
  }

  render(): void {
    this.node.querySelectorAll('.navigation__link').forEach(link => {
      link.classList.remove('navigation__link_active');
      if (
        state.router.currentRoute === `/${link.getAttribute('href')?.slice(1)}`
      ) {
        link.classList.add('navigation__link_active');
      }
    });
  }
}
