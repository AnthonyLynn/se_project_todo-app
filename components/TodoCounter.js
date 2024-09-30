export default class TodoCounter {
  constructor(todos, selector) {
    this._total = todos.length;
    this._completed = todos.filter((todo) => todo.completed).length;
    this._element = document.querySelector(selector);

    this._updateText();
  }

  _updateText() {
    this._element.textContent = `
      Showing ${this._completed}
      out of ${this._total}
      completed.`;
  }

  updateCompleted(increment = true) {
    this._completed += increment ? 1 : -1;
    this._updateText();
  }

  updateTotal(increment = true) {
    this._total += increment ? 1 : -1;
    this._updateText();
  }
}
