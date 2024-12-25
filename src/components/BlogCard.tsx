import { listToString } from "../utils";

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
      <article className="card-wrapper card">
        <a href={path} className="post-preview row g-0 flex-md-row">
          <div className="col-md-8">
            <div className="card-body">
              <h1 className="card-title">{title}</h1>
              <div className="card-text content mt-0 mb-3">
                <p>{description}</p>
              </div>
              <div className="post-meta flex-grow-1 d-flex align-items-end">
                <div className="me-auto">
                  <span>{`${date} | ${listToString(categories)}`}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            {image ? (
              <img
                src={image}
                className="img-fluid rounded-end"
                alt="..."
                style={{ height: "100%" }}
              />
            ) : (
              <span />
            )}
          </div>
        </a>
      </article>
    </>
  );
}

export default BlogCard;
