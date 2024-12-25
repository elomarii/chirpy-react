import { copyright, socials } from "../globals";

export default function Footer() {
  return (
    <div className="row">
      <div id="tail-wrapper" className="col-12 col-lg-11 col-xl-9 px-md-4">
        <footer
          aria-label="Site Info"
          className="
      d-flex flex-column justify-content-center text-muted
      flex-lg-row justify-content-lg-between align-items-lg-center pb-lg-3
      "
        >
          <p>
            © <time>{new Date().getFullYear()}</time>
            <em className="fst-normal"> {socials.name}. </em>
            <span
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title={copyright.verbose}
            >
              {copyright.brief}
            </span>
          </p>
          <p>
            Built with <a href="https://react.dev/">React</a> || Inspired by{" "}
            <a href="https://github.com/cotes2020/jekyll-theme-chirpy">
              Chirpy
            </a>{" "}
          </p>
        </footer>
      </div>
    </div>
  );
}
