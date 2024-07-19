import { useContext, useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Stack from "@mui/material/Stack";
import AddTodoDialog from "../components/AddTodoDialog";
import DeleteTodoConfirmationDialog from "../components/DeleteTodoConfirmationDialog";
import { TodoItemContext } from "../contexts/TodoItemContext";
import { useNavigate } from "react-router-dom";
import { saveTodoInSessionStorage } from "../utils/SessionStorage";
import TodoList from "../components/TodoList";

export type TodoItem = {
  id: string;
  title: string;
  summary: string;
  description: string;
  createdAt: Date;
  completedAt: Date | null;
  completed: boolean;
};

export default function Home() {
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<TodoItem>({} as TodoItem);
  const navigate = useNavigate();

  const {
    addTodo,
    markComplete,
    handleTodoDelete,
    handleCompletedDelete,
    completed,
    todos,
    setTodo,
  } = useContext(TodoItemContext);

  const handleOpenAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteClick =
    (item: TodoItem) => (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
      setItemToDelete(item);
      handleOpenAlert();
      e.stopPropagation();
    };

  const handleRedirect = (todo: TodoItem) => {
    navigate(`todo/${todo.id}`);
    setTodo(todo);
    saveTodoInSessionStorage(todo);
  };

  return (
    <>
      <Grid container justifyContent="center" className="mt-4">
        <Grid item md={6} sm={8} xs={12}>
          <Stack>
            <Grid container>
              <Grid item xs={11}>
                <Typography variant="h5" className="font-black" gutterBottom>
                  TODOs
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Grid container justifyContent="end">
                  <AddCircleIcon
                    data-testid="add-icon"
                    color="primary"
                    fontSize="large"
                    className="cursor-pointer"
                    onClick={handleClickOpen}
                  />
                </Grid>
              </Grid>
            </Grid>
            {todos.length === 0 && (
              <Typography
                component="span"
                variant="body1"
                sx={{ textAlign: "center" }}
              >
                You Currently have no todos, click{" "}
                <AddCircleIcon color="primary" fontSize="small" /> to add one
              </Typography>
            )}
            <TodoList
              todos={todos}
              markComplete={markComplete}
              handleDeleteClick={handleDeleteClick}
              handleRedirect={handleRedirect}
            />
            {completed.length > 0 && (
              <Stack className="mt-4">
                <Typography variant="h5" className="font-black" gutterBottom>
                  Completed
                </Typography>
                <TodoList
                  todos={completed}
                  markComplete={markComplete}
                  handleDeleteClick={handleDeleteClick}
                  handleRedirect={handleRedirect}
                  isCompletedList
                />
              </Stack>
            )}
          </Stack>
        </Grid>
      </Grid>
      <AddTodoDialog onClose={handleClose} open={open} onAdd={addTodo} />
      <DeleteTodoConfirmationDialog
        open={openAlert}
        onClose={handleCloseAlert}
        onDelete={
          itemToDelete.completed ? handleCompletedDelete : handleTodoDelete
        }
        item={itemToDelete}
      />
    </>
  );
}
