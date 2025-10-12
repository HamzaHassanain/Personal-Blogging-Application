// import jwt from "jsonwebtoken";
// import { AuthError, ServerError } from "../utils/ErrorResponse.mjs";
import Debug from "../utils/Debug.mjs";

// const User = require("../models/User")

const authorizeAdmin = async (req, res, next) => {
  // Debug.info(req.session);
  if (req.session.is_valid) next();
  else res.redirect("/admin/login");
};
export default authorizeAdmin;
