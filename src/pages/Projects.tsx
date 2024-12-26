import { useState } from "react";
import Pagination from "../components/Pagination";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../main";

export default function Projects() {
  const [page, setPage] = useState(0);
  const projectsCount = projects.length;
  const articlePerPage = 9;
  const pagesCount: number = Math.ceil(projectsCount / articlePerPage);

  return (
    <>
      <div className="container text-center">
        <div className="row row-cols-3">
          {projects
            .slice(
              page * articlePerPage,
              Math.min((page + 1) * articlePerPage, projectsCount)
            )
            .map((fmatter) => {
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
