import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import {
  initialTodos,
  validationConfig,
  todoListSelector,
  popupSelector,
  addTodoSelector,
  counterSelector,
  todoFormSelector,
  todoTemplateSelector,
} from "../utils/constants.js";
import Section from "../components/Section.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const todoCounter = new TodoCounter(initialTodos, counterSelector);

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  if (completed === true) {
    todoCounter.updateCompleted(false);
  }
  todoCounter.updateTotal(false);
}

const generateTodo = (data) => {
  const todo = new Todo(data, todoTemplateSelector, handleCheck, handleDelete);
  return todo.getView();
};

const renderTodo = (item) => {
  const element = generateTodo(item);
  todoList.addItem(element);
};

const todoList = new Section({
  items: initialTodos,
  renderer: renderTodo,
  containerSelector: todoListSelector,
});

todoList.renderItems();

const addTodoPopupForm = new PopupWithForm(popupSelector, (values) => {
  // Add id
  values.id = uuidv4();

  // Change date to local time
  const date = new Date(values.date);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  values.date = date;

  renderTodo(values);
  todoCounter.updateTotal(true);
  addTodoPopupForm.close();
  formValidator.resetValidation();
});

addTodoPopupForm.setEventListeners();

const addTodoBtn = document.querySelector(addTodoSelector);
addTodoBtn.addEventListener("click", () => addTodoPopupForm.open());

const formValidator = new FormValidator(
  validationConfig,
  addTodoPopupForm.getForm()
);
formValidator.enableValidation();
