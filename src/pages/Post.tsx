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
import { useParams } from "react-router-dom";

interface Props {
  showHeader?: boolean;
}

function Post({ showHeader = true }: Props) {
  const [content, setContent] = useState("");
  const [frontMatter, setFrontMatter] = useState(Object);
  const [loading, setLoading] = useState(true);
  const { type, file } = useParams();

  useEffect(() => {
    fetch(`/${type}/${file}.md`)
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
              lista.length === 1 ? "Code" : lista.length > 1 ? lista[1] : "";
            return node?.position?.start.line === node?.position?.end.line ? (
              <code className="inline-code">{children}</code>
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
                  showLineNumbers={title === "" ? false : true}
                  codeTagProps={{ className: "code-block" }}
                  customStyle={{
                    borderRadius: "0 0 10px 10px",
                    backgroundColor: "var(--mask-bg)",
                  }}
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
