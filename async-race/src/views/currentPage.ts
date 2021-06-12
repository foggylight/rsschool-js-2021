import { IPage } from '../models';
import Component from '../components/component';
import state from '../state';
import Garage from './garage';
import Winners from './winners';

export default class CurrentPage extends Component {
  views: IPage[];

  page: IPage | null;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'main', ['content-wrapper']);
    this.views = [new Garage(this.node), new Winners(this.node)];
    this.page = null;
  }

  initPage(): void {
    this.views.forEach(view => {
      if (view.path === state.currentRoute) {
        this.page = view;
        this.page.render();
      }
    });
  }

  render(): void {
    this.page?.delete();
    this.initPage();
  }
}
