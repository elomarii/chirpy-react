import Page from "./Page";
import { posts } from "../main";
import { useParams } from "react-router-dom";

function Category() {
  const { name } = useParams();
  const relevantPosts = posts.filter((post) =>
    post.categories
      .map((cat: string) => cat.toLowerCase().replace(" ", "-"))
      .includes(name)
  );
  return (
    <Page title={name ?? ""}>
      <ul className="content ps-0">
        {relevantPosts.length == 0 ? (
          <h3>No relevant posts</h3>
        ) : (
          relevantPosts.map((post) => (
            <li className="d-flex justify-content-between px-md-3">
              <a href={post.path}>{post.title}</a>
              <span className="dash flex-grow-1"></span>
              <time className="text-muted small text-nowrap">{post.date}</time>
            </li>
          ))
        )}
      </ul>
    </Page>
  );
}

export default Category;
