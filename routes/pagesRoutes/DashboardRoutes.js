const express = require("express");
const {
	addAdmin,
	getAlladmins,
	deleteAdmin,
	getOneAdmins,
} = require("../../controllers/AdminControllers");
const {
	getAllIBlogs,
	addBlog,
	editBlog,
	deleteBlog,
	getOneBlog,
} = require("../../controllers/BlogControllers");
const {
	getAllIndustriesDashboard,
	addIndustry,
	editIndustry,
	deleteIndustry,
	getOneIndustry,
} = require("../../controllers/IndustryControllers");
const {
	getAllInfo,
	editInfo,
	addInfo,
} = require("../../controllers/InfoControllers");
const {
	editUserStatus,
	getAllUsers,
	getOneUser,
} = require("../../controllers/UserControllers");
const dashboardRouter = express.Router();

// editing a user status
dashboardRouter.get("/users/edit", getOneUser);
dashboardRouter.put("/users/edit", editUserStatus);

// getting all users
dashboardRouter.get("/users", getAllUsers);

// getting all industries
dashboardRouter.get("/industries", getAllIndustriesDashboard);

// adding an industry
dashboardRouter.post("/industries/add", addIndustry);

// editing an industry
dashboardRouter.get("/industries/edit", getOneIndustry);
dashboardRouter.put("/industries/edit", editIndustry);

// delete an industry
dashboardRouter.delete("/industries/delete", deleteIndustry);

// getting all admins
dashboardRouter.get("/admins", getAlladmins);

// getting an admin
dashboardRouter.get("/admins/one", getOneAdmins);

// adding an admin
dashboardRouter.post("/admins/add", addAdmin);

// delete an admin
dashboardRouter.delete("/admins/delete", deleteAdmin);

// adding Info
//expermental
dashboardRouter.post("/info/add", addInfo);
// getting all info
dashboardRouter.get("/info", getAllInfo);

// editing info
dashboardRouter.put("/info/edit", editInfo);

// getting all blogs
dashboardRouter.get("/blogs", getAllIBlogs);

// adding a blog
dashboardRouter.post("/blogs/add", addBlog);

// editing a blog
dashboardRouter.get("/blogs/edit", getOneBlog);
dashboardRouter.patch("/blogs/edit", editBlog);

// delete a blog
dashboardRouter.delete("/blogs/delete", deleteBlog);

module.exports = dashboardRouter;
