const express = require("express");
const { sendContactMail } = require("../../controllers/ContactControllers");
const contactRouter = express.Router();

// sending a message in contact page
contactRouter.post("/", sendContactMail);

module.exports = contactRouter;
