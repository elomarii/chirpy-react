import MdRenderer from "../components/MdRenderer";

interface Props {
  path: string;
}

function Post({ path }: Props) {
  return <MdRenderer path={path} />;
}

export default Post;
