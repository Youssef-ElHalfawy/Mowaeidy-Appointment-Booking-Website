import { useEffect } from "react";
import { Alert, ProgressBar } from "react-bootstrap";
import { getOneUserMe } from "../store/reducer/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import {
	FaUserCheck,
	FaUserClock,
	FaUserTie,
	FaUserEdit,
	FaPhoneSquareAlt,
	FaEnvelope,
	FaMapMarkerAlt,
} from "react-icons/fa";
import UserAppointDetails from "./appointDetailsUser";

export default function UserProfileDetails() {
	const { user, isDone, isLoading, error } = useSelector(
		(state) => state.userReducer
	);
	const dispatch = useDispatch();

	const { state, pathname } = useLocation();
	//----Differentiate between user/view & user/me

	let path = pathname.slice(6);
	let userId = state;
	let inMe = false;
	if (path === "me") {
		let myId = localStorage.getItem("userId");
		userId = myId;
		inMe = true;
	}
	useEffect(() => {
		dispatch(getOneUserMe(userId));
		// eslint-disable-next-line
	}, []);

	let commitedTag = user?.commited > 50 ? true : false;
	let activeTag = user?.numberOfAppointments >= 15 ? true : false;

	return (
		<div className="bg-light p-5 text-dark ">
			{!error && (
				<div className="container border rounded-5 border-2 border-dark">
					<div className="row p-3 d-flex w-100 justify-content-between">
						<div className="col-lg-3 col-md-4 col-7">
							<img
								src={user?.profilePicture}
								alt="profile"
								width="180"
								height="180"
								className="border border-warning rounded-circle shadow"
							/>
						</div>
						<div className="col-lg-9 col-md-8 col-5">
							<div className="d-flex justify-content-end mb-2">
								{inMe && user?.organizer && (
									<NavLink
										className="btn btn-secondary fw-bold rounded-pill me-2"
										to={`/organizer/me`}
									>
										<FaUserTie className="fs-3 text-primary"></FaUserTie>
									</NavLink>
								)}
								{/* goes to making an organizer account if user didn't haave one */}

								{inMe && (
									<NavLink
										className="btn btn-success fw-bold rounded-pill"
										to={`/user/me/edit`}
										state={user}
									>
										<FaUserEdit className="fs-3 text-warning"></FaUserEdit>
									</NavLink>
								)}
							</div>
							<h4 className="text-primary fw-bold">
								{user?.firstName} {user?.lastName}
							</h4>
							<div className="mt-3">
								{activeTag && (
									<span className="ms-3 text-primary">
										<FaUserCheck className="fs-4"></FaUserCheck>
									</span>
								)}
								{commitedTag && (
									<span className="ms-3 text-primary">
										<FaUserClock className="fs-4"></FaUserClock>
									</span>
								)}
							</div>
						</div>
					</div>
					<hr className="m-0" />

					<div className="row">
						<div
							className="col-lg-3 col-md-4 col-12 rounded-top rounded-5"
							style={{
								backgroundImage:
									"linear-gradient(to bottom, rgb(21, 52, 98), rgb(186, 209, 194))",
							}}
						>
							<div className="my-4 fw-semibold text-warning">
								User Name:
								<h4 className="text-white text-center my-3">
									{user?.firstName} {user?.lastName}
								</h4>
							</div>
							<hr />
							<div className="my-3 fw-semibold text-warning">
								Is this user an organizer?
								<h5 className="text-white text-center my-3">
									{user?.organizer ? "Yes" : "No"}
								</h5>
							</div>
							<hr />
							<div className="my-3 fw-semibold text-warning">
								Contact Info:
								{user?.email && (
									<h5 className="text-warning my-3">
										<div className="text-start overflow-auto">
											<FaEnvelope className="mx-3" />
											<a
												className="text-white fs-6"
												rel="noreferrer"
												target="_blank"
												href={`mailto:${user.email}`}
											>
												{user.email}
											</a>
										</div>
									</h5>
								)}
								{user?.phone && (
									<h5 className="text-warning my-3">
										<div className="text-start overflow-auto">
											<FaPhoneSquareAlt className="mx-3" />
											<a
												className="text-white fs-6"
												rel="noreferrer"
												target="_blank"
												href={`tel:+${user.phone}`}
											>
												{user.phone}
											</a>
										</div>
									</h5>
								)}
								{user?.city && (
									<h5 className="text-dark my-3">
										<div className="text-white fs-5 text-start overflow-auto py-1">
											<FaMapMarkerAlt className="mx-3 text-warning" />
											{user.city}
										</div>
									</h5>
								)}
							</div>
							<hr />
							<div className="my-3 fw-semibold text-warning">
								No. of successful Appointments:
								<h5 className="text-white text-center my-3">
									{user?.numberOfAppointment}
								</h5>
							</div>
							<hr />
							<div className="my-3 fw-semibold text-warning">
								Commitment:
								<h5 className="text-primary text-center m-3">
									<ProgressBar
										variant="success"
										now={user?.commited}
										label={`${user?.commited}%`}
									/>
								</h5>
							</div>
							{user?.dateOfBirth && (
								<>
									<hr />
									<div className="my-3 fw-semibold text-dark">
										D.o.B:
										<h5 className="text-primary text-center my-3">
											{user?.dateOfBirth.slice(0, 10)}
										</h5>
									</div>
								</>
							)}
							{/* add any more data you want here */}
							{/* </>)} */}
							<hr className="my-4" />
						</div>
						<div className="vr p-0"></div>

						<div className="col">
							{inMe && (
								<>
									<h4 className="my-4 text-dark">Appointments Details</h4>
									{isDone && (
										<UserAppointDetails user={user}></UserAppointDetails>
									)}
								</>
							)}
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
						No Details to show! Please Try again
					</p>
					<Alert
						className="position-fixed text-center mx-3 bottom-0 start-0 w-25"
						variant="danger"
					>
						Couldn't get User's Info from Database
					</Alert>
				</>
			)}
		</div>
	);
}
