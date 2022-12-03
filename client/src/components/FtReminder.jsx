import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../css/FtSections.css";

export default function FtReminder() {
	return (
		<>
			<Container className="my-5 py-4">
				<Row className="gy-4">
					<Col
						md={{ span: 6, order: 1 }}
						xs={{ span: 12, order: 2 }}
						className="d-flex flex-column justify-content-center"
					>
						<h2 className="text-primary text-bold ">Rimenders</h2>
						<p className="border-start border-5 ps-1 border-primary bg-light text-gray fs-5 w-75 mt-3">
							Life happens - and sometimes we need afew daily reminders
							throughout the day - when the mind just goes too fast and our
							feelings, senseless. Sometimes, We just need a few right words to
							make us feel better - andif this is What you need, I hope you find
							the daily, simple reminder you need right now in your life.
						</p>
					</Col>
					<Col md={{ span: 5, order: 2 }} xs={{ span: 12, order: 1 }}>
						<img
							className="sec-image-reminder rounded-4"
							src="Assets/Images/ftReminders.jpg"
							alt="Reminders pic"
						/>
					</Col>
				</Row>
			</Container>
		</>
	);
}
