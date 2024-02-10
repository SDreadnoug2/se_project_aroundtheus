export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._cardSelector = cardSelector;
    this._name = data.name;
    this._link = data.link;
    this._handleImageClick = handleImageClick;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__card")
      .cloneNode(true);

    return cardElement;
  }

  _handleLikeIcon() {
    this._element
      .querySelector(".cards__like-button")
      .classList.toggle("cards__like-button_active");
  }

  _handleTrashIcon() {
    this._element.remove();
  }

  _setEventListeners() {
    this._element
      .querySelector(".cards__image")
      .addEventListener("click", () => {
        this._handleImageClick(this);
      });
    this._element
      .querySelector(".cards__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });
    this._element
      .querySelector(".cards__delete-button")
      .addEventListener("click", () => {
        this._handleTrashIcon();
      });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".cards__image").src = this._link;
    this._element.querySelector(".cards__title").textContent = this._name;
    this._setEventListeners();

    return this._element;
  }
}
