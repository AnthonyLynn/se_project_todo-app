export default class Todo {
  constructor(data, selector, handleCheck, handleDelete) {
    this._id = data.id;
    this._name = data.name;
    this._completed = data.completed;
    this._date = new Date(data.date);
    this._selector = selector;
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
  }

  _getTemplate() {
    const todoElement = document
      .querySelector(this._selector)
      .content.querySelector(".todo")
      .cloneNode(true);

    return todoElement;
  }

  _delete() {
    this._handleDelete(this._completed);
    this._element.remove();
  }

  _handleCheckbox() {
    this._completed = !this._completed;
    this._handleCheck(this._completed);
  }

  _setEventListeners() {
    this._deleteBtnElement.addEventListener("click", () => {
      this._delete();
    });
    this._checkboxElement.addEventListener("change", () => {
      this._handleCheckbox();
    });
  }

  _loadNameElement() {
    this._nameElement = this._element.querySelector(".todo__name");
    this._nameElement.textContent = this._name;
  }

  _loadCheckboxElement() {
    this._checkboxElement = this._element.querySelector(".todo__completed");
    this._checkboxElement.checked = this._completed;
    this._checkboxElement.setAttribute("id", `todo-${this._id}`);
  }

  _loadLabelElement() {
    this._labelElement = this._element.querySelector(".todo__label");
    this._labelElement.setAttribute("for", `todo-${this._id}`);
  }

  _loadDateElement() {
    if (this._date) {
      this._dateElement = this._element.querySelector(".todo__date");
      this._dateElement.textContent = `Due: ${this._date.toLocaleString(
        "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      )}`;
    }
  }

  getView() {
    this._element = this._getTemplate();

    this._loadNameElement();
    this._loadCheckboxElement();
    this._loadLabelElement();
    this._loadDateElement();

    this._deleteBtnElement = this._element.querySelector(".todo__delete-btn");
    this._checkboxElement = this._element.querySelector(".todo__completed");

    this._setEventListeners();

    return this._element;
  }
}
