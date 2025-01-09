import { useState } from "react";
import Pagination from "../components/Pagination";
import ProjectCard from "../components/ProjectCard";
import AsciiArt from "../components/AsciiArt";
import { artProject } from "../globals";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { resetToc } from "../utils";

export default function Projects() {
  const projects = useSelector((state: RootState) => state.sitedata.projects);
  const loading = useSelector((state: RootState) => state.sitedata.loading);
  const [page, setPage] = useState(0);
  const projectsCount: number = projects.length;
  const articlePerPage: number = 12;
  const pagesCount: number = Math.ceil(projectsCount / articlePerPage);
  resetToc();
  return loading ? (
    <></>
  ) : projectsCount == 0 ? (
    <AsciiArt art={artProject} />
  ) : (
    <>
      <div id="project-list" className="container my-5">
        <div className="row g-4">
          {projects
            .slice(
              page * articlePerPage,
              Math.min((page + 1) * articlePerPage, projectsCount)
            )
            .map((fmatter, index) => {
              return (
                <ProjectCard
                  title={fmatter.title}
                  path={fmatter.path.replace(".md", "")}
                  description={fmatter.description}
                  categories={fmatter.categories}
                  date={fmatter.date}
                  image={fmatter.image}
                  key={index}
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
