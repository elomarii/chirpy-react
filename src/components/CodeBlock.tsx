import {
  faTerminal,
  faCode,
  faFileCode,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface Props {
  name?: string;
  inline: boolean;
  children: ReactNode;
}

export default function CodeBlock({ name, inline, children }: Props) {
  const lista = name?.split(",") ?? [];
  const title = lista.length === 1 ? "Code" : lista.length > 1 ? lista[1] : "";
  return inline ? (
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
}
