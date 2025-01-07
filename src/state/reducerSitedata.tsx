import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { readMarkdown } from "../utils";
import { CategoryListing, SitedataState } from "../interfaces";

const sitedataInitialState: SitedataState = {
  categories: [],
  posts: [],
  projects: [],
  paths: [],
  loading: true,
};

const sitedataSlice = createSlice({
  name: "sitedata",
  initialState: sitedataInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadAsync.fulfilled, (state, action) => {
      state.categories = action.payload.categories;
      state.posts = action.payload.posts;
      state.projects = action.payload.projects;
      state.paths = action.payload.paths;
      state.loading = false;
    });
  },
});

async function readFiles(files: string[]) {
  return await Promise.all(
    files.map((path) =>
      fetch(path + ".md")
        .then((response) => response.text())
        .then((text) => {
          const fm = readMarkdown(text).frontMatter;
          return {
            title: fm.title,
            categories: fm.categories,
            description: fm.description,
            image: fm.image,
            date: fm.date,
            path: path,
          };
        })
    )
  );
}

export const loadAsync = createAsyncThunk("sitedata/loadAsync", async () => {
  const projectFiles = Object.keys(import.meta.glob("/public/projects/*.md"))
    .map((path) => path.replace("/public", "").replace(".md", ""))
    .reverse();
  const postFiles = Object.keys(import.meta.glob("/public/posts/*.md"))
    .map((path) => path.replace("/public", "").replace(".md", ""))
    .reverse();

  const paths = projectFiles.concat(postFiles);
  const posts = await readFiles(postFiles);
  const projects = await readFiles(projectFiles);
  const categoryMap = new Map();
  // parsing categories
  posts.concat(projects).map((fm) => {
    const parentCategory: string = fm.categories[0];
    const fmcat: string[] = fm.categories.slice(1);
    const mapcat: string[] = categoryMap.get(parentCategory) ?? [];
    categoryMap.set(parentCategory, [...new Set([...fmcat, ...mapcat])]);
  });
  const categories = Array.from(categoryMap.keys()).map((key) => {
    return {
      parent: key,
      children: categoryMap.get(key),
    } as CategoryListing;
  });
  return { categories, posts, projects, paths };
});

export const sitedataReducer = sitedataSlice.reducer;
