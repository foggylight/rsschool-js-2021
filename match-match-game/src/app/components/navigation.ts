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

const addListener = (link: HTMLAnchorElement): void => {
  const linkHandler = (e: Event) => {
    const a = e.target as HTMLAnchorElement;

    if (!a.dataset.link) return;
    state.router.currentRoute = a.dataset.link;
  };
  link.addEventListener('click', linkHandler);
};

export default class Navigation extends BaseComponent {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'nav', ['navigation']);
  }

  init(): void {
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
      addListener(link);

      listItem.append(link);
      list.append(listItem);
    }

    this.node.append(list);
  }

  render(): void {
    this.init();
  }
}
