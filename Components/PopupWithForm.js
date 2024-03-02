import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    this._popupSelector = popupSelector;
    this._submitfunction = handleFormSubmit;
  }

  _getInputValues() {
    // collects data from input fields and returns it as an object
    // passed to submission handler as argument
  }

  setEventListeners() {
    // add a submit event listener to the form and call setEventListeners
    // of parent class.
  }
}
