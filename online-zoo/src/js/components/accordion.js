export class Accordion {
  constructor(accordionNode) {
    this.accordion = accordionNode;
    this.spoilers = this.accordion.querySelectorAll('.accordion__item');
    this.toggleSpoiler();
  }

  toggleSpoiler() {
    this.spoilers.forEach((spoilerElement) => {
      const spoilerBody = spoilerElement.querySelector('.accordion__text-block');
      const spoilerHeader = spoilerElement.querySelector('.accordion__title-block');

      spoilerHeader.addEventListener('click', () => {
        spoilerElement.classList.toggle('accordion__item_active');
        spoilerBody.style.maxHeight = spoilerBody.style.maxHeight ? null : spoilerBody.scrollHeight + "px";
      });
    });
  }
}
