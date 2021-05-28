import state from '../state';

import BaseComponent from '../components/baseComponent';

import AboutPage from './views/about';
import ScorePage from './views/score';
import SettingsPage from './views/settings';

export default class PageContent extends BaseComponent {
  // content: null;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['content-wrapper']);

    this.addRoutes();
  }

  addRoutes(): void {
    const about = new AboutPage(this.node);
    const score = new ScorePage(this.node);
    const settings = new SettingsPage(this.node);

    const { router } = state;
    router.routes = [];
    router.routes.push({ path: about.path, view: about });
    router.routes.push({ path: score.path, view: score });
    router.routes.push({ path: settings.path, view: settings });
  }

  render(): void {
    this.node.innerHTML = '';
    const { router } = state;
    router.routes.forEach(route => {
      if (route?.view.path === router.currentRoute) {
        this.node.append(route.view.node);
      }
    });
  }
}
