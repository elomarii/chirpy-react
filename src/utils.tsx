import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yaml from "yaml";
import { set } from "./state/reducerToc";
import { RootState } from "./state/store";

export function readMarkdown(input: string): {
  frontMatter: Record<string, any>;
  content: string;
} {
  const frontMatterRegex = /^---\r\n([\s\S]*?)\r\n---/;
  const match = input.match(frontMatterRegex);

  if (!match) {
    return {
      frontMatter: {},
      content: input,
    };
  }
  const frontMatter = match[1];
  const content = input.slice(match[0].length).trim();

  let parsedFrontMatter: Record<string, any> = {};
  try {
    parsedFrontMatter = yaml.parse(frontMatter);
  } catch (error) {
    console.error("Error parsing front matter:", error);
  }

  return {
    frontMatter: parsedFrontMatter,
    content,
  };
}

export function listToString(list: string[]): string {
  if (list.length == 0) return "";
  let result: string = list[0];
  list.slice(1).map((element) => (result = `${result}, ${element}`));
  return result;
}

export function headerToId(header: string): string {
  return header.toString().toLowerCase().replace(/\./g, "").replace(/\s/g, "-");
}

export function resetToc() {
  // remove toc if its assigned from a previous post
  const dispatch = useDispatch();
  const toc = useSelector((state: RootState) => state.toc.headers);
  useEffect(() => {
    if (toc.length > 0) dispatch(set([]));
  });
}
