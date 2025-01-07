import { useEffect, useState } from "react";
import { readMarkdown } from "../utils";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import NotFound from "./NotFound";
import PostHeader from "../components/PostHeader";
import CodeBlock from "../components/CodeBlock";

interface Props {
  showHeader?: boolean;
}

function Post({ showHeader = true }: Props) {
  const [content, setContent] = useState("");
  const [frontMatter, setFrontMatter] = useState(Object);
  const [loading, setLoading] = useState(true);
  const path = window.location.pathname;
  const paths = useSelector((state: RootState) => state.sitedata.paths);
  useEffect(() => {
    fetch(path + ".md")
      .then((response) => response.text())
      .then((text) => {
        const { frontMatter, content } = readMarkdown(text);
        setContent(content);
        setFrontMatter(frontMatter);
        setLoading(false);
        // dispatch(set(["hello", "hi"]));
      });
  }, []);

  return (
    <article className="x-1">
      {!loading ? (
        <>
          {!(paths.includes(path) || path === "/whoami") ? (
            <NotFound />
          ) : (
            <>
              <PostHeader
                frontmatter={frontMatter}
                readtime={Math.floor(content.split(" ").length / 180)}
                show={showHeader}
              />
              <Markdown
                className="content"
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  table: ({ children }) => (
                    <div className="table-wrapper">
                      <table>{children}</table>
                    </div>
                  ),
                  code: ({ node, className, children }) => (
                    <CodeBlock
                      name={className}
                      children={children}
                      inline={
                        node?.position?.start.line === node?.position?.end.line
                      }
                    />
                  ),
                }}
              >
                {content}
              </Markdown>
            </>
          )}
        </>
      ) : (
        <></>
      )}
    </article>
  );
}

export default Post;
