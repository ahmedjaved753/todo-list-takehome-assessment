import { useContext, useState } from "react";
import { TodoItemContext } from "../contexts/TodoItemContext";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ItemDetail from "../components/ItemDetail";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import AddTodoDialog from "../components/AddTodoDialog";
import { TodoItem } from "./Home";

function TodoItemDetails() {
  const [open, setOpen] = useState(false);
  const { todo, editTodo } = useContext(TodoItemContext);
  console.log(todo, "todo");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // making sure createdAt and completedAtare always date objects even if they are received from session storage
  const createdAt =
    typeof todo?.createdAt === "string"
      ? new Date(todo.createdAt)
      : todo?.createdAt;
  const completedAt =
    typeof todo?.completedAt === "string"
      ? new Date(todo.completedAt)
      : todo?.completedAt;

  return (
    <Grid container className="w-full" justifyContent="center">
      <Grid
        item
        md={6}
        sm={8}
        xs={12}
        justifyContent="center"
        className="w-full"
      >
        <Typography variant="h5" className="font-black" gutterBottom>
          Todo Details
        </Typography>
        <ItemDetail name="Title" value={todo?.title as string} />
        <ItemDetail name="Summary" value={todo?.summary as string} />
        <ItemDetail name="Description" value={todo?.description as string} />
        <Stack direction="row" spacing={3}>
          <ItemDetail
            name="Created at"
            value={`${createdAt?.toLocaleDateString?.()} ${createdAt?.toLocaleTimeString?.()}`}
          />
          <ItemDetail
            name="Completed at"
            value={
              todo?.completed
                ? `${new Date(
                    completedAt as Date | string
                  )?.toLocaleDateString?.()} ${completedAt?.toLocaleTimeString?.()}`
                : "Not completed yet"
            }
          />
        </Stack>
        <Stack className="mt-3" direction="row" justifyContent="space-between">
          <Link to="/">
            <Button variant="outlined" size="small">
              Go back to list
            </Button>
          </Link>
          {!todo?.completed && (
            <Button size="small" variant="contained" onClick={handleClickOpen}>
              Edit
            </Button>
          )}
        </Stack>
      </Grid>
      <AddTodoDialog
        onClose={handleClose}
        open={open}
        todo={todo as TodoItem}
        onEdit={editTodo}
      />
    </Grid>
  );
}

export default TodoItemDetails;
