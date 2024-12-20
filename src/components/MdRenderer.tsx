import { useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { readMarkdown } from "../utils";
interface Props {
  path: string;
}

function MdRenderer({ path }: Props) {
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
    <article>
      <h1>{frontMatter.title}</h1>
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <SyntaxHighlighter language={match[1]} style={tomorrow}>
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </Markdown>
    </article>
  );
}

export default MdRenderer;
