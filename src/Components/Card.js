export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleTrashConfirm,
    handleLike
  ) {
    this._handleLike = handleLike;
    this._handleTrashConfirm = handleTrashConfirm;
    this._cardSelector = cardSelector;
    this._isLiked = data.isLiked;
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._data = data;
    this._handleImageClick = handleImageClick;
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".cards__like-button");
    this._cardImage = this._element.querySelector(".cards__image");
    this._deleteButton = this._element.querySelector(".cards__delete-button");
  }
  getId() {
    return this._id;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__card")
      .cloneNode(true);

    return cardElement;
  }

  _handleLikeIcon() {
    this._handleLike(this._id, this._isLiked);
    this._likeButton.classList.toggle("cards__like-button_active");
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      const cardInfo = { name: this._name, link: this._link };
      this._handleImageClick(cardInfo);
    });
    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleTrashConfirm(this._id, this._element);
    });
  }

  generateCard() {
    this._cardImage.src = this._link;
    this._element.querySelector(".cards__title").textContent = this._name;
    this._cardImage.alt = this._name;
    this._setEventListeners();

    return this._element;
  }
}
