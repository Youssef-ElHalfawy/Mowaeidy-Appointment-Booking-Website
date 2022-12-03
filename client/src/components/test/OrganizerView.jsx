import { useEffect } from "react";
import { Alert } from "react-bootstrap";
import { getOneOrganizerView } from "../store/reducer/orgSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, Outlet } from "react-router-dom";
import OrgViewCalneder from "./OrgViewCalneder";
import OrgPersonalCalender from "./OrgPersonalCalender";

export default function OrganizerView() {
	const { organizer, isLoading, error } = useSelector(
		(state) => state.orgReducer
	);
	const dispatch = useDispatch();

	const { state } = useLocation();
	useEffect(() => {
		dispatch(getOneOrganizerView(state));
		// eslint-disable-next-line
	}, []);

	let ratedTag = organizer.rate > 8 ? "Rated" : false;
	let activeTag = organizer.numbOfAppointments > 30 ? "Active" : false;

	return (
		<div className="bg-light p-5 text-dark">
			{!error && (
				<div className="container border rounded-5 border-2 border-dark">
					<div className="row p-3 d-flex flex-md-row flex-column w-100 justify-content-between">
						<div className="col-lg-3 col-md-6 col-8">
							<img
								src={organizer?.userIDFK?.profilePicture}
								width="180"
								height="180"
								className="border border-warning rounded-circle shadow"
							/>
						</div>

						<div className="col-lg-9 col-md-6 col-4">
							<div className=" d-flex w-100 justify-content-between">
								<h4 className="text-primary mt-5 fw-bold">
									{organizer?.orgName}
								</h4>
								<div>
									<NavLink
										className="btn btn-success text-white fw-bold rounded-pill"
										to={`/organizers/profile/edit`}
										state={organizer}
									>
										{" "}
										Edit
									</NavLink>
								</div>
							</div>
							<div>
								<h5 className="text-primary mb-4">{organizer?.title}</h5>
								{activeTag && (
									<span className="border border-warning rounded-pill text-warning bg-dark opacity-75 p-1 me-2">
										{activeTag}
									</span>
								)}
								{ratedTag && (
									<span className="border border-warning rounded-pill text-warning bg-dark opacity-75 p-1 me-2">
										{ratedTag}
									</span>
								)}
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col-lg-2"></div>
						<div className="col-lg-10 col-12 mb-2 py-3">
							<hr />
							<p className="ms-3 text-black-50">{organizer?.description}</p>
						</div>
					</div>
					<hr />

					<div className="row">
						<div className="col-md-3 col-12">
							<div className="my-4 fw-semibold text-dark">
								Org Name:
								<h4 className="text-primary text-center my-3">
									{organizer?.orgName}
								</h4>
							</div>
							<hr />
							<div className="my-3 fw-semibold text-dark">
								Org Title:
								<h5 className="text-primary text-center my-3">
									{organizer?.title}
								</h5>
							</div>
							<hr />
							<div className="my-3 fw-semibold text-dark">
								Industry:
								<h5 className="text-primary text-center my-3">
									{organizer?.industryIDFK?.name}
								</h5>
							</div>
						</div>
						<div className="vr p-0 col-md-1"></div>

						<div className="col-md-8 col-12">
							<h4 className="my-3 text-dark">Calender</h4>
							<OrgViewCalneder organizer={organizer} />
							{/* <OrgPersonalCalender organizer={organizer} /> */}
						</div>
					</div>
				</div>
			)}

			{isLoading && (
				<Alert
					className="position-fixed text-center mx-3 bottom-0 start-0 w-25"
					variant="info"
				>
					Loading Profile Page...
				</Alert>
			)}
			{error && (
				<>
					<p className="lead fs-3 my-5 text-center">
						No Details to show! Please go back to Our Organizers Page
					</p>
					<Alert
						className="position-fixed text-center mx-3 bottom-0 start-0 w-25"
						variant="danger"
					>
						Couldn't get Organizer's Info from Database
					</Alert>
				</>
			)}
		</div>
	);
}
