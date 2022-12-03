import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

export default function FtNumber() {
	return (
		<>
			<Container>
				<Row className="my-5">
					<Col md="6" xs="12">
						<img
							className=" img-fluid"
							src="Assets/Images/ftNumber.webp"
							alt="schedule pic"
						/>
					</Col>
					<Col
						md="6"
						xs="12"
						className="py-4 text-center d-flex flex-column justify-content-evenly"
					>
						<h2 className="section-title text-primary">Hit your number</h2>
						<p className="lead text-muted text-bold ">
							High-value meetings are the lifeblood of your business. Increase
							revenue, retain customers, and land recruits with the #1
							scheduling automation platform.
						</p>
						<NavLink to="/signUp" className="fs-3 text-warning">
							More
							<HiOutlineArrowNarrowRight className="mx-2" />
						</NavLink>
					</Col>
				</Row>
			</Container>
		</>
	);
}
