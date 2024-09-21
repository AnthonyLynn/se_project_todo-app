export default class Todo {
  constructor(data, selector) {
    this._id = data.id;
    this._name = data.name;
    this._completed = data.completed;
    this._date = new Date(data.date);
    this._selector = selector;
  }

  _getTemplate() {
    const todoElement = document
      .querySelector(this._selector)
      .content.querySelector(".todo")
      .cloneNode(true);

    return todoElement;
  }

  _setEventListeners() {
    const deleteBtn = this._element.querySelector(".todo__delete-btn");
    deleteBtn.addEventListener("click", () => {
      this._element.remove();
    });
  }

  getView() {
    this._element = this._getTemplate();

    const nameElement = this._element.querySelector(".todo__name");
    nameElement.textContent = this._name;

    const checkboxElement = this._element.querySelector(".todo__completed");
    checkboxElement.checked = this._completed;
    checkboxElement.setAttribute("id", `todo-${this._id}`);

    const labelElement = this._element.querySelector(".todo__label");
    labelElement.setAttribute("for", `todo-${this._id}`);

    if (this._date) {
      const dateElement = this._element.querySelector(".todo__date");
      dateElement.textContent = `Due: ${this._date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }

    this._setEventListeners();

    return this._element;
  }
}
