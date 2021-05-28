import BasePage from './baseView';
import BaseComponent from '../../components/baseComponent';

import state from '../../state';
import Heading from '../../components/shared/heading';

export default class ScorePage extends BasePage {
  constructor(parentNode: HTMLElement) {
    super(parentNode);
    this.path = '/score';
  }

  init(): void {
    const heading = new Heading('Best players').node;
    this.node.append(heading);

    state.bestPlayers.forEach(player => {
      if (!player) {
        return;
      }
      const block = new BaseComponent(this.node, 'div', ['player__block']);
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

      this.parentNode.append(this.node);
    });
  }
}
