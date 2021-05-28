import BasePage from './baseView';
import BaseComponent from '../../components/baseComponent';
import state from '../../state';
import Heading from '../../components/shared/heading';

interface ISettingsOption {
  description: string;
  value: number | string;
}

interface ISettingsType {
  cardsType: string | null;
  difficulty: string | null;
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
        value: 'dogs',
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
        value: 8,
      },
      {
        description: '6х6',
        value: 18,
      },
      {
        description: '6х8',
        value: 24,
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
  constructor(parentNode: HTMLElement) {
    super(parentNode);
    this.path = '/settings';
  }

  init(): void {
    settings.forEach(item => {
      const heading = new Heading(item.heading).node;
      this.node.append(heading);

      const form = new BaseComponent(this.node, 'form', ['settings__form']);
      const select = new BaseComponent(form.node, 'select', [
        'settings__select',
      ]);
      select.node.dataset.settingName = item.name;
      addListener(select.node);

      const defaultVal = new BaseComponent(select.node, 'option', [
        'options',
        'select__default',
      ]);

      defaultVal.node.setAttribute('value', 'default');
      defaultVal.node.textContent = item.defaultVal;

      item.options.forEach((option: ISettingsOption) => {
        const optionNode = new BaseComponent(select.node, 'option', [
          'options',
        ]);
        optionNode.node.setAttribute('value', `${option.value}`);
        optionNode.node.textContent = option.description;
      });
    });

    this.parentNode.append(this.node);
  }
}
