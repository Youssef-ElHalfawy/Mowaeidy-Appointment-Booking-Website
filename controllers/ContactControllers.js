const WebInfoModel = require("../models/info");
const sendEmail = require("../services/email.service");


const sendContactMail = async (req, res) => {
	try {
		const toWebsite = await WebInfoModel.find({}).exec();
		const emailMessage = `<div style='background-color:#2e5077;padding:25px;color:white;'>
    <h3>>${req?.body?.name} :<span style='color:#ffa630;'>${req?.body?.email}</span> has send you the following message..</h3>
    <p>${req?.body?.comment}</p>
    </div>`;
		sendEmail(toWebsite[0]?.socialMediaLinks?.email, emailMessage);
		res.json({ message: "message has been sent" });
	} catch (error) {
		res.json({ message: "error sending message", error });
	}
};
module.exports = {
	sendContactMail,
};
