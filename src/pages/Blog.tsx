import { categories } from "../main";
import Page from "./Page";

function Blog() {
  // get all root categories
  return (
    <Page title="Blog categories">
      {Array.from(categories?.keys() ?? []).map((key, index) => (
        <div className="card categories">
          <div
            id={`h_${index}`}
            className="card-header d-flex justify-content-between hide-border-bottom"
          >
            <span className="ms-2">
              <a href={`/${key}`} className="mx-2">
                {key}
              </a>
            </span>
          </div>
          <div id={key} className="shadow">
            <ul className="list-group">
              {[...categories?.get(key)].map((subcat) => (
                <li className="list-group-item">
                  <a href={`categories/${subcat}`} className="mx-2">
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
