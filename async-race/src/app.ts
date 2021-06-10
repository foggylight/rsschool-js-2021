import Component from './components/component';
import Header from './components/header';
import './scss/app.scss';
import state from './state';
import CurrentPage from './views/currentPage';

export default class App extends Component {
  header: Header;

  page: CurrentPage;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['app']);
    state.currentRoute = `/${window.location.hash.slice(1)}`;

    this.header = new Header(this.node);
    this.page = new CurrentPage(this.node);
    this.enableRouteChange();
  }

  private enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      state.currentRoute = `/${hash}`;
      this.render();
    });
  }

  render(): void {
    this.header.render();
    this.page.render();
  }
}
