import BasePage from './baseView';
import BaseComponent from '../../components/shared/baseComponent';

import Heading from '../../components/shared/heading';
import Avatar from '../../components/shared/avatar';

import state from '../../state';
import { Page } from '../../app.models';
import DBName from '../../constants';

export default class ScorePage extends BasePage {
  constructor(parentNode: Page) {
    super(parentNode);
    this.path = '/score';

    this.node.classList.add('content-scrollable');
  }

  public async render(): Promise<void> {
    this.node.innerHTML = '';
    const heading = new Heading('Best players').node;
    this.node.append(heading);

    const users = await this.parent.db
      .init(DBName)
      .then(() => this.parent.db.getData());
    state.bestPlayers = users;

    if (state.bestPlayers.length === 0) {
      const text = new BaseComponent<HTMLElement>(this.node, 'p', [
        'score-page__text',
      ]);
      text.node.textContent = 'No one has played yet!';
    }

    state.bestPlayers.sort((a, b) => b.score - a.score);
    state.bestPlayers = state.bestPlayers.slice(0, 10);
    state.bestPlayers.forEach(player => {
      const block = new BaseComponent<HTMLElement>(this.node, 'div', [
        'player__block',
      ]);
      const playerImage = new Avatar(player.avatar).node;
      block.node.append(playerImage);
      const nameBlock = new BaseComponent<HTMLElement>(block.node, 'div', [
        'name-block',
      ]);
      const name = new BaseComponent<HTMLElement>(nameBlock.node, 'p', [
        'player__name',
      ]);
      name.node.textContent = player.name;
      const email = new BaseComponent<HTMLElement>(nameBlock.node, 'p', [
        'player__email',
      ]);
      email.node.textContent = player.email;
      const score = new BaseComponent<HTMLElement>(block.node, 'p', [
        'player__score',
      ]);
      score.node.textContent = 'Score: ';
      const scoreVal = new BaseComponent<HTMLElement>(score.node, 'span', [
        'player__score-value',
      ]);
      scoreVal.node.textContent = `${player.score}`;
    });

    this.parent.node.append(this.node);
  }
}
