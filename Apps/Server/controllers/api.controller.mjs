import Debug from "../utils/Debug.mjs";
import Blog from "../models/blog.model.mjs";
import { SuccessResponse } from "../utils/successResponse.mjs";
import {
  AuthError,
  ErrorResponse,
  NotFoundError,
} from "../utils/ErrorResponse.mjs";
import { Status, types } from "../utils/consts.mjs";

export const getAllBlogs = async (req, res, next) => {
  // console.log("getAllBlogs");
  try {
    // get all blogs except dashboard, image and link
    const blogs = await Blog.find(
      {
        type: { $nin: [types.dashboard, types.image, types.link] },
        published: Status.published,
      },
      { parsed: 0, body: 0 }
    ).sort({ createdAt: "desc" });

    res.json(new SuccessResponse(blogs));
  } catch (err) {
    Debug.error(err);
    err.page = "api";
    next(err);
  }
};

export const getSingleBlog = async (req, res, next) => {
  const slug = req.params.slug;
  try {
    if (!slug) throw new ErrorResponse("No slug found");
    const blog = await Blog.findOne(
      { slug, published: Status.published },
      { body: 0 }
    );
    if (!blog) throw new NotFoundError(`No blog with this slug ${slug}`);
    res.json(new SuccessResponse(blog));
  } catch (err) {
    Debug.error(err);
    err.page = "api";
    next(err);
  }
};
export const getOfType = async (req, res, next) => {
  const type = req.params.type;
  try {
    if (!type) throw new ErrorResponse("No type found");
    const blogs = await Blog.find(
      { type, published: Status.published },
      { parsed: 0 }
    );
    Debug.info(blogs);
    res.json(new SuccessResponse(blogs));
  } catch (err) {
    Debug.error(err);
    err.page = "api";
    next(err);
  }
};
