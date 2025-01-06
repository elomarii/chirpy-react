import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/main.scss";
import App from "./App.tsx";
import { readMarkdown } from "./utils.tsx";

// Define all routes and respective components
const projectFiles = Object.keys(
  import.meta.glob("/public/projects/*.md")
).reverse();
const postFiles = Object.keys(import.meta.glob("/public/posts/*.md")).reverse();

async function readFiles(files: string[]) {
  return await Promise.all(
    files.map((path) =>
      fetch(path.replace("/public", ""))
        .then((response) => response.text())
        .then((text) => {
          const fm = readMarkdown(text).frontMatter;
          return {
            title: fm.title,
            categories: fm.categories,
            description: fm.description,
            image: fm.image,
            date: fm.date,
            path: path.replace("/public", "").replace(".md", ""),
          };
        })
    )
  );
}

// Routes for categories
const fetchCategories = async () => {
  const posts = await readFiles(postFiles);
  const projects = await readFiles(projectFiles);
  let catList: string[] = [];
  const categories = new Map();
  posts.concat(projects).map((fm) => {
    catList = catList.concat(fm.categories);
    categories.set(
      fm.categories[0],
      (categories.get(fm.categories[0]) ?? new Set()).union(
        new Set(fm.categories.slice(1))
      )
    );
  });
  catList = [...new Set(catList)];
  return { categories, catList, posts, projects };
};

export const { categories, catList, posts, projects } = await fetchCategories();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
