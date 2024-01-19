import React from "react";
import { Link } from "react-router-dom";
// import pic from "../imgs/1672123640006.jpg";
export default function BlogItem({ blog }) {
  return (
    <div className="BlogItem">
      <div className="image">
        <img src={blog.image?.url} alt={blog.image?.id} />
      </div>
      <div className="text">
        <Link to={"/blogs/" + blog.slug} className="link">
          <h2> {blog.title}</h2>
        </Link>
        <div className="info">
          <span> {blog.publish_date}</span> <span className="sep">. </span>
          <span className="type">{blog.type?.toUpperCase()} </span>
        </div>
        <p>{blog.describtion}</p>
      </div>
    </div>
  );
}
