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
import { readMarkdown } from "./utils.tsx";

// Define all routes and respective components
const articles = import.meta.glob([
  "/public/posts/*.md",
  "/public/projects/*.md",
]);

// Routes for articles
const articlesRoutes = Object.keys(articles).map((filepath, _index) => {
  const path = filepath.replace("/public", "");
  return {
    path: path.replace(".md", ""),
    element: <Post path={path} />,
  };
});

// Routes for categories
const fetchCategories = async () => {
  const fmatters = await Promise.all(
    Object.keys(articles).map((path) =>
      fetch(path.replace("/public", ""))
        .then((response) => response.text())
        .then((text) => {
          const fm = readMarkdown(text).frontMatter;
          return {
            title: fm.title,
            categories: fm.categories,
            date: fm.date,
            path: path,
          };
        })
    )
  );
  let catList: string[] = [];
  const categories = new Map();
  fmatters.map((fm) => {
    catList = catList.concat(fm.categories);
    categories.set(
      fm.categories[0],
      (categories.get(fm.categories[0]) ?? new Set()).union(
        new Set(fm.categories.slice(1))
      )
    );
  });
  catList = [...new Set(catList)];
  return { categories, catList, fmatters };
};

export const { categories, catList, fmatters } = await fetchCategories();

const categoriesRoutes = catList.map((cat, _index) => {
  return {
    path: `/categories/${cat}`,
    element: <h1>{cat}</h1>,
  };
});

// Router
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
  ...categoriesRoutes,
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App>
      <RouterProvider router={router} />
    </App>
  </StrictMode>
);
