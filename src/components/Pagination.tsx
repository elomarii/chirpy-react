import { Dispatch, SetStateAction } from "react";

interface Props {
  currentPage: number;
  pagesCount: number;
  setPage: Dispatch<SetStateAction<number>>;
}

function pagination({ currentPage, pagesCount, setPage }: Props) {
  return (
    <nav aria-label="Page Navigation">
      <ul
        className="pagination align-items-center mt-4 mb-0"
        style={{ display: pagesCount > 1 ? "" : "none" }}
      >
        <li className={currentPage == 0 ? "page-item disabled" : "page-item"}>
          <a
            className="page-link"
            aria-label="previous-page"
            href="#"
            onClick={() => setPage(currentPage - 1)}
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {Array.from({ length: pagesCount }, (_, i) => (
          <li className={currentPage == i ? "page-item active" : "page-item"}>
            <a className="page-link" href="#" onClick={() => setPage(i)}>
              {i + 1}
            </a>
          </li>
        ))}
        <li className="page-counter">{currentPage + 1 + "/" + pagesCount}</li>
        <li
          className={
            currentPage == pagesCount - 1 ? "page-item disabled" : "page-item"
          }
        >
          <a
            className="page-link"
            href="#"
            onClick={() => setPage(currentPage + 1)}
            aria-label="Next"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default pagination;
