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
import Section from "../utils/section.js";
import Todo from "../components/todo.js";
import FormValidator from "../components/formValidator.js";
import PopupWithForm from "../components/popupWithForm.js";
import TodoCounter from "../components/todoCounter.js";

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

const todoList = new Section({
  items: initialTodos,
  renderer: (item) => {
    const element = generateTodo(item);
    todoList.addItem(element);
  },
  containerSelector: todoListSelector,
});

todoList.renderItems();

const addTodoPopupForm = new PopupWithForm(popupSelector, (values) => {
  const element = generateTodo(values);
  todoList.addItem(element);
  todoCounter.updateTotal(true);
  addTodoPopupForm.close();
  formValidator.resetValidation();
});

addTodoPopupForm.setEventListeners();

const addTodoBtn = document.querySelector(addTodoSelector);
addTodoBtn.addEventListener("click", () => addTodoPopupForm.open());

const addTodoForm = document.forms[todoFormSelector];
const formValidator = new FormValidator(validationConfig, addTodoForm);
formValidator.enableValidation();
