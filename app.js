require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const app = express();

const userRoute = require("./routes/UserRoute");
const organizerRoute = require("./routes/OrganizerRoute");
const searchRouter = require("./routes/pagesRoutes/SearchRoutes");
const dashboardRouter = require("./routes/pagesRoutes/DashboardRoutes");
const authRouter = require("./routes/authenticationRouter");
const blogRouter = require("./routes/pagesRoutes/BlogsRoutes");
const contactRouter = require("./routes/pagesRoutes/ContactRouter");
app.use(express.json());

// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const auth = require("./middleware/authentication");

//Sign-up
//Log-in

// Allmodels
// const UserModel = require("./model/user");

app.use("/user", userRoute);
app.use("/organizer", organizerRoute);
app.use("/industries", searchRouter);
app.use("/adminpanel", dashboardRouter);
app.use("/blogs", blogRouter);
app.use("/contactus", contactRouter);
// app.use("/user", authRouter);

module.exports = app;
