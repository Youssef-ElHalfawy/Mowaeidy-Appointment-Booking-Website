const express = require("express");
const { getAllIBlogs } = require("../../controllers/BlogControllers");

const blogRouter = express.Router();

// getting all blogs
blogRouter.get("/", getAllIBlogs);

module.exports = blogRouter;
