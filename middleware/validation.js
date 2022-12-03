const dataMethod = ["params", "body", "query", "file"];

const validation = (schema) => {
	//الداتا الي جيالي

	return (req, res, next) => {
		const validationErrorArr = [];

		dataMethod.forEach((key) => {
			if (schema[key]) {
				const validationRes = schema[key].validate(req[key], {
					abortEarly: false,
				});

				if (validationRes.error) {
					validationErrorArr.push(validationRes.error.details);
				}
			}
		});

		if (validationErrorArr.length) {
			res.json({ message: "validationErrorArr", validationErrorArr });
		} else {
			next();
		}
	};
};

module.exports = validation;
