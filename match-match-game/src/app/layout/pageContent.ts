import state from '../state';
import DataBase from '../db';

import BaseComponent from '../components/shared/baseComponent';
import { View } from '../app.models';

import AboutPage from './views/about';
import ScorePage from './views/score';
import SettingsPage from './views/settings';
import Game from './views/game';

export default class PageContent extends BaseComponent<HTMLElement> {
  public db: DataBase;

  private views: View[];

  constructor(parentNode: HTMLElement, dataBase: DataBase) {
    super(parentNode, 'div', ['content-wrapper']);

    this.db = dataBase;

    this.views = [
      new AboutPage(this),
      new ScorePage(this),
      new SettingsPage(this),
      new Game(this),
    ];

    this.addRoutes();
  }

  private addRoutes(): void {
    const { router } = state;
    router.routes = [];

    this.views.forEach(item =>
      router.routes.push({ path: item.path, view: item }),
    );
  }

  public render(): void {
    this.node.innerHTML = '';
    const { router } = state;
    router.routes.forEach(route => {
      if (route?.view.path === router.currentRoute) {
        route?.view.render();
      }
    });
  }
}
