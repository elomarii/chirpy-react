function NavBar() {
  const path = window.location.pathname;
  const tabs: string[] = ["blog", "projects", "whoami"];

  return (
    <div className="navbar">
      <nav className="nav flex-column nav-tabs">
        <a className="nav-link" aria-current="page" key="home" href="/">
          home
        </a>
        {tabs.map((tab, index) => {
          return (
            <a
              className={path == `/${tab}` ? "nav-link active" : "nav-link"}
              aria-current="page"
              key={index}
              href={`/${tab}`}
            >
              {tab}
            </a>
          );
        })}
      </nav>
    </div>
  );
}

export default NavBar;
