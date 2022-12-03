import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Card } from "react-bootstrap";
import classes from "../css/sideOrg.module.css";

export default function SideOrg({ orgData }) {
	const {
		_id,
		orgName,
		title,
		industryIDFK,
		description,
		rate,
		numbOfAppointments,
		userIDFK,
	} = orgData;

	const readMore = (e) => {
		e.preventDefault();
		setShowDesc(<Card.Text>{description}</Card.Text>);
	};

	const [showDesc, setShowDesc] = useState(
		<Card.Text>
			<span className={`${classes.truncate}`}>{description}</span>
			<button  className="btn p-0 text-light" onClick={readMore}>
				Read more
			</button>
		</Card.Text>
	);

	let ratedTag = rate > 8 ? "Highly Rated" : false;
	let activeTag = numbOfAppointments > 30 ? "Active" : false;

	return (
		<div className="d-flex align-items-stretch">
			<Card className="bg-primary shadow">
				<Card.Img
					variant="top"
					className="shadow"
					src={userIDFK?.profilePicture}
				/>
				<Card.Body className="d-flex flex-column justify-content-between">
					<Card.Title className="text-warning text-center">
						{orgName}
						<div className="fs-6 fw-normal text-white">{title}</div>
					</Card.Title>
					<div className="d-flex justify-content-around mt-2">
						{ratedTag && (
							<span className="border border-warning rounded-pill text-warning bg-dark opacity-75 p-1">
								{ratedTag}
							</span>
						)}
						{activeTag && (
							<span className="border border-warning rounded-pill text-warning bg-dark opacity-75 p-1">
								{activeTag}
							</span>
						)}
					</div>
					<hr />
					<div className="fs-6 fw-normal text-white">
						Industry: {industryIDFK?.name}
					</div>
					<hr />
					{showDesc}
					<hr />
					<NavLink
						className="btn btn-gradient text-warning py-2"
						to={`/organizers/view`}
						state={_id}
					>
						View Profile
					</NavLink>
				</Card.Body>
			</Card>
		</div>
	);
}
