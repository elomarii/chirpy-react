import { useState } from "react";
import { readMarkdown } from "../utils";
import Markdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface Props {
  path: string;
}

function Post({ path }: Props) {
  const [content, setContent] = useState("");
  const [frontMatter, setFrontMatter] = useState(Object);
  fetch(path)
    .then((response) => response.text())
    .then((text) => {
      const { frontMatter, content } = readMarkdown(text);
      setContent(content);
      setFrontMatter(frontMatter);
    });
  return (
    <article className="x-1">
      <header>
        <h1 data-doc-skip>{frontMatter.title}</h1>
        <p className="post-desc fw-light mb-4">{frontMatter.description}</p>
      </header>
      <div className="content">
        <Markdown
          components={{
            code: ({ className, children, ...props }) => {
              // custom data passed to code element is stored in the data attribute
              // example: ```c file="go.c" => data = 'file="go.c"'
              // const data = props.node?.data?.meta
              const match = /language-(\w+)/.exec(className || "");
              return props.node?.position?.start.line ===
                props.node?.position?.end.line ? (
                <code className={className} {...props}>
                  {children}
                </code>
              ) : (
                <SyntaxHighlighter
                  language={match ? match[1] : "language-txt"}
                  style={darcula}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              );
            },
          }}
        >
          {content}
        </Markdown>
      </div>
    </article>
  );
}

export default Post;
