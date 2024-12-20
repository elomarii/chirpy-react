import { Dispatch, SetStateAction } from "react";

interface Props {
  currentPage: number;
  pagesCount: number;
  setPage: Dispatch<SetStateAction<number>>;
}

function pagination({ currentPage, pagesCount, setPage }: Props) {
  return (
    <ul
      className="pagination justify-content-center"
      style={{ display: pagesCount > 1 ? "" : "none" }}
    >
      <li className="page-item">
        <a
          className={currentPage == 0 ? "page-link disabled" : "page-link"}
          href="#"
          onClick={() => setPage(currentPage - 1)}
          aria-label="Previous"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      {Array.from({ length: pagesCount }, (_, i) => (
        <li className="page-item">
          <a className="page-link" href="#" onClick={() => setPage(i)}>
            {i + 1}
          </a>
        </li>
      ))}
      <li className="page-item">
        <a
          className={
            currentPage == pagesCount - 1 ? "page-link disabled" : "page-link"
          }
          href="#"
          onClick={() => setPage(currentPage + 1)}
          aria-label="Next"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  );
}

export default pagination;
