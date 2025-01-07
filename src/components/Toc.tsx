import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { headerToId } from "../utils";

export default function Toc() {
  const tocHeaders = useSelector((state: RootState) => state.toc.headers);

  return (
    <section
      id="toc-wrapper"
      className={tocHeaders.length > 0 ? "ps-0 pe-4" : "d-none ps-0 pe-4"}
    >
      <h2 className="panel-heading ps-3 mb-2">Contents</h2>
      <nav id="toc">
        <ul className="toc-list">
          {tocHeaders.map((h, idx) => (
            <li className="toc-list-item" key={idx}>
              <a href={`#${headerToId(h)}`} className="toc-link node-name--H2">
                {h}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
