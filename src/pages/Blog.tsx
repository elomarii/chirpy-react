import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Page from "./Page";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import AsciiArt from "../components/AsciiArt";
import { artBlog } from "../globals";
import { RootState } from "../state/store";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Blog() {
  const loading = useSelector((state: RootState) => state.sitedata.loading);
  const categories = useSelector(
    (state: RootState) => state.sitedata.categories
  );
  return loading ? (
    <></>
  ) : categories.length == 0 ? (
    <AsciiArt art={artBlog} />
  ) : (
    <Page title="Blog categories">
      {categories.map((listing, index) => (
        <div className="card categories" key={index}>
          <div
            id={`h_${index}`}
            className="card-header d-flex justify-content-between hide-border-bottom"
          >
            <span className="ms-2">
              <Link to={`/categories/${listing.parent}`} className="mx-2">
                <FontAwesomeIcon icon={faFolderOpen} />
                {` ${listing.parent}`}
              </Link>
            </span>
          </div>
          <div id={listing.parent} className="shadow">
            <ul className="list-group">
              {listing.children.map((subcat) => (
                <li className="list-group-item" key={subcat}>
                  <a href={`/categories/${subcat}`} className="mx-2">
                    {subcat}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </Page>
  );
}

export default Blog;
