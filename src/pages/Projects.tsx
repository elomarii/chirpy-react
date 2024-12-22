import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import { readMarkdown } from "../utils";
import ProjectCard from "../components/ProjectCard";

interface FrontMatter {
  [key: string]: any;
}

export default function Projects() {
  const [page, setPage] = useState(0);
  const [fmatters, setFmatters] = useState<FrontMatter[]>([]);

  const articlePerPage = 9;
  const articles = Object.keys(import.meta.glob("/public/projects/*.md"))
    .reverse()
    .map((filepath, _index) => filepath.replace("/public", ""));

  const pagesCount: number = Math.ceil(articles.length / articlePerPage);

  useEffect(() => {
    const fetchArticles = async () => {
      const start = page * articlePerPage;
      const end = Math.min(articles.length, start + articlePerPage);
      const currentArticles = articles.slice(start, end);

      const fetchedMatters = await Promise.all(
        currentArticles.map(async (art) => {
          const response = await fetch(art);
          const text = await response.text();
          const frontMatter = { ...readMarkdown(text).frontMatter, path: art };
          return frontMatter;
        })
      );

      setFmatters(fetchedMatters);
    };

    fetchArticles();
  }, [page]);

  return (
    <>
      <div className="container text-center">
        <div className="row row-cols-3">
          {fmatters.map((fmatter) => {
            return (
              <div className="col">
                <ProjectCard
                  title={fmatter.title}
                  path={fmatter.path.replace(".md", "")}
                  description={fmatter.description}
                  categories={fmatter.categories}
                  date={fmatter.date}
                  image={fmatter.image}
                />
              </div>
            );
          })}
        </div>
      </div>
      <Pagination
        currentPage={page}
        pagesCount={pagesCount}
        setPage={setPage}
      />
    </>
  );
}
