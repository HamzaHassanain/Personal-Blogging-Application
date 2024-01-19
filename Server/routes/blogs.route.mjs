import { Router } from "express";

import {
  getblogsPage,
  getNewblogPage,
  getEditblogsPage,
  handleAddblog,
  handleEditblog,
  handlePublishblog,
  handleUnPublishblog,
  handleDeleteblog,
  handleBlogUploadImage,
} from "../controllers/blogs.controller.mjs";
import parser from "../middlewares/fileUpload.mjs";

const router = Router();

router.get("/", getblogsPage);
router.get("/new", getNewblogPage);
router.get("/edit/:id", getEditblogsPage);

router.post("/new", handleAddblog);
router.put("/edit/:id", handleEditblog);
router.post("/publish/:id", handlePublishblog);
router.post("/un-publish/:id", handleUnPublishblog);
router.delete("/delete/:id", handleDeleteblog);
router.post(
  "/upload/:id",
  parser.single("image-upload"),
  handleBlogUploadImage
);

export default router;
