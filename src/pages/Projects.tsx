import { useState } from "react";
import Pagination from "../components/Pagination";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../main";

export default function Projects() {
  const [page, setPage] = useState(0);
  const projectsCount = projects.length;
  const articlePerPage = 12;
  const pagesCount: number = Math.ceil(projectsCount / articlePerPage);

  return (
    <>
      <div id="project-list" className="container my-5">
        <div className="row g-4">
          {projects
            .slice(
              page * articlePerPage,
              Math.min((page + 1) * articlePerPage, projectsCount)
            )
            .map((fmatter) => {
              return (
                <ProjectCard
                  title={fmatter.title}
                  path={fmatter.path.replace(".md", "")}
                  description={fmatter.description}
                  categories={fmatter.categories}
                  date={fmatter.date}
                  image={fmatter.image}
                />
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
