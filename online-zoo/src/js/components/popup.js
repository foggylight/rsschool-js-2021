export class Popup {
  constructor(initObj) {
    this.openBtn = initObj.btnElem;
    this.popup = initObj.popupElem;
    this.cover = initObj.coverElem;

    this.addEventsListeners();
  }

  toggle() {
    document.body.classList.toggle('notScrollable');
    this.popup.classList.toggle('hidden');
    this.cover.classList.toggle('hidden');
  }

  addEventsListeners() {
    this.openBtn.addEventListener('click', () => this.toggle());
    this.cover.addEventListener('click', () => this.toggle());
  }
}
