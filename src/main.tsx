import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/main.scss";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx";
import Whoami from "./pages/Whoami.tsx";
import Post from "./pages/Post.tsx";
import Blog from "./pages/Blog.tsx";
import Projects from "./pages/Projects.tsx";
import { readMarkdown } from "./utils.tsx";
import Category from "./pages/Category.tsx";

// Define all routes and respective components
const files = import.meta.glob(["/public/posts/*.md", "/public/projects/*.md"]);

// Routes for articles
const articlesRoutes = Object.keys(files).map((filepath, _index) => {
  const path = filepath.replace("/public", "");
  return {
    path: path.replace(".md", ""),
    element: <Post path={path} />,
  };
});

// Routes for categories
const fetchCategories = async () => {
  const articles = await Promise.all(
    Object.keys(files).map((path) =>
      fetch(path.replace("/public", ""))
        .then((response) => response.text())
        .then((text) => {
          const fm = readMarkdown(text).frontMatter;
          return {
            title: fm.title,
            categories: fm.categories,
            date: fm.date,
            path: path.replace("/public", "").replace(".md", ""),
          };
        })
    )
  );
  let catList: string[] = [];
  const categories = new Map();
  articles.map((fm) => {
    catList = catList.concat(fm.categories);
    categories.set(
      fm.categories[0],
      (categories.get(fm.categories[0]) ?? new Set()).union(
        new Set(fm.categories.slice(1))
      )
    );
  });
  catList = [...new Set(catList)];
  return { categories, catList, articles };
};

export const { categories, catList, articles } = await fetchCategories();

const categoriesRoutes = catList.map((cat, _index) => {
  return {
    path: `/categories/${cat.replace(" ", "-").toLowerCase()}`,
    element: <Category name={cat} />,
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
