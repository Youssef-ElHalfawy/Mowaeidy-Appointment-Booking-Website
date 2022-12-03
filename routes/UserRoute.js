const express = require("express");
const { deleteAppointment } = require("../controllers/AppointmentControllers");
const {
	getOneOrganizerToView,
} = require("../controllers/OrganizerControllers");
const {
	addUser,
	getOneUser,
	editUser,
	getAllAppointmentUser,
} = require("../controllers/UserControllers");
const validation = require("../middleware/validation");
const {
	singUpValidation,
	singInValidation,
} = require("../helpers/auth.validation");
const { signUp, signIn } = require("../controllers/registerationController");
const userRouter = express.Router();

// getting one user (personal page)
userRouter.get("/me", getOneUser);

// editing a user
userRouter.put("/me/edit", editUser);

// deleting an appointment
userRouter.delete("/appointments/delete", deleteAppointment);

// getting an appointment
userRouter.get("/appointments", getAllAppointmentUser);

// getting an organizer
userRouter.get("/organzier", getOneOrganizerToView);

// adding new user
userRouter.post("/signUp", validation(singUpValidation), signUp);

// Login
userRouter.post("/signIn", validation(singInValidation), signIn);

module.exports = userRouter;
