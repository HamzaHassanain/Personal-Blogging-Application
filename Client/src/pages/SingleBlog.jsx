import { useEffect, useState } from "react";
import { singleBlogLoader } from "../loaders";
import { useNavigate, useParams } from "react-router-dom";
export default function SingleBlog() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState();
  const [itemError, setError] = useState();
  useEffect(() => {
    async function load() {
      const { data, error } = await singleBlogLoader(slug);
      if (error) setError(error);
      else setItem(data.single);
    }
    load();
  }, [slug]);
  console.error(itemError);
  if (itemError) {
    navigate("/error");
  }
  console.log(item);
  return (
    <>
      <div className="SingleBlog">
        <div dangerouslySetInnerHTML={{ __html: item?.parsed }} />
      </div>
    </>
  );
}
