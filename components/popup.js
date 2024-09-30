export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add("popup_visible");
  }

  close() {
    this._popup.classList.remove("popup_visible");
  }

  _handleEscapeClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("keydown", this._handleEscapeClose);

    this._popup.addEventListener("click", (evt) => {
      if (evt.currentTarget === evt.target) {
        this.close();
      }
    });

    const closeBtn = this._popup.querySelector(".popup__close");
    closeBtn.addEventListener("click", () => {
      this.close();
    });
  }
}
