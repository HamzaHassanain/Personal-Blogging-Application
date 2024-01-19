import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import BlogsPage from "./pages/BlogsPage";
import SingleBlog from "./pages/SingleBlog";
import { rootLoader } from "./loaders";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "blogs/:slug",
        element: <SingleBlog />,
      },

      {
        path: "",
        loader: rootLoader,
        element: <BlogsPage />,
      },
      {
        loader: rootLoader,
        path: "/:type",
        element: <BlogsPage />,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
