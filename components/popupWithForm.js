import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, onSubmit) {
    super(popupSelector);

    this._form = this._popup.querySelector(".popup__form");
    this._onSubmit = onSubmit;
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll(".popup__input");

    const inputValues = { id: uuidv4() };
    this._inputList.forEach((input) => {
      if (input.name === "date") {
        const date = new Date(input.value);
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

        inputValues[input.name] = date;
      } else {
        inputValues[input.name] = input.value;
      }
    });

    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._onSubmit(inputValues);
    });
  }
}
