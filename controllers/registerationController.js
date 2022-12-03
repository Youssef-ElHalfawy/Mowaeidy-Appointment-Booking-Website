const userModel = require("../models/user");
const AdminModel = require("../models/admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { roles } = require("../middleware/authen");
const OrganizerModel = require("../models/organizer");
//User SIGN UP------------------------------------------------
const signUp = async (req, res) => {
	try {
		const {
			firstName,
			lastName,
			email,
			password,
			phone,
			city,
			gender,
			dateOfBirth,
			role,
			organizer,
		} = req.body;
		console.log(req.body);
		const newUser = new userModel({
			firstName,
			lastName,
			email,
			password,
			phone,
			city,
			gender,
			dateOfBirth,
			role,
			organizer,
		});
		if (newUser.organizer == true) newUser.role = roles.organizer;
		const savedUser = await newUser.save();
		console.log(dateOfBirth)
		console.log(savedUser.dateOfBirth)
		const token = jwt.sign(
			{ _id: savedUser._id, isLogged: true },
			process.env.SIGNiNTOKEN,
			{ expiresIn: "1h" }
		);
		res.json({ message: "userAdd sucessfully", savedUser, token });
	} catch (e) {
		if (e.keyValue?.email) {
			res.json({ message: "Email Exist" });
		} else {
			res.json({ message: "catch signUp error", e });
		}
	}
};
// SIGN IN------------------------------------------------
const signIn = async (req, res) => {
	try {
		const { email, password, admin } = req.body;
		if (!admin) {
			const user = await userModel.findOne({ email });
			if (!user) {
				res.json({ message: "invalid acount" });
			} else {
				if (user.status === "active") {
					const match = await bcrypt.compare(password, user.password);
					if (!match) {
						res.json({ message: "sorry you email or pass is error" });
					} else {
						const token = jwt.sign(
							{ _id: user._id, isLogged: true },
							process.env.SIGNiNTOKEN,
							{ expiresIn: "1h" }
						);
						res.json({ message: "take your token", token, userId: user._id });
					}
				} else {
					res.json({ message: "user is panned please contact us" });
				}
			}
		} else {
			const user = await AdminModel.findOne({ email });
			console.log(email);
			if (!user) {
				res.json({ message: "invalid acount" });
			} else {
				const match = await bcrypt.compare(password, user.password);
				console.log(match);
				if (!match) {
					res.json({ message: "sorry you email or pass is error" });
				} else {
					const token = jwt.sign(
						{ _id: user._id, isLogged: true },
						process.env.SIGNiNTOKEN,
						{ expiresIn: "1h" }
					);

					res.json({ message: "take your token", token ,adm:278440});
				}
			}
		}
	} catch (e) {
		res.json({ message: "sign in error", e });
	}
};
const organizerSignUp = async (req, res) => {
	try {
		const {
			userIDFK,
			title,
			orgName,
			description,
			contact,
			individual,
			industryIDFK,
			availDays,
			availHours,
			amountOfRequiredDaposit,
			question
		} = req.body;
		const newOrganizer = new OrganizerModel({
			userIDFK,
			orgName,
			title,
			description,
			contact,
			individual,
			industryIDFK,
			availDays,
			availHours,
			amountOfRequiredDaposit,
			question
		});

		const savedOrganizer = await newOrganizer.save();
		console.log(savedOrganizer);
		res.json({ message: "orginzer added successfuly", savedOrganizer });
	} catch (e) {
		console.log(e);
		res.json({ message: "signUp error" });
	}
};

module.exports = { signUp, signIn, organizerSignUp };
