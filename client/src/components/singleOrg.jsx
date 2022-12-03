import classes from "./singleOrg.module.css";
import { FaUserCheck, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function SingleOrg({ orgData, children }) {
	const { orgName, title, industryIDFK, rate, numbOfAppointments, userIDFK } =
		orgData;

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
		<>
			<div
				className={`${classes.oneCard} container mt-3 position-relative bg-transparent rounded-4`}
			>
				{children}
				<div className="row shadow p-3 rounded-4 bg-white">
					<div className="col-md-2 col-sm-3 col-4 position-relative">
						<img
							alt="Profile Pic"
							src={userIDFK?.profilePicture}
							width="72"
							height="72"
							className="rounded-circle shadow"
						/>

						{activeTag && (
							<FaUserCheck className="position-absolute fs-4 top-0 end-0 text-primary"></FaUserCheck>
						)}
						{ratedTag && (
							<div className="d-flex justify-content-start ms-0 mt-2">
								<FaStar className="fs-6 text-warning"></FaStar>
								<FaStar
									className="fs-6 text-warning"
									style={{ left: "20px" }}
								></FaStar>
								<FaStar
									className="fs-6 text-warning"
									style={{ left: "40px" }}
								></FaStar>
								{ratedTag > 7 && (
									<FaStar
										className="fs-6 text-warning"
										style={{ left: "60px" }}
									></FaStar>
								)}
								{ratedTag === 7 && (
									<FaStarHalfAlt
										className="fs-6 text-warning"
										style={{ left: "60px" }}
									></FaStarHalfAlt>
								)}
								{ratedTag < 7 && (
									<FaRegStar
										className="fs-6 text-warning"
										style={{ left: "60px" }}
									></FaRegStar>
								)}
								{ratedTag > 9 && (
									<FaStar
										className="fs-6 text-warning"
										style={{ left: "80px" }}
									></FaStar>
								)}
								{ratedTag === 9 && (
									<FaStarHalfAlt
										className="fs-6 text-warning"
										style={{ left: "80px" }}
									></FaStarHalfAlt>
								)}
								{ratedTag < 9 && (
									<FaRegStar
										className="fs-6 text-warning"
										style={{ left: "80px" }}
									></FaRegStar>
								)}
							</div>
						)}
						{/* <div className="vr position-absolute end-0 top-0 ms-1 p-0 h-100"></div> */}
					</div>

					<div className="col row d-flex justify-content-between align-content-center border-start border-2 ms-3">
						<div className="col-md-4 col-sm-6 col-12 text-center mt-3 mb-1">
							<span className="text-warning border-top border-2 border-primary">
								Name
							</span>
							<h5 className="text-primary mt-3 fw-bold">{orgName}</h5>
						</div>
						<div className="col-md-4 col-sm-6 col-12 text-center mt-3 mb-1">
							<span className="text-warning border-top border-2 border-primary">
								Title
							</span>
							<h6 className="text-primary mt-3">{title}</h6>
						</div>
						<div className="col-md-4 col-sm-6 col-12 text-center mt-3 mb-1">
							<span className="text-warning border-top border-2 border-primary">
								Industry
							</span>
							<h6 className="text-primary mt-3">{industryIDFK?.name}</h6>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
