import { act, fireEvent, render, screen } from "@testing-library/react";
import Home from "../Home";
import { MemoryRouter } from "react-router-dom";
import {
  TodoItemContext,
  TodoItemContextType,
} from "../../contexts/TodoItemContext";

type ComponentPropsType = {
  contextValue: TodoItemContextType;
};

const Component = ({ contextValue }: ComponentPropsType) => (
  <TodoItemContext.Provider value={contextValue}>
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  </TodoItemContext.Provider>
);

const todos = [
  {
    id: "1",
    title: "Test Todo",
    summary: "Test Summary",
    description: "Test Description",
    createdAt: new Date(),
    completedAt: null,
    completed: false,
  },
];

const markComplete = jest.fn();
const addTodo = jest.fn();

const contextValue = {
  addTodo,
  markComplete,
  handleTodoDelete: jest.fn(),
  handleCompletedDelete: jest.fn(),
  completed: [],
  todos,
  setTodo: jest.fn(),
} as unknown as TodoItemContextType;

describe("App tests", () => {
  it("should contains the heading 1", async () => {
    render(<Component contextValue={contextValue} />);

    // Click Add todo icon button
    await act(async () => {
      fireEvent.click(screen.getByTestId("add-icon"));
    });

    // Fill in form
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Title/i), {
        target: { value: "New Todo" },
      });
      fireEvent.change(screen.getByLabelText(/Summary/i), {
        target: { value: "Todo Summary" },
      });
      fireEvent.change(screen.getByLabelText(/Description/i), {
        target: { value: "Todo Description" },
      });
    });

    // Submit form
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /Add/i }));
    });

    //Check if addTodo is called
    expect(addTodo).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "New Todo",
        summary: "Todo Summary",
        description: "Todo Description",
        completed: false,
        completedAt: null,
      })
    );
  });
  it("should call markComplete when the checkbox is clicked", async () => {
    render(<Component contextValue={contextValue} />);

    // Click complete todo checkbox
    await act(async () => {
      fireEvent.click(screen.getByRole("checkbox"));
    });

    // Check if markComplete is called
    expect(markComplete).toHaveBeenCalledWith(todos[0]);
  });
});
