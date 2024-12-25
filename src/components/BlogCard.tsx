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
        <a href={path} className="post-preview row g-0 flex-md-row-reverse">
          {image ? (
            <div className="col-md-5">
              <img src={image} />
            </div>
          ) : (
            <></>
          )}

          <div className={image ? "col-md-7" : "col-md-12"}>
            <div className="card-body d-flex flex-column">
              <h1 className="card-title my-2 mt-md-0">{title}</h1>
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
        </a>
      </article>
    </>
  );
}

export default BlogCard;
