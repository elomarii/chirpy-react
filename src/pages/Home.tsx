import { useState } from "react";
import BlogCard from "../components/BlogCard";
import Pagination from "../components/Pagination";

const extractDate = (input: string): string => {
  const regex = /(\d{4}-\d{2}-\d{2})/;
  const match = input.match(regex);
  return match ? match[0] : "NA";
};

export default function Home() {
  const [page, setPage] = useState(0);

  const articlePerPage = 5;
  const articles = Object.keys(import.meta.glob("/public/posts/*")).map(
    (filepath, _index) => {
      const path = filepath.replace("/public", "");
      return {
        path: path.replace(".md", ""),
        date: extractDate(path),
      };
    }
  );

  const pagesCount: number = Math.floor(articles.length / articlePerPage) + 1;

  return (
    <>
      {articles
        .slice(
          page * articlePerPage,
          Math.min(articles.length, page * articlePerPage + articlePerPage)
        )
        .map((art) => (
          <BlogCard
            title={art.path}
            path={art.path}
            description="null"
            categories={[]}
            date={art.date}
          />
        ))}
      <Pagination
        currentPage={page}
        pagesCount={pagesCount}
        setPage={setPage}
      />
    </>
  );
}
