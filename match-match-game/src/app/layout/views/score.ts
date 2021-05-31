import BasePage from './baseView';
import BaseComponent from '../../components/baseComponent';

import state from '../../state';
import Heading from '../../components/shared/heading';
import { Page } from '../../app.api';
import Avatar from '../../components/shared/userAvatar';

export default class ScorePage extends BasePage {
  constructor(parentNode: Page) {
    super(parentNode);
    this.path = '/score';

    this.node.classList.add('content-scrollable');
  }

  async init(): Promise<void> {
    this.node.innerHTML = '';
    const heading = new Heading('Best players').node;
    this.node.append(heading);

    const users = await this.parent.db
      .init('foggylight')
      .then(() => this.parent.db.readFiltered());
    state.bestPlayers = users;

    if (state.bestPlayers.length === 0) {
      const text = new BaseComponent(this.node, 'p', ['score-page__text']);
      text.node.textContent = 'No one has played yet!';
    }

    state.bestPlayers.sort((a, b) => b.score - a.score);
    state.bestPlayers = state.bestPlayers.slice(0, 10);
    state.bestPlayers.forEach(player => {
      const block = new BaseComponent(this.node, 'div', ['player__block']);
      const playerImage = new Avatar(player.avatar).node;
      block.node.append(playerImage);
      const nameBlock = new BaseComponent(block.node, 'div', ['name-block']);
      const name = new BaseComponent(nameBlock.node, 'p', ['player__name']);
      name.node.textContent = player.name;
      const email = new BaseComponent(nameBlock.node, 'p', ['player__email']);
      email.node.textContent = player.email;
      const score = new BaseComponent(block.node, 'p', ['player__score']);
      score.node.textContent = 'Score: ';
      const scoreVal = new BaseComponent(score.node, 'span', [
        'player__score-value',
      ]);
      scoreVal.node.textContent = `${player.score}`;
    });
  }
}
