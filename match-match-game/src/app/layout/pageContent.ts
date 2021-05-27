import { StateObj } from '../app.api';
import state from '../state';

import BaseComponent from '../components/baseComponent';

import AboutPage from './views/about';
import ScorePage from './views/score';
import SettingsPage from './views/settings';

export default class PageContent extends BaseComponent {
  content: BaseComponent | null;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['content-wrapper']);
    this.content = null;

    this.render(state);
  }

  addRoutes(): void {
    const about = new AboutPage(this.node);
    const score = new ScorePage(this.node);
    const settings = new SettingsPage(this.node);
    state.routes.push({ path: about.path, view: about.node });
    state.routes.push({ path: score.path, view: score.node });
    state.routes.push({ path: settings.path, view: settings.node });
    about.init();
    console.log('state', state);
  }

  init(): void {
    this.addRoutes();
  }

  render(options: StateObj): void {
    console.log('content', this.content);
  }
}
