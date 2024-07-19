import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppBar from "./components/AppBar.tsx";
import TodoItemDetails from "./pages/TodoItemDetails.tsx";
import TodoItemContextProvider from "./contexts/TodoItemContext.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";

// Router config for rendering home and Todo lst details page
// React router provides a way to directly supply fallack ui incase some part of app crashes, don't have to
// do it manually by creating error boundary and wrapping it
export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppBar />,
    ErrorBoundary: ErrorBoundary,
    children: [
      {
        path: "/",
        element: <Home />,
        ErrorBoundary: ErrorBoundary,
      },
      {
        path: "/todo/:id",
        element: <TodoItemDetails />,
        ErrorBoundary: ErrorBoundary,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TodoItemContextProvider>
      <RouterProvider router={router} />
    </TodoItemContextProvider>
  </React.StrictMode>
);
