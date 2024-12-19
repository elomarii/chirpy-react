import { useState } from "react";
import Markdown from "react-markdown";

interface Props {
  path: string;
}

function MdRenderer({ path }: Props) {
  const [markdown, setMarkdown] = useState("");
  fetch(path)
    .then((response) => response.text())
    .then((text) => setMarkdown(text));
  return (
    <article>
      <Markdown>{markdown}</Markdown>
    </article>
  );
}

export default MdRenderer;
