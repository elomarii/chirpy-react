import { useState } from "react";
import { site } from "../globals";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faGlobe } from "@fortawesome/free-solid-svg-icons";

function TopBar() {
  const [navbarState, setNavbarState] = useState(false);
  const baseTitle = site.name + "@blog:~";

  const navbarHandler = () => {
    if (navbarState) {
      document.body.setAttribute("sidebar-display", "");
    } else {
      document.body.removeAttribute("sidebar-display");
    }
    setNavbarState(!navbarState);
  };

  const getTitle = () => {
    const location: string = document.location.pathname;
    if (location == "/" || location == "whoami") {
      return baseTitle + location.replace("/", "") + "#";
    } else {
      return baseTitle + location + "#";
    }
  };

  return (
    <header id="topbar-wrapper" aria-label="Top Bar">
      <div
        id="topbar"
        className="d-flex align-items-center justify-content-between px-lg-3 h-100 "
      >
        <nav id="breadcrumb" aria-label="Breadcrumb">
          {getTitle()}
        </nav>

        <button
          type="button"
          id="sidebar-trigger"
          onClick={navbarHandler}
          className="btn btn-link"
        >
          <FontAwesomeIcon icon={faBars} color="gray" />
        </button>

        <div id="topbar-title">{getTitle()}</div>
        <FontAwesomeIcon icon={faGlobe} color="gray" />
      </div>
    </header>
  );
}

export default TopBar;
