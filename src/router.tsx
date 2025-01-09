import { createBrowserRouter } from "react-router-dom";
import Blog from "./pages/Blog";
import Category from "./pages/Category";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Post from "./pages/Post";
import Projects from "./pages/Projects";
import Whoami from "./pages/Whoami";

export default createBrowserRouter([
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
  {
    path: "/categories/:name",
    element: <Category />,
  },
  {
    path: "/:type/:file",
    element: <Post />,
  },
]);
