const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

const roles = {
	user: "user",
	organizer: "organizer",
	admin: "admin",
};

const authentication = (accessRoles) => {
	return async (req, res, next) => {
		try {
			const headerToken = req.headers["authorization"];

			if (
				!headerToken ||
				headerToken == undefined ||
				headerToken == null ||
				!headerToken.startsWith(`${process.env.BERARETOKEN} `)
			) {
				res.json({ message: "in-valid header token" });
			} else {
				const token = headerToken.split(" ")[1];
				// token فك ل
				// const decoded=jwt.verify(token, كلمه السر بتاعته)
				const decoded = jwt.verify(token, process.env.SIGNiNTOKEN);

				//console.log(decoded)
				if (!decoded.isLogged) {
					res.json({ message: "sorry invalid token" });
				} else {

					const findUser = await userModel.findById(decoded._id);
					/*.select("firstName lastName  id ")*/
					// console.log(findUser) *.select("-password")*/
					if (!findUser) {
						res.json({ message: "invalid user token" });
					} else {
						if (!accessRoles.includes(findUser.role)) {
							res.json({ message: "sorry you are not Authorized" });
						} else {
							req.user = findUser;
							res.json({ message: "token matched data ", findUser });
							next();
						}
					}
				}
			}
		} catch (e) {
			console.log(e);
		}
	};
};

module.exports = { authentication, roles };
