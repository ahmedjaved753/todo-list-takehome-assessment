import { ReactNode, createContext, useState, useMemo } from "react";
import { TodoItem } from "../pages/Home";
import {
  getCompletedItemsFromSessionStorage,
  getTodoFromSessionStorage,
  getTodosFromSessionStorage,
  saveCompletedItemsInSessionStorage,
  saveTodoInSessionStorage,
  saveTodosInSessionStorage,
} from "../utils/SessionStorage";

export type TodoItemContextType = {
  todo: TodoItem | null;
  setTodo: React.Dispatch<React.SetStateAction<TodoItem | null>>;
  addTodo: (todo: TodoItem) => void;
  markComplete: (
    clickedItem: TodoItem
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTodoDelete: (itemToDelete: TodoItem) => void;
  handleCompletedDelete: (itemToDelete: TodoItem) => void;
  todos: TodoItem[];
  completed: TodoItem[];
  editTodo: (summary: string, description: string, id: string) => void;
};

const DEFALT_CONTEXT_VALUE = {
  todo: null,
  setTodo: () => {},
  addTodo: () => {},
  markComplete: () => () => {},
  handleTodoDelete: () => {},
  handleCompletedDelete: () => {},
  todos: [],
  completed: [],
  editTodo: () => {},
};

const todoItem = getTodoFromSessionStorage();
const completedItems = getCompletedItemsFromSessionStorage();
const todoItems = getTodosFromSessionStorage();

export const TodoItemContext =
  createContext<TodoItemContextType>(DEFALT_CONTEXT_VALUE);

type TodoItemContextProviderpropsType = {
  children: ReactNode;
};

export default function TodoItemContextProvider({
  children,
}: TodoItemContextProviderpropsType) {
  const [todo, setTodo] = useState<TodoItem | null>(
    todoItem && JSON.parse(todoItem)
  );
  const [todos, setTodos] = useState<TodoItem[]>(
    todoItems ? JSON.parse(todoItems) : []
  );
  const [completed, setCompleted] = useState<TodoItem[]>(
    completedItems ? JSON.parse(completedItems) : []
  );

  const addTodo = (todo: TodoItem) => {
    const updatedTodos = [...todos, todo];
    setTodos(updatedTodos);
    saveTodosInSessionStorage(updatedTodos);
  };

  const markComplete =
    (clickedItem: TodoItem) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        const todoItems = todos.reduce((todos, todo) => {
          if (todo.id !== clickedItem.id) return [...todos, todo];
          todo.completed = true;
          todo.completedAt = new Date();
          const updatedCompletedItems = [...completed, todo];
          setCompleted(updatedCompletedItems);
          saveCompletedItemsInSessionStorage(updatedCompletedItems);
          return todos;
        }, [] as TodoItem[]);
        setTodos(todoItems);
        saveTodosInSessionStorage(todoItems);
      }
    };

  const filterItem = (items: TodoItem[], item: TodoItem) =>
    items.filter((val) => val.id !== item.id);
  const handleTodoDelete = (itemToDelete: TodoItem) => {
    const updtedTodos = filterItem(todos, itemToDelete);
    setTodos(updtedTodos);
    saveTodosInSessionStorage(updtedTodos);
  };

  const handleCompletedDelete = (itemToDelete: TodoItem) => {
    const updatedCompletedItems = filterItem(completed, itemToDelete);
    setCompleted(updatedCompletedItems);
    saveCompletedItemsInSessionStorage(updatedCompletedItems);
  };

  const editTodo = (summary: string, description: string, id: string) => {
    const updatedTodo = { ...todo, summary, description } as TodoItem;
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? updatedTodo : todo
    );
    setTodos(updatedTodos);
    setTodo(updatedTodo);
    saveTodosInSessionStorage(updatedTodos);
    saveTodoInSessionStorage(updatedTodo);
  };

  const contextValue = useMemo(
    () => ({
      todo,
      setTodo,
      addTodo,
      markComplete,
      handleTodoDelete,
      handleCompletedDelete,
      todos,
      completed,
      editTodo,
    }),
    [todo, todos, completed]
  );

  return (
    <TodoItemContext.Provider value={contextValue}>
      {children}
    </TodoItemContext.Provider>
  );
}
