import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

export default function FtAvailability() {
	return (
		<>
			<Container>
				<Row className="my-5">
					<Col
						md={{ span: 6, order: 1 }}
						xs={{ span: 12, order: 2 }}
						className="py-4 text-center d-flex flex-column justify-content-evenly"
					>
						<h3 className="section-title text-warning">
							Share your Mowaeid availability with others
						</h3>
						<p className="lead text-muted text-bold ">
							Grow your business with scheduling automation. Simply email, text,
							or add your Calender availability to your website - and watch
							prospects and recruits book high - value meetings with you.
						</p>
						<NavLink to="/signUp" className="fs-3 text-warning">
							More
							<HiOutlineArrowNarrowRight className="mx-2" />
						</NavLink>
					</Col>
					<Col md={{ span: 6, order: 2 }} xs={{ span: 12, order: 1 }}>
						<img
							className=" img-fluid"
							src="Assets/Images/ftAvail.webp"
							alt="schedule pic"
						/>
					</Col>
				</Row>
			</Container>
		</>
	);
}
