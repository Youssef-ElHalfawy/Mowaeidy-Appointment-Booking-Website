const BlogsModel = require("../models/blogs");

// getting all blogs in home page and adminpanel
const getAllIBlogs = async (req, res) => {
		const foundBlogs = await BlogsModel.find({}).exec();
		if (!foundBlogs) {
			res.json({ message: "blogs not found" });
		} else {
			res.json(foundBlogs);
		}
};

// getting a blog in blogs page
const getOneBlog = async (req, res) => {
	try {
		const foundBlog = await BlogsModel.findOne({
			_id: req.query.id,
		}).exec();
		if (!foundBlog) {
			res.json({ message: "blog doesn't exist" });
		} else {
			res.json(foundBlog);
		}
	} catch (err) {
		res.json({ message: "error" });
	}
};

// adding a blog in admin panel page
const addBlog = async (req, res) => {
	try {
		const newBlog = new BlogsModel(req.body);
		const savedBlog = await newBlog.save();
		res.json({ message: "done", savedBlog });
	} catch (err) {
		res.json({ message: "error", err });
	}
};

// editing a blog in admin panel page
const editBlog = async (req, res) => {
	try {
		const updatedBlog = await BlogsModel.findOneAndUpdate(
			{ _id: req.query.id },
			req.body
		).exec();
		updatedBlog
			? res.json({ message: "blog updated" })
			: res.json({ message: "blog doesn't exist" });
	} catch (err) {
		res.json({ message: "error" });
	}
};

// deleting a blog in admin panel page
const deleteBlog = async (req, res) => {
	try {
		const deletedBlog = await BlogsModel.findOneAndDelete({
			_id: req.query.id,
		}).exec();
		deletedBlog
			? res.json({ message: "blog deleted" })
			: res.json({ message: "blog doesn't exist" });
	} catch (err) {
		res.json({ message: "error" });
	}
};

module.exports = {
	getAllIBlogs,
	getOneBlog,
	addBlog,
	editBlog,
	deleteBlog,
};
