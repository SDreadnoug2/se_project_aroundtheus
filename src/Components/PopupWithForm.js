import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._submitFunction = handleFormSubmit;
    this._modalButton = this._popupElement.querySelector(".modal__button");
    this._modalButtonText = this._modalButton.textContent;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  _getInputValues() {
    const inputValues = {};
    this._popupForm.querySelectorAll(".modal__input").forEach((input) => {
      inputValues[input.name] = input.value;
      //finding key inside input values object based on the name property,
      // of the input element.
      // Then setting the value of that key to the value of the input element.
      // e.g. inputValues[location] = "Jamaica"
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    console.log();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitFunction(this._getInputValues());
    });
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._modalButton.textContent = "Saving...";
    } else {
      this._modalButton.textContent = "Saved!";
      setTimeout(() => {
        this._modalButton.textContent = this._modalButtonText;
      }, 500);
    }
  }
}
