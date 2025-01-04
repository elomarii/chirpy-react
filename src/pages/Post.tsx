import { useEffect, useState } from "react";
import { readMarkdown } from "../utils";
import Markdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faFileCode,
  faTerminal,
} from "@fortawesome/free-solid-svg-icons";

interface Props {
  path: string;
  showHeader?: boolean;
}

function Post({ path, showHeader = true }: Props) {
  const [content, setContent] = useState("");
  const [frontMatter, setFrontMatter] = useState(Object);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(path)
      .then((response) => response.text())
      .then((text) => {
        const { frontMatter, content } = readMarkdown(text);
        setContent(content);
        setFrontMatter(frontMatter);
        setLoading(false);
      });
  }, []);

  return (
    <article className="x-1">
      {showHeader && !loading ? (
        <>
          <header>
            <h1 data-doc-skip>{frontMatter.title}</h1>
            <p className="post-desc fw-light mb-4">{frontMatter.description}</p>
            <div className="post-meta text-muted">
              <div className="d-flex justify-content-between">
                <span>
                  Posted on
                  <em> {new Date(frontMatter.date).toDateString()}</em>
                </span>
                <div>
                  <span
                    className="readtime"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title={content.split(" ").length.toString()}
                  >
                    <em>
                      {Math.max(Math.floor(content.split(" ").length / 180), 1)}{" "}
                      min{" "}
                    </em>
                    read
                  </span>
                </div>
              </div>
            </div>
          </header>
          <hr />
          {frontMatter.banner ? (
            <img
              className="post-banner"
              title="banner"
              alt="banner"
              src={frontMatter.banner}
            />
          ) : (
            <></>
          )}
          <hr />
        </>
      ) : (
        <></>
      )}
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
          code: ({ node, className, children }) => {
            const lista = className?.split(",") ?? [];
            const title =
              lista.length === 1
                ? "Code"
                : lista.length > 1
                ? lista[1]
                : "Terminal";
            return node?.position?.start.line === node?.position?.end.line ? (
              <code className={className}>{children}</code>
            ) : (
              <div>
                <div className="code-header">
                  <div className="buttons" />
                  <FontAwesomeIcon
                    icon={
                      lista.length === 0
                        ? faTerminal
                        : lista.length === 1
                        ? faCode
                        : faFileCode
                    }
                  />
                  {title}
                </div>
                <SyntaxHighlighter
                  language={lista[0]}
                  style={atomOneDark}
                  showLineNumbers={title === "Terminal" ? false : true}
                  codeTagProps={{ className: "code-block" }}
                  customStyle={{ borderRadius: "0 0 6px 6px" }}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              </div>
            );
          },
        }}
      >
        {content}
      </Markdown>
    </article>
  );
}

export default Post;
