import state from '../state';
import Component from './component';

export default class Header extends Component {
  links: HTMLElement[];

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'header', ['navigation']);
    this.links = [];

    const list = new Component(this.node, 'ul', ['navigation__list']).node;
    const pagesList = [
      { name: 'Garage', path: '/' },
      { name: 'Winners', path: '/winners' },
    ];

    pagesList.forEach(page => {
      const listItem = new Component(list, 'li', ['navigation__list-item']).node;
      const link = new Component(listItem, 'a', ['navigation__link', 'btn', 'btn-nav'], page.name)
        .node;
      if (state.currentRoute === page.path) {
        link.classList.add('navigation__link_active');
      }
      link.setAttribute('href', `#${page.path.slice(1)}`);
      this.links.push(link);
    });
  }

  render(): void {
    this.links.forEach(link => {
      link.classList.remove('navigation__link_active');
      if (state.currentRoute === `/${link.getAttribute('href')?.slice(1)}`) {
        link.classList.add('navigation__link_active');
      }
    });
  }
}
