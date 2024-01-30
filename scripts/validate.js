const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error_active",
};

const checkInputValidity = (formElement, inputElement, options) => {
  if (!inputElement.validity.valid) {
    // The parameter of showInputError() is now a form,
    // which contains a field to be checked
    // inputElement.validationMessage is the errorMessage
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      options
    );
  } else {
    // The same for hideInputError(), Its parameter is now a form,
    // which contains a field to be checked
    hideInputError(formElement, inputElement, options);
  }
};

const showInputError = (formElement, inputElement, errorMessage, options) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // rest is unchanged
  inputElement.classList.add(options.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(options.errorClass);
};

const hideInputError = (formElement, inputElement, options) => {
  //find the error message element
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // rest unchanged
  inputElement.classList.remove(options.inputErrorClass);
  errorElement.classList.remove(options.errorClass);
  errorElement.textContent = "";
};

//adding handlers to all form fields
// instead of manually adding with formInput.add... create function setEventListeners()
// takes a form element as a parameter, and adds necessary handlers to its fields.
function hasInvalidInput(inputLists) {
  return inputLists.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}
function toggleButtonState(inputLists, buttonElement, options) {
  if (hasInvalidInput(inputLists)) {
    buttonElement.classList.add(options.inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(options.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
}
const setEventListeners = (formElement, options) => {
  const inputList = [...formElement.querySelectorAll(options.inputSelector)];
  const submitButton = formElement.querySelector(options.submitButtonSelector);

  toggleButtonState(inputList, submitButton, options);
  //iterate over the array
  inputList.forEach((inputElement) => {
    // add input event handler to each field
    inputElement.addEventListener("input", () => {
      // call checkInputValidity() inside the call back and pass form to it.
      checkInputValidity(formElement, inputElement, options);
      toggleButtonState(inputList, submitButton, options);
    });
  });
};

// enableValidation() finds forms and iterate over them.

const enableValidation = (options) => {
  const formList = [...document.querySelectorAll(options.formSelector)];
  // iterate over the array
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    //call seteventlisteners for each form
    setEventListeners(formElement, options);
  });
};

// enabling validation by calling enableValidation()
// pass all the settings on call

enableValidation(validationConfig);
