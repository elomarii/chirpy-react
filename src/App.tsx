import { ReactNode } from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

interface Props {
  children: ReactNode;
}

function App({ children }: Props) {
  return (
    <>
      {/* NAVBAR */}
      <NavBar />
      <div id="main-wrapper" className="d-flex justify-content-center">
        <div className="container d-flex flex-column px-xxl-5">
          {/* MAIN CONTENT */}
          <main
            aria-label="Main Content"
            className="col-12 col-lg-11 col-xl-9 px-md-4"
          >
            {children}
          </main>

          {/* SIDEBAR */}
          <aside
            aria-label="Panel"
            id="panel-wrapper"
            className="col-xl-3 ps-2 mb-5 text-muted"
          >
            <div className="access">
              {/* {% include_cached update-list.html lang=lang %}
              {% include_cached trending-tags.html lang=lang %} */}
            </div>
          </aside>

          {/* FOOTER */}
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
