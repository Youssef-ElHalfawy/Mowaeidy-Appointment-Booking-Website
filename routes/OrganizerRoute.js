const industryModel = require("../models/industry");
const validation = require("../middleware/validation");
const { organizerSignUpValidation } = require("../helpers/auth.validation");
const { organizerSignUp } = require("../controllers/registerationController");
const {
	getOneOrganizer,
	addOrganizer,
	getAllOrganizers,
	editOrganizer,
	getOneOrganizerToView,
	addAppointmentOrganizer,
	editAppointmentStatus,
	getAllAppointmentOrganizer,
	getAllOrganizersSearch,
	getAllAppointmentOrganizerView,
} = require("../controllers/OrganizerControllers");
const express = require("express");
const { deleteAppointment } = require("../controllers/AppointmentControllers");
const { authentication } = require("../middleware/authen");
const { endPoint } = require("../middleware/endPoint");
const organizerRouter = express.Router();

// getting one organizer (personal page)
organizerRouter.get("/me", getOneOrganizer);

// getting one organizer (view page)
organizerRouter.get("/view", getOneOrganizerToView);

// editing an organizer
organizerRouter.put(
	"/me/edit",
	validation(organizerSignUpValidation),
	editOrganizer
);

// adding an appointment
organizerRouter.post(
	"/appointments/add",
	// authentication(endPoint.user.appointment),
	addAppointmentOrganizer
);

// editing an appointment status
organizerRouter.put("/appointments/edit", editAppointmentStatus);

// deleting an appointment
organizerRouter.delete("/appointments/delete", deleteAppointment);

// getting all appointments in personal Page
organizerRouter.get("/appointments", getAllAppointmentOrganizer);

// getting all appointments in view Page
organizerRouter.get("/appointments/view", getAllAppointmentOrganizerView);

// getting all organizer in search in industries page
organizerRouter.get("/search", getAllOrganizersSearch);

// getting all organizer
// expermental
organizerRouter.get("/", getAllOrganizers);

// adding new organizer
organizerRouter.post(
	"/organizerSignUp",
	validation(organizerSignUpValidation),
	organizerSignUp
);

module.exports = organizerRouter;
