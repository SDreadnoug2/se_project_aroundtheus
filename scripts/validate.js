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
  inputElement.classList.add("modal__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("modal__input-error_active");
};

const hideInputError = (formElement, inputElement) => {
  //find the error message element
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // rest unchanged
  inputElement.classList.remove("modal__input_type_error");
  errorElement.classList.remove("modal__input-error_active");
  errorElement.textContent = "";
};

//adding handlers to all form fields
// instead of manually adding with formInput.add... create function setEventListeners()
// takes a form element as a parameter, and adds necessary handlers to its fields.

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".modal__input"));
  const submitButton = formElement.querySelector(".modal__button");
  const hasInvalidInput = (inputLists) => {
    return inputLists.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  const toggleButtonState = (inputLists, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add("modal__button_disabled");
      buttonElement.setAttribute("disabled", true);
    } else {
      buttonElement.classList.remove("modal__button_disabled");
      buttonElement.removeAttribute("disabled");
    }
  };
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

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".modal__form"));
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

enableValidation({
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
});
