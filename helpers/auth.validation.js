//const Joi = require("joi");
const Joi = require('joi')
    .extend(require('@joi/date'));
const singUpValidation = {
	body: Joi.object()
		.required()
		.keys({
			firstName: Joi.string()
				.pattern(new RegExp("^[a-zA-Z0-9 ]{3,18}$"))
				.required(),
			lastName: Joi.string()
				.pattern(new RegExp("^[a-zA-Z0-9 ]{3,18}$"))
				.required(),
			email: Joi.string().email().required(),
			password: Joi.string()
				.pattern(new RegExp("^[a-zA-Z0-9@$!%*#?&]{8,30}$"))
				.required(),
			cpassword: Joi.string().valid(Joi.ref("password")).required(),
			city: Joi.string().required(),
			phone: Joi.string().required(),
			gender: Joi.string().required(),
			dateOfBirth: Joi.date().format("YYYY-MM-DD").utc().empty("").allow(""),
			organizer: Joi.boolean().required(),
			role: Joi.string(),
		}),
};
const singInValidation = {
	body: Joi.object().required().keys({
		email: Joi.string().email().required(),
		password: Joi.string().required(),
		admin: Joi.boolean(),
	}),
};

const organizerSignUpValidation = {
	body: Joi.object()
		.required()
		.keys({
			userIDFK: Joi.string().hex().length(24),
			orgName: Joi.string()
				.pattern(new RegExp("^[a-zA-Z0-9 &]{5,50}$"))
				.required(),
			description: Joi.string()
				.pattern(new RegExp("^[a-zA-Z0-9 @$!%*#?&]{20,500}$"))
				.required(),
			individual: Joi.boolean().required(),
			title: Joi.string().pattern(new RegExp("^[a-zA-Z0-9 ]{4,20}$")),
			availDays: Joi.array().items(Joi.number().required()),
			availHours: Joi.object().keys({
				startTime: Joi.string().required(),
				endTime: Joi.string().required(),
			}),
			contact: Joi.object().keys({
				phone: Joi.string().required(),
				anthorPhone: Joi.string().empty("").allow(""),
				orgEmail: Joi.string().email().required(),
			}),
			industryIDFK: Joi.string().hex().length(24),
			question: Joi.string().empty("").allow(""),
			amountOfRequiredDaposit: Joi.number(),
		}),
};
module.exports = {
	singUpValidation,
	singInValidation,
	organizerSignUpValidation,
};
