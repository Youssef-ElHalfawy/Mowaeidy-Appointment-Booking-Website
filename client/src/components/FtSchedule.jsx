import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

export default function FtSchedule() {
	return (
		<>
			<Container>
				<Row className="my-5">
					<Col
						md={{ span: 6, order: 1 }}
						xs={{ span: 12, order: 2 }}
						className="py-4 text-center d-flex flex-column justify-content-evenly"
					>
						<h2 className="section-title text-primary">Schedule as a team</h2>
						<p className="lead text-muted text-bold ">
							Mowaeidy adapts to both you and your team's scheduling
							preferences. Co-host a client call with a colleague, email
							reminders and follow-ups, and integrate everything with your
							preferred software tools.
						</p>
						<NavLink to="/signUp" className="fs-3 text-warning">
							More
							<HiOutlineArrowNarrowRight className="mx-2" />
						</NavLink>
					</Col>
					<Col md={{ span: 6, order: 2 }} xs={{ span: 12, order: 1 }}>
						<img
							className=" img-fluid"
							src="Assets/Images/ftSchedule.webp"
							alt="schedule pic"
						/>
					</Col>
				</Row>
			</Container>
		</>
	);
}
