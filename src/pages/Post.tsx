import { useEffect, useState } from "react";
import { headerToId, readMarkdown } from "../utils";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import NotFound from "./NotFound";
import PostHeader from "../components/PostHeader";
import CodeBlock from "../components/CodeBlock";
import { useDispatch } from "react-redux";
import { set } from "../state/reducerToc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";

interface Props {
  showHeader?: boolean;
}

function Post({ showHeader = true }: Props) {
  const [content, setContent] = useState("");
  const [frontMatter, setFrontMatter] = useState(Object);
  const [reading, setReading] = useState(true);
  const path = window.location.pathname;
  const dispatch = useDispatch();
  const paths = useSelector((state: RootState) => state.sitedata.paths);
  const loading = useSelector((state: RootState) => state.sitedata.loading);

  useEffect(() => {
    fetch(path + ".md")
      .then((response) => response.text())
      .then((text) => {
        const { frontMatter, content } = readMarkdown(text);
        setContent(content);
        setFrontMatter(frontMatter);
        setReading(false);
        const toc = Array.from(document.querySelectorAll(".content h2")).map(
          (h2) => h2.children.item(0)?.textContent
        );
        if (toc.length > 0 && showHeader) {
          dispatch(set(toc));
        }
      });
  }, [loading]);

  return (
    <article className="x-1">
      {!loading && !reading ? (
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
                  h2: ({ children }) => {
                    const id = headerToId(children?.toString() ?? "");
                    return (
                      <h2 id={id}>
                        <span>{children} </span>
                        <a href={`#${id}`} className="anchor text-muted">
                          <FontAwesomeIcon icon={faHashtag} />
                        </a>
                      </h2>
                    );
                  },
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
