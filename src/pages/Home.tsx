import { useState } from "react";
import BlogCard from "../components/BlogCard";
import Pagination from "../components/Pagination";
import AsciiArt from "../components/AsciiArt";
import { artBlog } from "../utils/ascii";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { resetToc } from "../utils/utils";

export default function Home() {
  const posts = useSelector((state: RootState) => state.sitedata.posts);
  const loading = useSelector((state: RootState) => state.sitedata.loading);
  const [page, setPage] = useState(0);
  const postsCount: number = posts.length;
  const articlePerPage: number = 5;
  const pagesCount: number = Math.ceil(postsCount / articlePerPage);
  resetToc();

  return loading ? (
    <></>
  ) : (
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
