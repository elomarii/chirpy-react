import { categories } from "../main";

function Blog() {
  // get all root categories
  return (
    <ul>
      {Array.from(categories?.keys() ?? []).map((key, index) => (
        <li key={`cat-${index}`}>
          <a href={`categories/${key}`}>{key}</a>
          <ul>
            {[...(categories?.get(key) ?? [])].map((cat) => (
              <li key={"subcat-" + cat}>
                <a href={`categories/${cat}`}>{cat}</a>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default Blog;
