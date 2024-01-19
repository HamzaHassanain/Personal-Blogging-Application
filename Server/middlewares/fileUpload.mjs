import dotenv from "dotenv";

import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CLOUD_NAME, API_KEY, API_SECRET } from "../app/env.mjs";
// import { v4 as uuidv4 } from "uuid";
dotenv.config();

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "hamzahassanain.xyz",
    // format: async (req, file) => "png", // supports promises as well
    // public_id: (req, file) => uuidv4(),
  },
});

const parser = multer({ storage });
export default parser;
