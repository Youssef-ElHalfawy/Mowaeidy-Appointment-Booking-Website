const WebInfoModel = require("../models/info");

// getting all info in Admin page
const getAllInfo = async (req, res) => {
	const foundInfo = await WebInfoModel.find({}).exec();
	if (!foundInfo) {
		res.json({ message: "info doesn't exist" });
	} else {
		res.json(foundInfo);
	}
};

// editing about in adminpanel page
const editInfo = async (req, res) => {
	try {
		const updatedInfo = await WebInfoModel.findOneAndUpdate(
			{ _id: req.query.id },
			req.body
		).exec();
		updatedInfo
			? res.json({ message: "data updated" })
			: res.json({ message: "data doesn't exist" });
	} catch (err) {
		res.json({ message: "error" });
	}
};

// adding info
//expermental
const addInfo = async (req, res) => {
	try {
		const newInfo = new WebInfoModel(req.body);
		const savedInfo = await newInfo.save();
		res.json({ message: "done", savedInfo });
	} catch (err) {
		res.json({ message: "error", err });
	}
};
module.exports = {
	getAllInfo,
	editInfo,
	addInfo,
};
