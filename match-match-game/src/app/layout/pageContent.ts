import state from '../state';
import { DataBase } from '../db';

import BaseComponent from '../components/baseComponent';
import { View } from '../app.api';

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

  addRoutes(): void {
    const { router } = state;
    router.routes = [];

    this.views.forEach(item =>
      router.routes.push({ path: item.path, view: item }),
    );
  }

  render(): void {
    this.node.innerHTML = '';
    const { router } = state;
    router.routes.forEach(route => {
      if (route?.view.path === router.currentRoute) {
        if (
          router.currentRoute === '/game' ||
          router.currentRoute === '/score'
        ) {
          route?.view.init();
        }
        this.node.append(route.view.node);
      }
    });
  }
}
