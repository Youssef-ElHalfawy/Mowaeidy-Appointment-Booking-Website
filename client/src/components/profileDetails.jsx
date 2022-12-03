import { useEffect } from "react";
import { Alert } from "react-bootstrap";
import {
	getOneOrganizerView,
	getOneOrganizerMe,
} from "../store/reducer/orgSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import {
	FaUserCheck,
	FaUserEdit,
	FaUser,
	FaStar,
	FaStarHalfAlt,
	FaRegStar,
	FaPhoneSquareAlt,
	FaEnvelope,
} from "react-icons/fa";
import OrgAppointDetails from "./appointDetailsOrgs";
import OrgViewCalneder from "./OrgViewCalneder";
import OrgPersonalCalender from "./OrgPersonalCalender";

export default function ProfileDetails() {
	const { organizer, isDone, isOrganizer, isLoading, error } = useSelector(
		(state) => state.orgReducer
	);
	const dispatch = useDispatch();
	const { state, pathname } = useLocation();
	//----Differentiate between organizer/view & organizer/me
	let path = pathname.slice(11);
	let orgId = state;
	let inMe = false;
	let myId = localStorage.getItem("userId");
	if (path === "me") {
		inMe = true;
	}
	useEffect(() => {
		if (path === "me") {
			dispatch(getOneOrganizerMe(myId));
		} else {
			dispatch(getOneOrganizerView(orgId));
		}
		// eslint-disable-next-line
	}, []);

	let ratedTag = false;
	if (organizer.rate > 9) {
		ratedTag = 10;
	} else if (organizer.rate > 8) {
		ratedTag = 9;
	} else if (organizer.rate > 7) {
		ratedTag = 8;
	} else if (organizer.rate > 6) {
		ratedTag = 7;
	} else if (organizer.rate > 5) {
		ratedTag = 6;
	}
	let activeTag = organizer.numbOfAppointments >= 30 ? true : false;
	return (
		<div className="bg-light p-5 text-primary">
			{inMe && !isOrganizer ? (
				<div className="text-center">
					<p className="lead fs-3 my-5 ">
						No Details to show! Please sign up as an organizer
					</p>
					<NavLink to="/signUp" className="btn ms-2 my-4 w-25 btn-warning">
						signUp
					</NavLink>
				</div>
			) : (
				!error && (
					<div className="container border rounded-5 border-2 border-primary">
						<div className="row p-3 d-flex w-100 justify-content-between">
							<div className="col-lg-3 col-md-4 col-7">
								<img
									src={organizer?.userIDFK?.profilePicture}
									width="180"
									height="180"
									alt="profile pic"
									className="border border-warning rounded-circle shadow"
								/>
							</div>

							<div className="col-lg-9 col-md-8 col-5">
								<div className="d-flex justify-content-end mb-2">
									{inMe && (
										<NavLink
											className="btn btn-secondary fw-bold rounded-pill me-2"
											to={`/user/me`}
										>
											<FaUser className="fs-3 text-primary"></FaUser>
										</NavLink>
									)}
									{inMe && (
										<NavLink
											className="btn btn-success fw-bold rounded-pill"
											to={`/organizer/me/edit`}
											state={organizer}
										>
											<FaUserEdit className="fs-3 text-warning"></FaUserEdit>
										</NavLink>
									)}
								</div>
								<h4 className="text-primary fw-bold">{organizer?.orgName}</h4>
								<div>
									<h5 className="text-warning mb-4">{organizer?.title}</h5>
									<div className="row">
										{activeTag && (
											<div className="col-lg-1 col-md-2 col-3 text-primary">
												<FaUserCheck className="fs-4"></FaUserCheck>
											</div>
										)}
										{ratedTag && (
											<div className="col-lg-3 col-md-6 col-sm-9 col-12 text-warning">
												<FaStar></FaStar>
												<FaStar style={{ left: "20px" }}></FaStar>
												<FaStar style={{ left: "40px" }}></FaStar>
												{ratedTag > 7 && (
													<FaStar style={{ left: "60px" }}></FaStar>
												)}
												{ratedTag === 7 && (
													<FaStarHalfAlt
														style={{ left: "60px" }}
													></FaStarHalfAlt>
												)}
												{ratedTag < 7 && (
													<FaRegStar style={{ left: "60px" }}></FaRegStar>
												)}
												{ratedTag > 9 && (
													<FaStar style={{ left: "80px" }}></FaStar>
												)}
												{ratedTag === 9 && (
													<FaStarHalfAlt
														style={{ left: "80px" }}
													></FaStarHalfAlt>
												)}
												{ratedTag < 9 && (
													<FaRegStar style={{ left: "80px" }}></FaRegStar>
												)}
											</div>
										)}
									</div>
								</div>
							</div>
						</div>

						{organizer?.description && (
							<div className="row">
								<div className="col-lg-2"></div>
								<div className="col-lg-10 col-12 mb-2 py-3">
									<hr />
									<p className="ms-3 text-black-50 text-wrap overflow-auto">
										{organizer?.description}
									</p>
								</div>
							</div>
						)}
						<hr className="m-0" />

						<div className="row">
							<div className="col-lg-3 col-md-4 col-12 rounded-top rounded-5 bg-cutom-gradient">
								<div className="my-4 fw-semibold text-warning">
									Organizer Name:
									<h4 className="text-white text-center my-3">
										{organizer?.orgName}
									</h4>
								</div>
								<hr />
								<div className="my-3 fw-semibold text-warning">
									Organizer Title:
									<h5 className="text-white text-center my-3">
										{organizer?.title}
									</h5>
								</div>
								<hr />
								<div className="my-3 fw-semibold text-warning">
									Industry:
									<h5 className="text-white text-center my-3">
										{organizer?.industryIDFK?.name}
									</h5>
								</div>
								{inMe && (
									<>
										<hr />
										<div className="my-3 fw-semibold text-warning">
											Contact Info:
											{organizer?.contact?.orgEmail && (
												<h5 className="text-warning my-3">
													<div className="text-start overflow-auto">
														<FaEnvelope className="mx-3" />
														<a
															className="text-white fs-6"
															target="_blank"
															rel="noreferrer"
															href={`mailto:${organizer.contact.orgEmail}`}
														>
															{organizer.contact.orgEmail}
														</a>
													</div>
												</h5>
											)}
											{organizer?.contact?.phone && (
												<h5 className="text-warning my-3">
													<div className="text-start overflow-auto">
														<FaPhoneSquareAlt className="mx-3" />
														<a
															className="text-white fs-6"
															target="_blank"
															rel="noreferrer"
															href={`tel:+${organizer.contact.phone}`}
														>
															{organizer.contact.phone}
														</a>
													</div>
												</h5>
											)}
											{organizer?.contact?.anthorPhone && (
												<h5 className="text-warning my-3">
													<div className="text-start overflow-auto">
														<FaPhoneSquareAlt className="mx-3" />
														<a
															className="text-white fs-6"
															target="_blank"
															rel="noreferrer"
															href={`tel:+${organizer.contact.anthorPhone}`}
														>
															{organizer.contact.anthorPhone}
														</a>
													</div>
												</h5>
											)}
										</div>
										<hr />
										<div className="my-3 fw-semibold text-warning">
											No. of successful Appointments:
											<h5 className="text-white text-center my-3">
												{organizer?.numbOfAppointments}
											</h5>
										</div>
										<hr />
										<div className="my-3 fw-semibold text-warning">
											Rating:
											<h5 className="text-white text-center my-3">
												{organizer?.rate} / 10
											</h5>
										</div>
										<div className="my-3 fw-semibold text-warning">
											question:
											<h5 className="text-white text-center my-3">
												{organizer?.question}
											</h5>
										</div>
										<div className="my-3 fw-semibold text-warning">
											individual:
											<h5 className="text-white text-center my-3">
												{organizer?.individual ? "Yes" : "No"}
											</h5>
										</div>
										{/* add any more data you want here */}
									</>
								)}
								<hr className="my-4" />
							</div>
							<div className="vr p-0"></div>
							{/* calenders */}
							<div className="col">
								{inMe
									? isDone && (
											<div>
												<h4 className="my-4 text-primary text-center">
													Calender
												</h4>
												<OrgPersonalCalender organizer={organizer} />
											</div>
									  )
									: isDone && (
											<div>
												<h4 className="my-4 text-primary text-center">
													Calender
												</h4>
												<OrgViewCalneder organizer={organizer} />
											</div>
									  )}
								{inMe && (
									<>
										<hr />
										<h4 className="my-4 text-dark">Appointments Details</h4>
										{isDone && (
											<OrgAppointDetails
												organizer={organizer}
											></OrgAppointDetails>
										)}
									</>
								)}
							</div>
						</div>
					</div>
				)
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
