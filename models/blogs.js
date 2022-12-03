const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
		blogHeader: { type: String },
		blogBody: { type: String },
		blogPicture: { type: String },
		blogDate: { type: Date },
});

const BlogsModel = mongoose.model("blogs", blogSchema);

module.exports = BlogsModel;
