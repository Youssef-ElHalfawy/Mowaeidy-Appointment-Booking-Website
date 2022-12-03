const adminModel = require("../models/admin");

// getting all admins in dashboard page
const getAlladmins = async (req, res) => {
	// try {
	const foundAdmins = await adminModel.find({}).select("-password");
	if (!foundAdmins) {
		res.json({ message: "there are no admins" });
	} else {
		res.json(foundAdmins);
	}
};

// getting one admin in dashboard page
const getOneAdmins = async (req, res) => {
	// try {
	const foundAdmins = await adminModel
		.findOne({ email: req.query.email })
		.select("-password");
	if (!foundAdmins) {
		res.json({ message: "there are no admins" });
	} else {
		res.json(foundAdmins);
	}
};

// adding an admin in dashboard page
const addAdmin = async (req, res) => {
	try {
		const newAdmin = new adminModel(req.body);
		const savedAdmin = await newAdmin.save();
		res.json({ message: "done", savedAdmin });
	} catch (err) {
		res.json({ message: "error" });
	}
};

// deleting an admin in dashboard page
const deleteAdmin = async (req, res) => {
	try {
		const updatedAdmin = await adminModel
			.findOneAndDelete({ _id: req.query.id })
			.exec();
		updatedAdmin
			? res.json({ message: "admin deleted" })
			: res.json({ message: "admin doesn't exist" });
	} catch (err) {
		res.json({ message: "error" });
	}
};

module.exports = {
	getAlladmins,
	getOneAdmins,
	addAdmin,
	deleteAdmin,
};