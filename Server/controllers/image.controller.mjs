import Debug from "../utils/Debug.mjs";
import Blog from "../models/blog.model.mjs";
import { types } from "../utils/consts.mjs";
import { v2 as cloudinary } from "cloudinary";
const MAIN_PAGE = "images";

export const getImagesPage = async (req, res, next) => {
  try {
    const data = await Blog.find({ type: types.image }).sort({
      createdAt: "desc",
    });
    res.render(MAIN_PAGE, { err: null, data });
  } catch (error) {
    error.page = MAIN_PAGE;
    next(error);
  }
};

export const handleUploadImage = async (req, res, next) => {
  try {
    const createdImage = new Blog({
      type: types.image,
      image: {
        url: req.file?.path,
        id: req.file?.filename,
      },
    });
    await createdImage.save();
    res.redirect("/admin/images/");
  } catch (error) {
    error.page = MAIN_PAGE;
    next(error);
  }
};

export const handleDeleteImage = async (req, res, next) => {
  const _id = req.params.id;
  try {
    const gotImage = await Blog.findById(_id);

    gotImage.image?.id &&
      (await cloudinary.uploader.destroy(gotImage.image.id));

    await gotImage.delete();
    res.redirect("/admin/images/");
  } catch (error) {
    error.page = MAIN_PAGE;
    next(error);
  }
};
