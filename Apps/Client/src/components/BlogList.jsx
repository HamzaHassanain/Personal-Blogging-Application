import React from "react";
import BlogItem from "./BlogItem";

export default function BlogList({ blogs }) {
  let i = 0;
  return (
    <div className="BlogList">
      {blogs?.map((blog) => (
        <BlogItem key={i++} blog={blog} />
      ))}
    </div>
  );
}
