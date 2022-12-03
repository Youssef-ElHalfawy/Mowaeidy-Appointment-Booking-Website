import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import "../css/FtSections.css";
import Devider from "./Devider";

export default function MainAppointment() {
	return (
		<div className="main-appo my-5 py-4 ">
			<Container>
				<Row className="gy-4">
					<Col sm={12} md={6}>
						<img
							className="sec-image-square rounded-4"
							src="Assets/Images/mainAppointment.jpg"
							alt="cutomer management pic"
						/>
					</Col>
					<Col
						sm={12}
						md={6}
						className="d-flex flex-column justify-content-center align-items-center"
					>
						<h2 className="text-primary fw-bold">Take An Appointment</h2>
						<p className="text-center lead w-75 fs-4 text-muted mt-3">
							Quickly send meeting polls, find the most popular times, and book
							your meeting - all within one scheduling platform.
						</p>
						<NavLink
							to="/organizers"
							className="btn btn-primary btn-lg mt-5 px-5 pl-3 "
						>
							Take Appointment
						</NavLink>
						<NavLink
							to="/organizers"
							className="fs-6 w-50 ms-md-4 mt-3 text-warning"
						>
							More Industries
							<HiOutlineArrowNarrowRight className="mx-2" />
						</NavLink>
						<span className="mt-1 w-50 fs-6 ms-md-4 text-primary">
							No credit card required*
						</span>
					</Col>
				</Row>
			</Container>
			<Devider />
		</div>
	);
}
