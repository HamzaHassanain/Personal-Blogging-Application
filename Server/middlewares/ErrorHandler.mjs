import Debug from "../utils/Debug.mjs";

export default (err, req, res, next) => {
  Debug.error(err);
  if (err?.page == "api") {
    return res.json(err);
  }
  if (!err.page) err.page = "404";
  res.render(err.page, { err, data: {} });
};
