import { Schema, model } from "mongoose";
import { Status } from "../utils/consts.mjs";
import slugify from "slugify";

// import Debug from "../utils/Debug.mjs";

const blogSchema = new Schema({
  title: String,
  publish_date: String,
  describtion: String,
  body: String,
  parsed: String,
  slug: String,
  image: {
    id: String,
    url: String,
  },
  tags: [String],
  type: {
    // you can call it category
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: Status.NotPublished,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
blogSchema.pre("save", function () {
  if (this.title) {
    this.slug = slugify(this.title);
  }
});
export default model("Blog", blogSchema);
