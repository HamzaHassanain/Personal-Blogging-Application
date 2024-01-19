import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

// const allBlogs = (_) => axios.get("/blogs/all");
const allBlogsOfType = (type) => axios.get(`/blogs/of-type/${type}`);
const allBlogs = () => axios.get(`/blogs/all`);
const singleBlog = (slug) => axios.get(`/blogs/single/${slug}`);

export async function rootLoader() {
  try {
    const data = await Promise.all([
      allBlogs(),
      allBlogsOfType("link"),
      allBlogsOfType("dashboard"),
    ]);
    const [allBlogsRes, linksRes, dashboardRes] = data;
    if (!dashboardRes) throw new Error("");
    const parsed = {
      allBlogs: allBlogsRes.data?.data,
      links: linksRes.data?.data,
      dashboard: dashboardRes?.data?.data ? dashboardRes?.data?.data[0] : {},
    };
    return { data: parsed, error: null };
  } catch (error) {
    error.additionalMessage = "an unexpected error happened";
    return { error, data: null };
  }
}
export async function singleBlogLoader(slug) {
  try {
    const res = await singleBlog(slug);
    const parsed = {
      single: res.data.data,
    };
    return { data: parsed, error: null };
  } catch (error) {
    error.additionalMessage = "an unexpected error happened";
    return { error, data: null };
  }
}
// export async function linksLoader() {
//   const links = await allBlogsOfType("link");
//   return { links };
// }
// export async function dashboardLoader() {
//   const hero = await allBlogsOfType("link"); // hero section is named dashboard on the backend
//   return { hero };
// }
// export async function singleBlogLoader() {
//   const hero = await singleBlog("dashboard"); // hero section is named dashboard on the backend
//   return { hero };
// }
