import { ReactNode } from "react";

interface ArtProps {
  art: string;
}

export default function AsciiArt({ art }: ArtProps): ReactNode {
  const style: React.CSSProperties = {
    font: "0.8em Inconsolata, monospace",
    lineHeight: "1.15em",
    marginTop: "2em",
    overflow: "clip",
  };

  return <pre style={style}>{art}</pre>;
}
