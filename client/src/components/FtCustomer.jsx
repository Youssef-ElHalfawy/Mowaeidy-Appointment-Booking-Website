import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../css/FtSections.css";

export default function FtCustomer() {
	return (
		<>
			<Container className="my-5 py-4">
				<Row className="gy-4">
					<Col sm={12} md={6}>
						<img
							className="sec-image-square rounded-4"
							src="Assets/Images/ftManage.jpg"
							alt="cutomer management pic"
						/>
					</Col>
					<Col
						sm={12}
						md={6}
						className="d-flex flex-column justify-content-center align-items-center"
					>
						<h2 className="text-primary text-bold">Customer Management</h2>
						<p className="text-center lead w-75 text-muted text-bold mt-3">
							The main goal of Customer relationship management is to create a
							strong bond between customers and the company. To provide tools
							that help companies satisfiy their customers, Customer
							Relationship Management Systems include different technologies.
						</p>
					</Col>
				</Row>
			</Container>
		</>
	);
}
