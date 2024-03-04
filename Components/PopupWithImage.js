import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
  }

  open({ data }) {
    const modalImage = document.querySelector(".modal__image");
    const modalDescription = document.querySelector(".modal__image-alt");
    modalImage.src = data._link;
    modalImage.alt = data._name;
    modalDescription.textContent = data._name;
    super.open;
  }
}
