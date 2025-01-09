import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { listToString } from "../utils";
import { faCalendarAlt, faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  description: string;
  categories: string[];
  date: string;
  path: string;
  image?: string;
}

function ProjectCard({
  title,
  description,
  categories,
  date,
  path,
  image,
}: Props) {
  return (
    <div className="col-12 col-md-6 col-lg-6 d-flex">
      <article className="card-wrapper card">
        <Link to={path} className="post-preview">
          <div className="image-wrapper">
            {image ? (
              <img src={image} alt={title} className="project-thumb" />
            ) : (
              <div className="filler" />
            )}
          </div>
          <div className="card-body">
            <h5 className="card-title mt-2">{title}</h5>
            <div className="card-text content mt-0 mb-3">
              <p>{description}</p>
            </div>
            <div className="post-meta flex-grow-1 d-flex align-items-end">
              <div className="me-auto">
                <span>
                  <FontAwesomeIcon
                    icon={faFolderOpen}
                    style={{ width: "1.5em" }}
                  />{" "}
                  {`${listToString(categories)}`}
                </span>
              </div>
            </div>
            <div className="post-meta flex-grow-1 d-flex align-items-end">
              <div className="me-auto">
                <span>
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    style={{ width: "1.5em" }}
                  />{" "}
                  {` ${date}`}
                </span>
              </div>
            </div>
          </div>
        </Link>
      </article>
    </div>
  );
}

export default ProjectCard;
