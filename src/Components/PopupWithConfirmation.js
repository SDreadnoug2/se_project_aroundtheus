import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._button = this._popupElement.querySelector(".modal__button");
  }

  handleConfirm(yes) {
    this._handleSubmit = yes;
  }
  setEventListeners() {
    super.setEventListeners();
    this._button.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._handleSubmit();
    });
  }
}
