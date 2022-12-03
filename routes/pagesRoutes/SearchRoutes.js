const express = require("express");
const {
	getAllIndustriesSearch,
} = require("../../controllers/IndustryControllers");
const {
	getAllOrganizersSearch,
} = require("../../controllers/OrganizerControllers");
const searchRouter = express.Router();



// // getting all industries in industries page
// searchRouter.get("/", getAllIndustriesSearch);

module.exports = searchRouter;
