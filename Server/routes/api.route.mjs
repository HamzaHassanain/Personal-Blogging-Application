import { Router } from "express";

import {
  getAllBlogs,
  getSingleBlog,
  getOfType,
} from "../controllers/api.controller.mjs";

const router = Router();

router.get("/blogs/all", getAllBlogs);
router.get("/blogs/single/:slug", getSingleBlog);
router.get("/blogs/of-type/:type", getOfType);

export default router;
