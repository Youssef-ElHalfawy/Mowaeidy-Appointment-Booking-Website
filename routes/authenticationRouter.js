const express = require("express");
const validation = require("../middleware/validation");
const {
	singUpValidation,
	singInValidation,
	organizerSignUpValidation,
} = require("../helpers/auth.validation");
const {
	signUp,
	signIn,
	organizerSignUp,
} = require("../controllers/registerationController");

const authRouter = express.Router();

authRouter.post("/signUp", validation(singUpValidation), signUp);
authRouter.post("/signIn", validation(singInValidation), signIn);
authRouter.post(
	"/organizerSignUp",
	validation(organizerSignUpValidation),
	organizerSignUp
);

module.exports = authRouter;
