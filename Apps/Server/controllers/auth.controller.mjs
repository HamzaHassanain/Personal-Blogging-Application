import Debug from "../utils/Debug.mjs";
import { AuthError } from "../utils/ErrorResponse.mjs";
import { admin_name, admin_password } from "../app/env.mjs";

const PAGE = "login";
export const getLoginController = async (req, res, next) => {
  try {
    return res.render(PAGE, { err: null });
  } catch (error) {
    error.page = PAGE;
    next(error);
  }
};
export const postLoginController = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (username !== admin_name || password !== admin_password)
      throw new AuthError("Admin name or password are false");

    req.session.regenerate((err) => {
      if (err) throw err;
      req.session.is_valid = "true";
      req.session.save((err) => {
        if (err) throw err;
        res.redirect("/admin/dashboard");
      });
    });
  } catch (error) {
    error.page = PAGE;
    next(error);
  }
};
