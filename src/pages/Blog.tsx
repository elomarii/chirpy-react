import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { categories } from "../main";
import Page from "./Page";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import AsciiArt from "../components/AsciiArt";
import { artBlog } from "../globals";

function Blog() {
  const cats: string[] = Array.from(categories?.keys() ?? []);
  return cats.length == 0 ? (
    <AsciiArt art={artBlog} />
  ) : (
    <Page title="Blog categories">
      {cats.map((key, index) => (
        <div className="card categories">
          <div
            id={`h_${index}`}
            className="card-header d-flex justify-content-between hide-border-bottom"
          >
            <span className="ms-2">
              <a
                href={`/categories/${key.replace(" ", "-").toLowerCase()}`}
                className="mx-2"
              >
                <FontAwesomeIcon icon={faFolderOpen} />
                {` ${key}`}
              </a>
            </span>
          </div>
          <div id={key} className="shadow">
            <ul className="list-group">
              {[...categories?.get(key)].map((subcat) => (
                <li className="list-group-item">
                  <a
                    href={`/categories/${subcat
                      .replace(" ", "-")
                      .toLowerCase()}`}
                    className="mx-2"
                  >
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
