import { site } from "../globals";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { hide, show } from "../state/reducerNavbar";

function TopBar() {
  const navbarVisiblity = useSelector((state: RootState) => state.navbar.show);
  const dispatch = useDispatch();
  const baseTitle = site.name + "@blog:~";

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
          onClick={() =>
            navbarVisiblity ? dispatch(hide()) : dispatch(show())
          }
          className="btn btn-link"
        >
          <FontAwesomeIcon icon={faBars} color="gray" />
        </button>

        <div id="topbar-title">{getTitle()}</div>
        <FontAwesomeIcon icon={faBars} color="transparent" />
      </div>
    </header>
  );
}

export default TopBar;
