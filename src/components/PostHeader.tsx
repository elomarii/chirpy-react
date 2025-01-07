import { ArticleProps } from "../interfaces";

interface Props {
  frontmatter: ArticleProps;
  readtime?: number;
  show?: boolean;
}

export default function PostHeader({
  frontmatter,
  readtime = 1,
  show = true,
}: Props) {
  return (
    <div style={{ display: show ? "" : "none" }}>
      <header>
        <h1 data-doc-skip>{frontmatter.title}</h1>
        <p className="post-desc fw-light mb-4">{frontmatter.description}</p>
        <div className="post-meta text-muted">
          <div className="d-flex justify-content-between">
            <span>
              Posted on
              <em> {new Date(frontmatter.date).toDateString()}</em>
            </span>
            <div>
              <span
                className="readtime"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title={readtime.toString()}
              >
                <em>{Math.max(readtime, 1)} min </em>
                read
              </span>
            </div>
          </div>
        </div>
      </header>
      <hr />
      <img
        className="post-banner"
        title="banner"
        alt="banner"
        style={{ display: frontmatter.banner ? "" : "none" }}
        src={frontmatter.banner}
      />
      <hr />
    </div>
  );
}
