import React from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import FtCustomer from "../components/FtCustomer";
import FtReminder from "../components/FtReminder";
import FtReviews from "../components/FtReviews";
import FtSchedule from "../components/FtSchedule";
import FtNumber from "../components/FtNumber";
import FtAvailability from "../components/FtAvailability";
import MainAppointment from "../components/MainAppointment";
import Industry from "../components/Industry";
import Subscribe from "../components/Subscribe";
import MainBlog from "../components/MainBlog";

export default function HomePage() {
	return (
		<>
			<Hero></Hero>
			<Features></Features>
			<FtCustomer></FtCustomer>
			<FtReminder></FtReminder>
			<FtReviews></FtReviews>
			<FtSchedule></FtSchedule>
			<FtNumber></FtNumber>
			<FtAvailability></FtAvailability>
			<MainAppointment></MainAppointment>
			<MainBlog></MainBlog>
			{/* not yet */}
			<Industry></Industry>
			<br></br>
			<br></br>
			<Subscribe></Subscribe>
		</>
	);
}
