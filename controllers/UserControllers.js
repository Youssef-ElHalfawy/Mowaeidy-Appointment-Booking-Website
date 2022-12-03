const AppointmentModel = require("../models/appointment");
const userModel = require("../models/user");

// getting one user (personal page & adminpanel)
const getOneUser = async (req, res) => {
	try {
		const foundUser = await userModel
			.findOne({ _id: req.query.id })
			.select("-password")
			.exec();
		if (!foundUser) {
			res.json({ message: "user doesn't exist" });
		} else {
			res.json(foundUser);
		}
	} catch (err) {
		res.json({ message: "error with one" });
	}
};

// editing a user
const editUser = async (req, res) => {
	try {
		const updatedUser = await userModel
			.findOneAndUpdate({ _id: req.query.id }, req.body)
			.exec();
		updatedUser
			? res.json({ message: "user updated" })
			: res.json({ message: "user doesn't exist" });
	} catch (err) {
		res.json({ message: "error" });
	}
};
// editing a user status
const editUserStatus = async (req, res) => {
	try {
		const { status } = req.body;
		const updatedUser = await userModel
			.findOneAndUpdate({ email: req.query.email }, { status })
			.exec();
		updatedUser
			? res.json({ message: "user updated" })
			: res.json({ message: "user doesn't exist" });
	} catch (err) {
		res.json({ message: "error" });
	}
};

// getting all users in admin page
const getAllUsers = async (req, res) => {
	try {
		const foundUsers = await userModel.find({}).select("-password");
		if (!foundUsers) {
			res.json({ message: "organizer doesn't exist" });
		} else {
			res.json(foundUsers);
		}
	} catch (err) {
		res.json({ message: "error" });
	}
};

// getting an appointment in user page
const getAllAppointmentUser = async (req, res) => {
	try {
		const foundAppointment = await AppointmentModel.find({
			madeByFK: req.query.id,
		})
			.select("-userFeedback -madeByFK -organiserFeedback")
			.populate({ path: "madeToFK", select: "orgName title contact" })
			.populate({ path: "industryIDFK", select: "name" })
			.exec();
		if (!foundAppointment) {
			res.json({ message: "appointment doesn't exist" });
		} else {
			res.json(foundAppointment);
		}
	} catch (err) {
		res.json({ message: "error", err });
	}
};

module.exports = {
	getOneUser,
	editUser,
	editUserStatus,
	getAllUsers,
	getAllAppointmentUser,
};
