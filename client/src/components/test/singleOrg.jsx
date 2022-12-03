import classes from "../css/singleOrg.module.css";

export default function SingleOrg({ orgData }) {
	const { orgName, title, industryIDFK, rate, numbOfAppointments, userIDFK } =
		orgData;

	//   let ratedTag = rate>8 ? "Highly Rated" : false;
	let activeTag = numbOfAppointments > 30 ? "Active" : false;

	return (
		<div className="container mt-3">
			<div className={`row shadow p-3 rounded-4 ${classes.oneCard}`}>
				<div className="col-3 position-relative">
					{" "}
					<img
						alt="profile"
						src={userIDFK?.profilePicture}
						width="80"
						height="80"
						className="rounded-circle shadow"
					/>
					{activeTag && (
						<span className="position-absolute border border-warning rounded-pill text-warning bg-dark opacity-75 p-1 mt-1">
							{activeTag}
						</span>
					)}
				</div>
				<div className="col-9 row d-flex justify-content-between">
					<div className="col-md-3 col-6 text-center mt-2">
						<span className="text-warning border-top border-2 border-primary">
							Name
						</span>
						<h4 className="text-primary mt-3 fw-bold">{orgName}</h4>
					</div>
					<div className="col-md-3 col-6 text-center mt-2">
						<span className="text-warning border-top border-2 border-primary">
							Title
						</span>
						<h5 className="text-primary mt-3">{title}</h5>
					</div>
					<div className="col-md-3 col-6 text-center mt-2">
						<span className="text-warning border-top border-2 border-primary">
							Industry
						</span>
						<h5 className="text-primary mt-3">{industryIDFK?.name}</h5>
					</div>
					<div className="col-md-3 col-6 text-center mt-2">
						<span className="text-warning border-top border-2 border-primary">
							Rate
						</span>
						<h4 className="text-primary mt-3 fw-bold">{rate}</h4>
					</div>
				</div>
			</div>
		</div>
	);
}
