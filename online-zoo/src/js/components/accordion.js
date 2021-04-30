export class Accordion {
  constructor(accordionNode) {
    this.accordion = accordionNode;
    this.spoilers = null;
    this.setSpoilers();
  }

  setSpoilers() {
    this.spoilers = this.accordion.querySelectorAll('.accordion__item');
  }

  toggleSpoiler() {
    this.spoilers.forEach((spoilerElement) => {
      const spoilerBody = spoilerElement.querySelector('.accordion__text-block');
      const spoilerHeader = spoilerElement.querySelector('.accordion__title-block');

      spoilerHeader.addEventListener('click', ({ target }) => {
        target.parentNode.classList.toggle('accordion__item_active');
        if (spoilerBody.style.maxHeight) {
          spoilerBody.style.maxHeight = null;
        } else {
          spoilerBody.style.maxHeight = spoilerBody.scrollHeight + "px";
        }
      });
    })
  }
}
