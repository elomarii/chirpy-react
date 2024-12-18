interface Props {
  title: string;
  description: string;
  categories: string[];
  date: string;
}

// function BlogCard(props: Props) {
function BlogCard({ title, description, categories, date }: Props) {
  return (
    <>
      <div className="card">
        <div className="row">
          <div className="col-8">
            <div className="card-body">
              <h2>{title}</h2>
              <p className="card-text">{description}</p>
              <p className="card-text">{categories}</p>
              <p className="card-text">{date}</p>
            </div>
          </div>
          <div className="col" style={{ backgroundColor: "blue" }}>
            {/* <img
              src={reactLogo}
              className="card-img-top"
              alt="..."
            /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogCard;
