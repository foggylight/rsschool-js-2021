import BasePage from './baseView';
import BaseComponent from '../../components/baseComponent';
import Heading from '../../components/shared/heading';

import state from '../../state';
import { Page } from '../../app.api';

interface ISettingsOption {
  description: string;
  value: number | string;
}

interface ISettingsType {
  cardsType: string;
  difficulty: string;
}

const settings = [
  {
    heading: 'Game cards',
    name: 'cardsType',
    defaultVal: 'select game cards type',
    options: [
      {
        description: 'dogs',
        value: 'dogs',
      },
      {
        description: 'cats',
        value: 'cats',
      },
    ],
  },
  {
    heading: 'Difficulty',
    name: 'difficulty',
    defaultVal: 'select game type',
    options: [
      {
        description: '4х4',
        value: 16,
      },
      {
        description: '6х6',
        value: 36,
      },
    ],
  },
];

const addListener = (field: HTMLElement): void => {
  const selectHandler = ({ target }: Event) => {
    const select = target as HTMLSelectElement;
    const { settingName } = select.dataset;
    if (!settingName) return;
    state.settings[settingName as keyof ISettingsType] =
      `${select.value}` === 'default' ? null : `${select.value}`;
  };
  field.addEventListener('change', selectHandler);
};

export default class SettingsPage extends BasePage {
  constructor(parentNode: Page) {
    super(parentNode);
    this.path = '/settings';

    settings.forEach(item => {
      const heading = new Heading(item.heading).node;
      this.node.append(heading);

      const form = new BaseComponent<HTMLFormElement>(this.node, 'form', [
        'settings__form',
      ]);
      const select = new BaseComponent<HTMLSelectElement>(form.node, 'select', [
        'settings__select',
      ]);
      select.node.dataset.settingName = item.name;
      addListener(select.node);

      const defaultVal = new BaseComponent<HTMLOptionElement>(
        select.node,
        'option',
        ['options', 'select__default'],
      );

      defaultVal.node.setAttribute('value', 'default');
      defaultVal.node.textContent = item.defaultVal;

      item.options.forEach((option: ISettingsOption) => {
        const optionNode = new BaseComponent<HTMLOptionElement>(
          select.node,
          'option',
          ['options'],
        );
        optionNode.node.setAttribute('value', `${option.value}`);
        optionNode.node.textContent = option.description;
      });
    });
  }

  public render(): void {
    this.parent.node.append(this.node);
  }
}
