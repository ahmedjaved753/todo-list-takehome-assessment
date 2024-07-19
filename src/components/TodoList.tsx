import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { TodoItem } from "../pages/Home";

type TodoListProps = {
  todos: TodoItem[];
  markComplete: (
    todo: TodoItem
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDeleteClick: (
    item: TodoItem
  ) => (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
  handleRedirect: (todo: TodoItem) => void;
  isCompletedList?: boolean;
};

const TodoList: React.FC<TodoListProps> = ({
  todos,
  markComplete,
  handleDeleteClick,
  handleRedirect,
  isCompletedList = false,
}) => {
  return (
    <>
      {todos.map((todo) => (
        <Accordion key={todo.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            className="flex items-center"
          >
            <Grid container>
              <Grid item xs={9}>
                <Stack direction="row">
                  <Checkbox
                    sx={{ paddingLeft: 0, paddingRight: 0.5 }}
                    checked={todo.completed}
                    onChange={markComplete(todo)}
                    onClick={(e) => e.stopPropagation()}
                    disabled={isCompletedList}
                  />
                  <Typography
                    component="span"
                    variant="body1"
                    className="flex items-center"
                  >
                    {todo.title}
                  </Typography>
                  <Box className="flex items-center ml-1">
                    <DeleteIcon
                      color="error"
                      fontSize="small"
                      onClick={handleDeleteClick(todo)}
                    />
                  </Box>
                </Stack>
              </Grid>
              <Grid item xs={3}>
                <Box className="flex justify-end">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleRedirect(todo)}
                  >
                    Details
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>{todo.summary}</AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default TodoList;
