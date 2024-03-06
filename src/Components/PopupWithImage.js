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

  setEventListeners() {
    super.setEventListeners();
    this._popupElement
      .querySelector(".modal__container-expanded")
      .addEventListener("click", (event) => {
        event.stopPropagation();
        console.log("clicked");
      });
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
