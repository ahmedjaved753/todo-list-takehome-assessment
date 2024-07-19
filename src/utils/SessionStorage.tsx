import { TodoItem } from "../pages/Home";

const TODO = "todo";
const TODOS = "todos";
const COMPLETED = "completed";

export const getTodoFromSessionStorage = () => sessionStorage.getItem(TODO);
export const getTodosFromSessionStorage = () => sessionStorage.getItem(TODOS);
export const getCompletedItemsFromSessionStorage = () =>
  sessionStorage.getItem(COMPLETED);
export const saveTodoInSessionStorage = (todo: TodoItem) =>
  sessionStorage.setItem(TODO, JSON.stringify(todo));
export const saveTodosInSessionStorage = (todos: TodoItem[]) =>
  sessionStorage.setItem(TODOS, JSON.stringify(todos));
export const saveCompletedItemsInSessionStorage = (
  completedItems: TodoItem[]
) => sessionStorage.setItem(COMPLETED, JSON.stringify(completedItems));
