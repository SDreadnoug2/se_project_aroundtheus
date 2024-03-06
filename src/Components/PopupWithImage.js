import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._modalImage = this._popupElement.querySelector(".modal__image");
    this._modalDescription =
      this._popupElement.querySelector(".modal__image-alt");
  }

  open(data) {
    super.open();
    this._modalImage.src = data.link;
    this._modalImage.alt = data.name;
    this._modalDescription.textContent = data.name;
    console.log(data);
  }
}
