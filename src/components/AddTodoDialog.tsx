import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import { Button, DialogActions, Grid } from "@mui/material";
import { TodoItem } from "../pages/Home";
import { useForm, SubmitHandler } from "react-hook-form";
import { v4 as uuid } from "uuid";

type OnAddType = (todo: TodoItem) => void;
type OnEditType = (summary: string, description: string, id: string) => void;

type AddTodoDialogProps = {
  open: boolean;
  onClose: () => void;
  todo?: TodoItem;
  onAdd?: OnAddType;
  onEdit?: OnEditType;
} & ({ onAdd: OnAddType } | { onEdit: OnEditType });

type AddTodoFormType = {
  title: string;
  summary: string;
  description: string;
};

export default function AddTodoDialog({
  onClose,
  open,
  onAdd,
  onEdit,
  todo,
}: AddTodoDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddTodoFormType>({
    // Need to check forms needs to be filled in case of editing or left blacnk in case of creating
    defaultValues: todo
      ? {
          title: todo.title,
          summary: todo.summary,
          description: todo.description,
        }
      : {
          title: "",
          summary: "",
          description: "",
        },
  });

  const handleClose = () => {
    onClose();
    reset();
  };

  const onSubmit: SubmitHandler<AddTodoFormType> = (data) => {
    // Editing todo
    if (todo) onEdit?.(data.summary, data.description, todo.id);
    // Creating new todo
    else {
      onAdd?.({
        id: uuid(),
        title: data.title,
        completed: false,
        summary: data.summary,
        description: data.description,
        createdAt: new Date(),
        completedAt: null,
      });
    }
    handleClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Add Todo</DialogTitle>
      <form className="px-4" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              disabled={!!todo}
              label="Title"
              {...register("title", { required: "Title is required" })}
              variant="outlined"
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Summary"
              {...register("summary", { required: "Summary is required" })}
              error={!!errors.summary}
              helperText={errors.summary?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              {...register("description")}
              multiline
              rows={4}
            />
          </Grid>
        </Grid>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" autoFocus>
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
