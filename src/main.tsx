import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx";
import Whoami from "./pages/Whoami.tsx";
import Post from "./pages/Post.tsx";
import Blog from "./pages/Blog.tsx";
import Projects from "./pages/Projects.tsx";

// Define all routes and respective components
const articles = import.meta.glob([
  "/public/posts/*.md",
  "/public/projects/*.md",
]);
const articlesRoutes = Object.keys(articles).map((filepath, _index) => {
  const path = filepath.replace("/public", "");
  return {
    path: path.replace(".md", ""),
    element: <Post path={path} />,
  };
});
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: "/blog",
    element: <Blog />,
  },
  {
    path: "/projects",
    element: <Projects />,
  },
  {
    path: "/whoami",
    element: <Whoami />,
  },
  ...articlesRoutes,
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App>
      <RouterProvider router={router} />
    </App>
  </StrictMode>
);
