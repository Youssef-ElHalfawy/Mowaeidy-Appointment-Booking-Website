const appointmentModel = require("../models/appointment");
const organzierModel = require("../models/organizer");
const userModel = require("../models/user");
const sendEmail = require("../services/email.service");

// deleting an appointment in organizer or user page
const deleteAppointment = async (req, res) => {
	try {
		const updatedAppointment = await appointmentModel
			.findOneAndDelete({ _id: req.query.id })
			.exec();
		if (updatedAppointment) {
			const toOrg = await organzierModel
				.findOne({ _id: updatedAppointment.madeToFK })
				.select("contact")
				.exec();
			const toUser = await userModel
				.findOne({ _id: updatedAppointment.madeByFK })
				.select("email")
				.exec();
			const emailMessage = `<div style='background-color:#2e5077;padding:25px;color:white;'>
				<h3>We inform you that the appointment at <span style='color:#ffa630;'>${updatedAppointment.appStartDateTime}</span> has been canceled.</h3>
			</div>`;
			sendEmail([toOrg?.contact?.orgEmail,toUser.email], emailMessage);

			res.json({ message: "appointment deleted" });
		} else {
			res.json({ message: "appointment doesn't exist" });
		}
	} catch (err) {
		res.json({ message: "error" });
	}
};

module.exports = {
	deleteAppointment,
};
