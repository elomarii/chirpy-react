import { useState } from "react";
import BlogCard from "../components/BlogCard";
import Pagination from "../components/Pagination";
import { posts } from "../main";

export default function Home() {
  const [page, setPage] = useState(0);
  const postsCount = posts.length;
  const articlePerPage = 5;
  const pagesCount: number = Math.ceil(postsCount / articlePerPage);

  return (
    <>
      <div id="post-list" className="flex-grow-1 px-xl-1">
        {posts
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
          })}
      </div>
      <Pagination
        currentPage={page}
        pagesCount={pagesCount}
        setPage={setPage}
      />
    </>
  );
}
