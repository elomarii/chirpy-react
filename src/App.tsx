import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import TopBar from "./components/Topbar";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { useDispatch } from "react-redux";
import { loadAsync } from "./state/reducerSitedata";
import { AppDispatch } from "./state/store";
import { useSelector } from "react-redux";
import { RootState } from "./state/store";
import Toc from "./components/Toc";

function App() {
  const sitedata = useSelector((state: RootState) => state.sitedata.paths);
  if (sitedata.length === 0) {
    const dispatch = useDispatch<AppDispatch>();
    dispatch(loadAsync());
  }
  return (
    <>
      {/* NAVBAR */}
      <NavBar />
      <div id="main-wrapper" className="d-flex justify-content-center">
        <div className="container d-flex flex-column px-xxl-5">
          <TopBar />
          <div className="row flex-grow-1">
            {/* MAIN CONTENT */}
            <main
              aria-label="Main Content"
              className="col-12 col-lg-11 col-xl-9 px-md-4"
            >
              <RouterProvider router={router} />
            </main>

            {/* SIDEBAR */}
            <aside
              aria-label="Panel"
              id="panel-wrapper"
              className="col-xl-3 ps-2 mb-5 text-muted"
            >
              <div className="access">
                <Toc />
                {/* {% include_cached update-list.html lang=lang %}
              {% include_cached trending-tags.html lang=lang %} */}
              </div>
            </aside>
          </div>

          {/* FOOTER */}
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
