import React from "react";
import Hero from "../components/Hero";
import BlogList from "../components/BlogList";
import {
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
function slugfiyType(type) {
  type = type.toLowerCase();
  type = type.replace(/ /g, "-");
  return type;
}
export default function BlogsPage() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const slug = pathname.split("/")[1];

  const { data, error } = useLoaderData();
  if (error || !data) {
    navigate("/error");
    return;
  }
  let { dashboard, links, allBlogs } = data;
  let blogTypes = allBlogs.map((blog) => blog.type);
  blogTypes = [...new Set(blogTypes)];

  if (slug)
    allBlogs = allBlogs.filter((blog) => slugfiyType(blog.type) === slug);

  return (
    <div className="BlogsPage">
      <Hero dashboard={dashboard} links={links} />
      <br />
      <br />
      <div className="Filter">
        <Link to={"/"} className="BlogsList-header link">
          All Blogs
        </Link>
        {blogTypes.map((type) => (
          <Link
            key={type}
            to={`/${slugfiyType(type)}`}
            className="BlogsList-header link"
          >
            {type}
          </Link>
        ))}
      </div>
      <BlogList blogs={allBlogs} />
    </div>
  );
}
