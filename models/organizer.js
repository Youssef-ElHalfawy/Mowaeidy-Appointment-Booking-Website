const mongoose = require("mongoose");

const organizerSchema = new mongoose.Schema({
	//foreign key for user collection
	userIDFK: { type: mongoose.Schema.Types.ObjectId, ref: "user" },

	orgName: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50,
	},
	title: {
		type: String,
		required: true,
		minlength: 4,
		maxlength: 20,
	},
	description: {
		type: String,
		default: null,
		maxlength: 400,
	},
	contact: {
		phone: {
			type: String,
			match: /^01[0-2,5]{1}[0-9]{8}$/g,
		},
		anthorPhone: {
			type: String,
			match: /^01[0-2,5]{1}[0-9]{8}$/g,
		},
		orgEmail: {
			type: String,
			match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
		},
	},
	//person or company
	individual: {
		type: Boolean,
		required: true,
	},
	//foreign key for industry collection
	industryIDFK: { type: mongoose.Schema.Types.ObjectId, ref: "industry" },
	//the available days for the orginizer
	availDays: {
		type: Array,
		required: true,
		maxItems: 7,
		//[0,1,2]
	},
	//the available hours for the orginizer
	availHours: {
		startTime: { type: String }, //10:00
		endTime: { type: String }, //16:00
	},
	//is the amount of required daposit
	amountOfRequiredDaposit: {
		type: Number,
		default: 0,
		min: 0,
	},
	//if the organizer needs to aske the user a question when making an appointment
	question: {
		type: String,
		default:''
	},
	//the organizer rate
	rate: {
		type: Number,
		default: 5,
		min: 0,
	},
	//total number of organizer appointments
	numbOfAppointments: {
		type: Number,
		default: 0,
		min: 0,
	},
	//total amount of organizer recieved money
	totalPaidMoney: {
		type: Number,
		default: 0,
		min: 0,
	},
});

const OrganizerModel = mongoose.model("organizer", organizerSchema);

module.exports = OrganizerModel;
