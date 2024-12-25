import { ReactNode } from "react";

interface PageProps {
  title: string;
  children: ReactNode;
}

export default function Page({ title, children }: PageProps) {
  return (
    <article className="px-1">
      <h1 className="dynamic-title">{title}</h1>
      <div className="content">{children}</div>
    </article>
  );
}
