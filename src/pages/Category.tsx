import Page from "./Page";
import { posts } from "../main";

interface Props {
  name: string;
}

function Category({ name }: Props) {
  return (
    <Page title={name}>
      <ul className="content ps-0">
        {posts
          .filter((post) => post.categories.includes(name))
          .map((post) => (
            <li className="d-flex justify-content-between px-md-3">
              <a href={post.path}>{post.title}</a>
              <span className="dash flex-grow-1"></span>
              <time className="text-muted small text-nowrap">{post.date}</time>
            </li>
          ))}
      </ul>
    </Page>
  );
}

export default Category;
