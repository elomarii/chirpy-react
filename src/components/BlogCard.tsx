interface Props {
  title: string;
  description: string;
  categories: string[];
  date: string;
  path: string;
  image?: string;
}

function BlogCard({
  title,
  description,
  categories,
  date,
  path,
  image,
}: Props) {
  return (
    <>
      <div className="card" style={{ margin: "10px" }}>
        <a
          href={path}
          style={{
            textDecoration: "inherit",
            color: "inherit",
          }}
        >
          <div className="row">
            <div className="col-8">
              <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  {categories}
                </h6>
                <p className="card-text">{description}</p>
                <p className="card-subtitle mb-2 text-body-secondary">{date}</p>
              </div>
            </div>
            <div className="col">
              {image ? (
                <img src={image} className="card-img-top" alt="..." />
              ) : (
                <span />
              )}
            </div>
          </div>
        </a>
      </div>
    </>
  );
}

export default BlogCard;
