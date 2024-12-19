import { ReactNode } from "react";
import NavBar from "./components/NavBar";

interface Props {
  children: ReactNode;
}

function App({ children }: Props) {
  return (
    <>
      <div className="row">
        {/* NAVBAR */}
        <div className="col">
          <NavBar />
        </div>
        {/* BODY CONTENT */}
        <div className="col-8">{children}</div>
        {/* SIDEBAR */}
        <div className="col">
          <div className="sidebar">Column</div>
        </div>
      </div>
    </>
  );
}

export default App;
