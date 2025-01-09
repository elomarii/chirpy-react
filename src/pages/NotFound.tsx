import AsciiArt from "../components/AsciiArt";

const four0four: string = `
██╗  ██╗ ██████╗ ██╗  ██╗
██║  ██║██╔═████╗██║  ██║
███████║██║██╔██║███████║
╚════██║████╔╝██║╚════██║
     ██║╚██████╔╝     ██║
     ╚═╝ ╚═════╝      ╚═╝
`;

export default function NotFound() {
  return (
    <>
      <AsciiArt art={four0four} />
      <h2>Oops, you've hit a dead end!</h2>
      <p>It looks like this page packed its bags and left.</p>
    </>
  );
}
