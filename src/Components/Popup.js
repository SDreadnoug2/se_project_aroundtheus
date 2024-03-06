export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._popupElement.querySelector(".modal__close");
    this._escapeEventListener = (evt) => {
      if (evt.key === "Escape") {
        this.close();
      }
    };
  }

  open() {
    document.addEventListener("keydown", this._handleEscClose);
    this._popupElement.classList.add("modal_opened");
    window.addEventListener("keydown", this._escapeEventListener);
  }

  close() {
    document.removeEventListener("keydown", this._handleEscClose);
    this._popupElement.classList.remove("modal_opened");
    window.removeEventListener("keydown", this._escapeEventListener);
  }

  setEventListeners() {
    this._popupElement
      .querySelector(".modal__close")
      .addEventListener("click", () => {
        this.close();
      });
    this._popupElement
      .querySelector(".modal__container")
      .addEventListener("click", (event) => {
        event.stopPropagation();
        console.log("clicked");
        this.open();
      });
    this._popupElement.addEventListener("click", (evt) => {
      console.log("clicked");
      this.close();
    });
  }
}
