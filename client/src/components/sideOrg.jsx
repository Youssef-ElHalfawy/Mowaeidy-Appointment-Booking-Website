import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Card } from "react-bootstrap";
import classes from "../css/sideOrg.module.css";
import { FaUserCheck, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function SideOrg({ orgData, children }) {
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
			<button className="btn p-0 text-light" onClick={readMore}>
				Read more
			</button>
		</Card.Text>
	);
	let ratedTag = false;
	if (rate > 9) {
		ratedTag = 10;
	} else if (rate > 8) {
		ratedTag = 9;
	} else if (rate > 7) {
		ratedTag = 8;
	} else if (rate > 6) {
		ratedTag = 7;
	} else if (rate > 5) {
		ratedTag = 6;
	}
	let activeTag = numbOfAppointments >= 30 ? true : false;

	return (
		<div className={`${classes.sideCard} d-flex align-items-stretch`}>
			<Card className="bg-primary shadow position-relative">
				<Card.Img
					variant="top"
					className="shadow"
					src={userIDFK?.profilePicture}
				/>
				{children}
				<Card.Body
					className={`${classes.sideCardBody} d-flex flex-column justify-content-between`}
				>
					<Card.Title className="text-warning text-center">
						{orgName}
						<div className="fs-6 fw-normal text-white">{title}</div>
					</Card.Title>
					<div className="d-flex justify-content-around mt-2">
						{ratedTag && (
							<span className="text-warning">
								<FaStar></FaStar>
								<FaStar style={{ left: "20px" }}></FaStar>
								<FaStar style={{ left: "40px" }}></FaStar>
								{ratedTag > 7 && <FaStar style={{ left: "60px" }}></FaStar>}
								{ratedTag === 7 && (
									<FaStarHalfAlt style={{ left: "60px" }}></FaStarHalfAlt>
								)}
								{ratedTag < 7 && (
									<FaRegStar style={{ left: "60px" }}></FaRegStar>
								)}
								{ratedTag > 9 && <FaStar style={{ left: "80px" }}></FaStar>}
								{ratedTag === 9 && (
									<FaStarHalfAlt style={{ left: "80px" }}></FaStarHalfAlt>
								)}
								{ratedTag < 9 && (
									<FaRegStar style={{ left: "80px" }}></FaRegStar>
								)}
							</span>
						)}
						{activeTag && (
							<span>
								<FaUserCheck className="text-light fs-4"></FaUserCheck>
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
						to={`/organizer/view`}
						state={_id}
					>
						View Profile
					</NavLink>
				</Card.Body>
			</Card>
		</div>
	);
}
