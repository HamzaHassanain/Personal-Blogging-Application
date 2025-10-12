import { Router } from "express";

import {
  getDashboardPage,
  handleEditDashboard,
  handleDashboardUploadImage,
  handleCreateNewLink,
  handleDeleteLink,
} from "../controllers/dashboard.controller.mjs";
import parser from "../middlewares/fileUpload.mjs";
const router = Router();

router.get("/", getDashboardPage);
router.put("/edit", handleEditDashboard);
router.post("/upload", parser.single("image"), handleDashboardUploadImage);

router.post("/links/new", handleCreateNewLink);
router.delete("/links/delete/:id", handleDeleteLink);
export default router;
