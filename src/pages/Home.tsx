import { useState } from "react";
import BlogCard from "../components/BlogCard";
import Pagination from "../components/Pagination";
import { posts } from "../main";
import AsciiArt from "../components/AsciiArt";
import { artBlog } from "../globals";

export default function Home() {
  const [page, setPage] = useState(0);
  const postsCount: number = posts.length;
  const articlePerPage: number = 5;
  const pagesCount: number = Math.ceil(postsCount / articlePerPage);
  console.log(postsCount);

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
            .map((post) => {
              return (
                <BlogCard
                  title={post.title}
                  path={post.path.replace(".md", "")}
                  description={post.description}
                  categories={post.categories}
                  date={post.date}
                  image={post.image}
                />
              );
            })
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
