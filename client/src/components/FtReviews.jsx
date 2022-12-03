import React from "react";
import { Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../css/FtSections.css";

export default function FtReviews() {
	return (
		<>
			<Row className="w-100 bg-light soon my-5">
				<Col md={7} sm={12}>
					<div className="ms-md-5">
						<h4 className="text-primary fw-bold my-5 fs-4 text-uppercase">
							coming soon
						</h4>
						<h2 className="fs-1 text-primary fw-bold mt-5">Reviews</h2>
						<p className="lead mt-4 ms-2 text-muted fw-bold">
							Get the right feedback from Customers..
						</p>
						<NavLink
							to="/signUp"
							className="btn btn-primary btn-lg mt-5 px-5 pl-3 "
						>
							Explore More Features
						</NavLink>
					</div>
				</Col>
				<Col md={5} className="soon-bg"></Col>
			</Row>
		</>
	);
}
