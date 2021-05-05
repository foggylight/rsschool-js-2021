class Popup {
  constructor(initObj) {
    this.openBtn = initObj.openBtnElem;
    this.submitBtn = initObj.submitBtnElem;
    this.popup = initObj.popupElem;
    this.cover = initObj.coverElem;
    this.form = initObj.formElem;

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
    if (!this.submitBtn.classList.contains('invalid')) {
      this.submitBtn.addEventListener('click', () => this.toggle());
    }
  }
}

export class FormPopup extends Popup {
  validate() {
    console.log('change');
    if (this.form.elements.email.validity.valid &&
    this.form.elements.name.validity.valid &&
    this.form.elements.feedback.validity.valid) {
      this.submitBtn.classList.remove('invalid');
    } else {
      this.submitBtn.classList.add('invalid');
    }
  }

  showMessage(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { name, email, feedback } = Object.fromEntries(formData);
    const massage = `Feedback has been sent! \n Name: ${name}, \n Email: ${email} \n Your massage: ${feedback}`;
    alert(massage);
    
    this.form.reset();
    this.toggle();
    this.validate();
  }

  addEventsListeners() {
    super.addEventsListeners();
    this.form.elements.name.addEventListener('input', () => this.validate());
    this.form.elements.email.addEventListener('input', () => this.validate());
    this.form.elements.feedback.addEventListener('input', () => this.validate());

    this.form.addEventListener('submit', (e) => this.showMessage(e));
  }
}
