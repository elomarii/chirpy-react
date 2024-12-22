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
    <>
      <div className="card" style={{ margin: "10px", padding: 0 }}>
        <a
          href={path}
          style={{
            textDecoration: "inherit",
            color: "inherit",
          }}
        >
          <div
            style={{
              backgroundColor: image ? "" : "red",
              minWidth: "-webkit-fill-available",
              height: "3em",
              marginTop: "0.2em",
            }}
          >
            {image ? (
              <img
                src={image}
                alt={title}
                className="card-img-top"
                style={{ height: "100%" }}
              />
            ) : null}
          </div>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">{categories}</p>
            <p className="card-subtitle mb-2 text-body-secondary">{date}</p>
          </div>
        </a>
      </div>
    </>
  );
}

export default ProjectCard;
