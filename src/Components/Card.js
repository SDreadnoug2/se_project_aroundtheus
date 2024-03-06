export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._cardSelector = cardSelector;
    this._name = data.name;
    this._link = data.link;
    this._handleImageClick = handleImageClick;
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".cards__like-button");
    this._cardImage = this._element.querySelector(".cards__image");
    this._deleteButton = this._element.querySelector(".cards__delete-button");
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__card")
      .cloneNode(true);

    return cardElement;
  }

  _handleLikeIcon() {
    this._likeButton.classList.toggle("cards__like-button_active");
  }

  _handleTrashIcon() {
    this._element.remove();
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick;
    });
    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleTrashIcon();
    });
  }

  generateCard() {
    console.log(this._name);
    this._cardImage.src = this._link;
    this._element.querySelector(".cards__title").textContent = this._name;
    this._cardImage.alt = this._name;
    this._setEventListeners();

    return this._element;
  }
}
