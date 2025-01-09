import { ReactNode } from "react";

interface ArtProps {
  art: string;
}

export default function AsciiArt({ art }: ArtProps): ReactNode {
  return <pre className="ascii-art">{art}</pre>;
}
