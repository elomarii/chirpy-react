function NavBar() {
  const tabsPath: string = "/public/blog/tabs/";
  const tabs: Record<string, Function> = import.meta.glob(
    "/public/blog/tabs/*"
  );
  const path = window.location.pathname;

  return (
    <div className="navbar">
      <nav className="nav flex-column nav-tabs">
        <a className="nav-link" aria-current="page" key="home" href="/">
          home
        </a>
        {Object.keys(tabs).map((filePath, index) => {
          const tabname: string = filePath
            .replace(`${tabsPath}`, "")
            .replace(".md", "")
            .toLowerCase();
          return (
            <a
              className={path == `/${tabname}` ? "nav-link active" : "nav-link"}
              aria-current="page"
              key={index}
              href={`/${tabname}`}
            >
              {tabname}
            </a>
          );
        })}
      </nav>
    </div>
  );
}

export default NavBar;
