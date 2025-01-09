import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import Page from "./Page";
import { Link, useParams } from "react-router-dom";
import AsciiArt from "../components/AsciiArt";
import { artNothing } from "../globals";
import { resetToc } from "../utils";

function Category() {
  const posts = useSelector((state: RootState) => state.sitedata.posts);
  const projects = useSelector((state: RootState) => state.sitedata.projects);
  const loading = useSelector((state: RootState) => state.sitedata.loading);
  const name: string = useParams().name!;
  const relevantPosts = posts
    .concat(projects)
    .filter((article) => article.categories.includes(name));
  resetToc();

  return loading ? (
    <></>
  ) : (
    <Page title={name}>
      <ul className="content ps-0">
        {relevantPosts.length == 0 ? (
          <AsciiArt art={artNothing} />
        ) : (
          relevantPosts.map((post, index) => (
            <li className="d-flex justify-content-between px-md-3" key={index}>
              <Link to={post.path}>{post.title}</Link>
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
