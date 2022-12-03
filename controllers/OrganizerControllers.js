const organzierModel = require("../models/organizer");
const appointmentModel = require("../models/appointment");
const userModel = require("../models/user");
const sendEmail = require("../services/email.service");

// getting one organizer (personal page)
const getOneOrganizer = async (req, res) => {
	try {
		const foundOrganizer = await organzierModel
			.findOne({ userIDFK: req.query.id })
			.populate({ path: "userIDFK" })
			.populate({ path: "industryIDFK" })
			.exec();
		if (!foundOrganizer) {
			res.json({ message: "organizer doesn't exist" });
		} else {
			res.json(foundOrganizer);
		}
	} catch (err) {
		res.json({ message: "error with one" });
	}
};

// getting one organizer(view page)
const getOneOrganizerToView = async (req, res) => {
	try {
		const foundOrganizer = await organzierModel
			.findOne({ _id: req.query.id })
			.select("-contact -numbOfAppointments -totalPaidMoney")
			.populate({ path: "userIDFK", select: "email profilePicture" })
			.populate({ path: "industryIDFK", select: "name canclationTime" });
		if (!foundOrganizer) {
			res.json({ message: "organizer doesn't exist" });
		} else {
			res.json(foundOrganizer);
		}
	} catch (err) {
		res.json({ message: "error with one" });
	}
};

// editing an organizer
const editOrganizer = async (req, res) => {
	try {
		const updatedOrganizer = await organzierModel
			.findOneAndUpdate({ _id: req.query.id }, req.body)
			.exec();
		updatedOrganizer
			? res.json({ message: "user updated" })
			: res.json({ message: "organizer doesn't exist" });
	} catch (err) {
		res.json({ message: "error" });
	}
};

// getting all organizer in search page
const getAllOrganizersSearch = async (req, res) => {
	// try {
	const foundOrganizer = await organzierModel
		.find({})
		.select("orgName title rating description rate numbOfAppointments")
		.populate({ path: "industryIDFK", select: "name" })
		.populate({ path: "userIDFK", select: "profilePicture" });
	if (!foundOrganizer) {
		res.json({ message: "organizer doesn't exist" });
	} else {
		res.json(foundOrganizer);
	}
};

// adding an appointment
const addAppointmentOrganizer = async (req, res) => {
	try {
		const newAppointment = new appointmentModel(req.body);
		const savedAppointment = await newAppointment.save();

		const fromUser = await userModel
			.findOne({ _id: savedAppointment.madeByFK })
			.select("firstName lastName")
			.exec();
		const toOrg = await organzierModel
			.findOne({ _id: savedAppointment.madeToFK })
			.select("contact")
			.exec();
		const emailMessage = `<div style='background-color:#2e5077;padding:25px;color:white;'>
			<h3><span style='color:#ffa630;'>${fromUser.firstName} ${fromUser.lastName}</span> has booked an appointment with you at <span style='color:#ffa630;'>${savedAppointment.appStartDateTime}.</span></h3>
		</div>`;
		sendEmail(toOrg?.contact?.orgEmail, emailMessage);

		res.json({ message: "done", savedAppointment });
	} catch (err) {
		res.json({ message: "error", err });
	}
};

// editing an appointment status
const editAppointmentStatus = async (req, res) => {
	try {
		const { status } = req.body;
		const updatedAppointment = await appointmentModel
			.findOneAndUpdate({ _id: req.query.id }, { status })
			.exec();
		if (updatedAppointment) {
			const fromOrg = await organzierModel
				.findOne({ _id: updatedAppointment.madeToFK })
				.select("orgName contact")
				.exec();
			const toUser = await userModel
				.findOne({ _id: updatedAppointment.madeByFK })
				.select("email")
				.exec();
			const emailMessage = `<div style='background-color:#2e5077;padding:25px;color:white;'>
				<h3><span style='color:#ffa630;'>${fromOrg.orgName}</span> has confirmed your appointment at <span style='color:#ffa630;'>${updatedAppointment.appStartDateTime}.</span></h3>
			</div>`;
			sendEmail(toUser.email, emailMessage);

			res.json({ message: "appointment updated" });
		} else {
			res.json({ message: "appointment doesn't exist" });
		}
	} catch (err) {
		res.json({ message: "error" });
	}
};

// getting all appointment in organizer page
const getAllAppointmentOrganizer = async (req, res) => {
	try {
		const foundAppointment = await appointmentModel
			.find({ madeToFK: req.query.id })
			.select("-userFeedback -madeToFK -organiserFeedback")
			.populate({
				path: "madeByFK",
				select: "firstName lastName phone email city",
			})
			.populate({ path: "industryIDFK", select: "name" })
			.exec();
		if (!foundAppointment) {
			res.json({ message: "appointments doesn't exist" });
		} else {
			res.json(foundAppointment);
		}
	} catch (err) {
		res.json({ message: "error", err });
	}
};
// getting all appointment in organizer view page
const getAllAppointmentOrganizerView = async (req, res) => {
	try {
		const foundAppointment = await appointmentModel
			.find({ madeToFK: req.query.id })
			.select("appStartDateTime appEndDateTime appID")
			.exec();
		if (!foundAppointment) {
			res.json({ message: "appointments doesn't exist" });
		} else {
			res.json(foundAppointment);
		}
	} catch (err) {
		res.json({ message: "error" });
	}
};
// getting all organizer
// expermental
const getAllOrganizers = async (req, res) => {
	try {
		const foundOrganizer = await organzierModel.find();
		if (!foundOrganizer) {
			res.json({ message: "organizer doesn't exist" });
		} else {
			res.json(foundOrganizer);
		}
	} catch (err) {
		res.json({ message: "error" });
	}
};

module.exports = {
	getOneOrganizer,
	getAllOrganizers,
	editOrganizer,
	addAppointmentOrganizer,
	getAllOrganizersSearch,
	getOneOrganizerToView,
	editAppointmentStatus,
	getAllAppointmentOrganizer,
	getAllAppointmentOrganizerView,
};
