import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._modalImage = this._popupElement.querySelector(".modal__image");
    this._modalDescription =
      this._popupElement.querySelector(".modal__image-alt");
  }

  open({ name, link }) {
    super.open();
    this._modalImage.src = link;
    this._modalImage.alt = name;
    this._modalDescription.textContent = name;
    console.log("open");
  }
}
/*
function handleImageClick(cardData) {
  const modalImage = document.querySelector(".modal__image");
  const modalDescription = document.querySelector(".modal__image-alt");
  modalImage.src = cardData._link;
  modalImage.alt = cardData._name;
  modalDescription.textContent = cardData._name;
  cardWindow.open();
}
*/
