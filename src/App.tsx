import BlogCard from "./components/BlogCard";
import NavBar from "./components/NavBar";

function App() {
  var posts: Record<string, Function> = import.meta.glob("./blog/posts/*");

  return (
    <>
      <div className="container text-center">
        <div className="row">
          {/* NAVBAR */}
          <NavBar />
          {/* BODY CONTENT */}
          <div className="content">
            {Object.keys(posts).length == 0
              ? "Nothing to show.. yet!"
              : "Content here"}
          </div>
          <BlogCard
            title="Hello"
            description="hello again"
            categories={["DFIR", "Web"]}
            date="2024-11-05"
          />
          {/* SIDEBAR */}
          <div className="sidebar">Column</div>
        </div>
      </div>
    </>
  );
}

export default App;
