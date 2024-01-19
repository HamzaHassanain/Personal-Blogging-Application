import { ORIGIN_ALLOWED, COOKIE_SECRET, COOKIE_EXP } from "./env.mjs";

export const corsOptions = {
  origin: ORIGIN_ALLOWED,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
export const sessionOptions = {
  secret: COOKIE_SECRET,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    sameSite: "strict",
    maxAge: COOKIE_EXP,
  },
  resave: false,
};
