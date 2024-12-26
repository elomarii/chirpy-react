import { listToString } from "../utils";

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
    <div className="col-12 col-md-6 col-lg-4 d-flex">
      <article className="card-wrapper card">
        <a href={path} className="post-preview">
          <div
            className="image-wrapper"
            style={{
              backgroundColor: image ? "" : "brown",
              minWidth: "-webkit-fill-available",
              height: "3em",
              marginTop: "1em",
            }}
          >
            {image ? (
              <img
                src={image}
                alt={title}
                className="card-img-top"
                style={{ height: "100%" }}
              />
            ) : null}{" "}
          </div>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <div className="card-text content mt-0 mb-3">
              <p>{description}</p>
            </div>
            <div className="post-meta flex-grow-1 d-flex align-items-end">
              <div className="me-auto">
                <span>{`${date} | ${listToString(categories)}`}</span>
              </div>
            </div>
          </div>
        </a>
      </article>
    </div>
  );
}

export default ProjectCard;
