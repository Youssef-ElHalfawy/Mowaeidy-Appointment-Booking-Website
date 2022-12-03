const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
	//foreign key for user collection
	madeByFK: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
	//foreign key for organiser collection
	madeToFK: { type: mongoose.Schema.Types.ObjectId, ref: "organizer" },
	//starts on
	appStartDateTime: {
		type: Date,
		required: true,
	},
	//ends on
	appEndDateTime: {
		type: Date,
		required: true,
	},
	// primary key  [organiser id + appDateTime]
	appID: {
		type: String,
		unique: true,
		required: true,
	},
	// appointment description defined by user
	description: {
		type: String,
		default: null,
		maxlength: 300,
	},
	
	// (pending-confirmed-done-canceled)
	status: {
		type: String,
		required: true,
		default: "pending",
	},

	//final time allowed to cancel the appointment
	allowedCancelTime: {
		type: Date,
		required: true,
	},
	// feedback given after the appointment in done
	userFeedback: {
		type: String,
		default: null,
		maxlength: 300,
	},
	organiserFeedback: {
		type: String,
		default: null,
		maxlength: 300,
	},
	//Online or Offline? Place? Group Meeting or Personal?
	online: {
		type: Boolean,
		default: false,
	},
	place: {
		type: String,
		default: null,
	},
	group: {
		type: Boolean,
		default: false,
	},
	//amount of daposit paid to organiser for appointing meeting [if required]
	depositPaid: {
		type: Number,
		default: 0,
		min: 0,
	},
	//user's answer to organizer's question [if existed]
	answer: {
		type: String,
		default: null,
	},
	//foreign key for industry collection
	industryIDFK: { type: mongoose.Schema.Types.ObjectId, ref: "industry" },
});

const AppointmentModel = mongoose.model("appointments", appointmentSchema);

module.exports = AppointmentModel;
