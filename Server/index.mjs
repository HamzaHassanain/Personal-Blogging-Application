import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import methodOverride from "method-override";
import ErrorHandler from "./middlewares/ErrorHandler.mjs";
import adminRouter from "./routes/auth.route.mjs";
import authorizeAdmin from "./middlewares/authorizeAdmin.mjs";
import imagesRouter from "./routes/image.route.mjs";
import blogsRouter from "./routes/blogs.route.mjs";
import dashboardRouter from "./routes/dashboard.route.mjs";
import apiRouter from "./routes/api.route.mjs";
import start from "./app/start.mjs";
import Debug from "./utils/Debug.mjs";
import { ErrorResponse } from "./utils/ErrorResponse.mjs";
import { corsOptions, sessionOptions } from "./app/options.mjs";
dotenv.config();

if (process.env.DEV === "TRUE") Debug.enabled = true;
else Debug.enabled = false;

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionOptions));

// routers
app.use("/api/v1/", apiRouter);

app.use("/admin/blog/", authorizeAdmin, blogsRouter);
app.use("/admin/images/", authorizeAdmin, imagesRouter);
app.use("/admin/dashboard/", authorizeAdmin, dashboardRouter);
app.use("/admin/", adminRouter);

app.get("*", (req, res, next) => {
  res.render("404", { err: { message: "Page Not Found" } });
});

app.use(ErrorHandler);
start(app); // connect to database and start server
