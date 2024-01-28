const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error_active",
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // The parameter of showInputError() is now a form,
    // which contains a field to be checked
    // inputElement.validationMessage is the errorMessage
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // The same for hideInputError(), Its parameter is now a form,
    // which contains a field to be checked
    hideInputError(formElement, inputElement);
  }
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // rest is unchanged
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

const hideInputError = (formElement, inputElement) => {
  //find the error message element
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // rest unchanged
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
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
function toggleButtonState(inputLists, buttonElement) {
  if (hasInvalidInput(inputLists)) {
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
}
const setEventListeners = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const submitButton = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  toggleButtonState(inputList, submitButton);
  //iterate over the array
  inputList.forEach((inputElement) => {
    // add input event handler to each field
    inputElement.addEventListener("input", () => {
      // call checkInputValidity() inside the call back and pass form to it.
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, submitButton);
    });
  });
};

// enableValidation() finds forms and iterate over them.

const enableValidation = (options) => {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  // iterate over the array
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    //call seteventlisteners for each form
    setEventListeners(formElement);
  });
};

// enabling validation by calling enableValidation()
// pass all the settings on call

enableValidation(validationConfig);
