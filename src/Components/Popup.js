export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);

    this._escapeEventListener = (evt) => {
      if (evt.key === "Escape") {
        this.close();
      }
    };
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    window.addEventListener("keydown", this._escapeEventListener);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    window.removeEventListener("keydown", this._escapeEventListener);
  }

  setEventListeners() {
    this._popupElement.addEventListener("mousedown", (evt) => {
      evt.stopPropagation();
      if (
        evt.target.classList.contains("modal_opened") ||
        evt.target.classList.contains("modal__close")
      ) {
        this.close();
      }
    });
  }
}
