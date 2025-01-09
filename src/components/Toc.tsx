import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { headerToId } from "../utils";
import { useState } from "react";

export default function Toc() {
  const tocHeaders = useSelector((state: RootState) => state.toc.headers);
  const [activeId, setActiveId] = useState("");

  // have issues selecting headers right after rendering of the page
  setTimeout(() => {
    const observer = new IntersectionObserver((entries) =>
      entries.reverse().forEach((e) => {
        if (e.isIntersecting) {
          setActiveId(e.target.id);
        }
      })
    );
    document
      .querySelectorAll(".content h2")
      .forEach((header) => observer.observe(header));
  }, 800);

  return tocHeaders.length > 0 ? (
    <section id="toc-wrapper" className="ps-0 pe-4">
      <h2 className="panel-heading ps-3 mb-2">Contents</h2>
      <nav id="toc">
        <ul className="toc-list">
          {tocHeaders.map((h, idx) => (
            <li className="toc-list-item" key={idx}>
              <a
                href={`#${headerToId(h)}`}
                className={`toc-link node-name--H2 ${
                  activeId == headerToId(h) ? "is-active-link" : ""
                }`}
              >
                {h}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  ) : (
    <></>
  );
}
