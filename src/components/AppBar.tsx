import Typography from "@mui/material/Typography";
import Appbar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Outlet } from "react-router-dom";

export default function AppBar() {
  return (
    <>
      <Appbar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todo List
          </Typography>
        </Toolbar>
      </Appbar>
      <Outlet />
    </>
  );
}
