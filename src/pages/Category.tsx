import Page from "./Page";
import { articles } from "../main";

interface Props {
  name: string;
}

function Category({ name }: Props) {
  return (
    <Page title={name}>
      <ul className="content ps-0">
        {articles
          .filter((article) => article.categories.includes(name))
          .map((article) => (
            <li className="d-flex justify-content-between px-md-3">
              <a href={article.path}>{article.title}</a>
              <span className="dash flex-grow-1"></span>
              <time className="text-muted small text-nowrap">
                {article.date}
              </time>
            </li>
          ))}
      </ul>
    </Page>
  );
}

export default Category;
