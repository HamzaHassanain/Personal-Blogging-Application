import { Router } from "express";

import {
  handleUploadImage,
  getImagesPage,
  handleDeleteImage,
} from "../controllers/image.controller.mjs";
import parser from "../middlewares/fileUpload.mjs";

const router = Router();

router.get("/", getImagesPage);

router.post("/upload/", parser.single("image"), handleUploadImage);
router.delete("/delete/:id", handleDeleteImage);

export default router;
