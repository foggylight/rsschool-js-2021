import state from '../state';
import BaseComponent from './baseComponent';

const navContentList = [
  { name: 'About Game', class: 'navigation__about', href: '/' },
  { name: 'Best Score', class: 'navigation__score', href: '/score' },
  {
    name: 'Game Settings',
    class: 'navigation__settings',
    href: '/settings',
  },
];

export default class Navigation extends BaseComponent<HTMLElement> {
  private links: HTMLAnchorElement[];

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'nav', ['navigation']);

    this.links = [];

    const list = new BaseComponent<HTMLElement>(this.node, 'ul', [
      'navigation__list',
    ]).node;

    for (let i = 0; i < navContentList.length; i += 1) {
      const listItem = new BaseComponent<HTMLElement>(list, 'li', [
        'navigation__item',
      ]).node;

      const link = new BaseComponent<HTMLAnchorElement>(listItem, 'a', [
        'navigation__link',
        navContentList[i].class,
      ]).node;
      if (state.router.currentRoute === navContentList[i].href) {
        link.classList.add('navigation__link_active');
      }
      link.textContent = navContentList[i].name;
      link.dataset.link = navContentList[i].href;
      if (link instanceof HTMLAnchorElement)
        link.href = `#${navContentList[i].href.slice(1)}`;

      if (link instanceof HTMLAnchorElement) this.links.push(link);
    }
  }

  render(): void {
    this.links.forEach(link => {
      link.classList.remove('navigation__link_active');
      if (
        state.router.currentRoute === `/${link.getAttribute('href')?.slice(1)}`
      ) {
        link.classList.add('navigation__link_active');
      }
    });
  }
}
