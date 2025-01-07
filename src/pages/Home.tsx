import { useState } from "react";
import BlogCard from "../components/BlogCard";
import Pagination from "../components/Pagination";
import AsciiArt from "../components/AsciiArt";
import { artBlog } from "../globals";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

export default function Home() {
  const posts = useSelector((state: RootState) => state.sitedata.posts);
  const [page, setPage] = useState(0);
  const postsCount: number = posts.length;
  const articlePerPage: number = 5;
  const pagesCount: number = Math.ceil(postsCount / articlePerPage);

  return (
    <>
      <div id="post-list" className="flex-grow-1 px-xl-1">
        {postsCount == 0 ? (
          <AsciiArt art={artBlog} />
        ) : (
          posts
            .slice(
              page * articlePerPage,
              Math.min((page + 1) * articlePerPage, postsCount)
            )
            .map((post, index) => (
              <BlogCard
                title={post.title}
                path={post.path.replace(".md", "")}
                description={post.description}
                categories={post.categories}
                date={post.date}
                image={post.image}
                key={index}
              />
            ))
        )}
      </div>
      <Pagination
        currentPage={page}
        pagesCount={pagesCount}
        setPage={setPage}
      />
    </>
  );
}
