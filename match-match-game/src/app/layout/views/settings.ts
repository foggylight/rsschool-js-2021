import BasePage from './baseView';
import BaseComponent from '../../components/baseComponent';

const settings = [
  {
    heading: 'Game cards',
    description: 'select game cards type',
    options: ['dogs', 'cats', 'furby'],
  },
  {
    heading: 'Difficulty',
    description: 'select game type',
    options: ['4х4', '6х6'],
  },
];

export default class SettingsPage extends BasePage {
  constructor(parentNode: HTMLElement) {
    super(parentNode);
    this.path = '/settings';
  }

  init(): void {
    settings.forEach(item => {
      const heading = new BaseComponent(this.node, 'h2', ['heading']);
      heading.node.textContent = item.heading;

      const form = new BaseComponent(this.node, 'form', ['settings__form']);
      const select = new BaseComponent(form.node, 'select', [
        'settings__select',
      ]);

      const defaultVal = new BaseComponent(select.node, 'option', [
        'options',
        'select__default',
      ]);
      defaultVal.node.setAttribute('value', item.description);
      defaultVal.node.textContent = item.description;

      item.options.forEach(option => {
        const optionNode = new BaseComponent(select.node, 'option', [
          'options',
        ]);
        optionNode.node.setAttribute('value', option);
        optionNode.node.textContent = option;
      });
    });

    this.parentNode.append(this.node);
  }
}
