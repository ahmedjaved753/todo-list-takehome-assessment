import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TodoItem } from "../pages/Home";

type DeleteTodoConfirmationDialogPropsType = {
  open: boolean;
  onClose: () => void;
  onDelete: (item: TodoItem) => void;
  item: TodoItem;
};
export default function DeleteTodoConfirmationDialog({
  open,
  onClose,
  onDelete,
  item,
}: DeleteTodoConfirmationDialogPropsType) {
  const handleDelete = () => {
    onDelete(item);
    onClose();
  };
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Todo?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this todo item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={onClose}>
            No
          </Button>
          <Button
            color="error"
            onClick={handleDelete}
            variant="contained"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
