import { Accordion } from "react-bootstrap";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	getAllAppointmentsUser,
	deleteAppointmentUser,
} from "../store/reducer/appointSlice";
import { Dropdown, DropdownButton } from "react-bootstrap";
import {
	FaFacebookSquare,
	FaLinkedin,
	FaPhoneSquareAlt,
	FaEnvelope,
	FaMapMarkerAlt,
} from "react-icons/fa";

export default function UserAppointDetails({ user }) {
	const { appointments } = useSelector((state) => state.appointReducer);
	const dispatch = useDispatch();
	const [renderChanges, setRenderChanges] = useState(0); //just to rerender the changes by actions

	useEffect(() => {
		dispatch(getAllAppointmentsUser(user?._id));
		// eslint-disable-next-line
	}, [renderChanges]);

	const cancelHandler = (appointId) => {
		dispatch(deleteAppointmentUser(appointId));
		setRenderChanges(renderChanges + 1);

		// fire a send email event to --> madeByFK
		// popup to inquire about cancel reason or send a certain message to the user?!
		// toastify success after
	};

	//----Dynamic Dropdown list

	const appointFilters = [
		"Closer Date First",
		"Closer Date Last",
		"Pending Appointments First",
		"Confirmed Appointments First",
	];
	const dropdownFilters = appointFilters.map((filter, index) => (
		<Dropdown.Item
			as="button"
			key={index}
			onClick={() => filterHandler(filter)}
		>
			{filter}
		</Dropdown.Item>
	));

	//----Choosing a filter sorts the appointments

	const [filterName, setFilterName] = useState("Closer Date First");

	const filterHandler = (filter) => {
		setFilterName(filter);
	};

	let filteredAppointments = appointments?.filter((app) => app._id);
	let pendingAppointments = filteredAppointments.filter(
		(app) => app.status === "pending"
	);
	let confirmedAppointments = filteredAppointments.filter(
		(app) => app.status === "confirmed"
	);
	if (filterName === "Closer Date First") {
		filteredAppointments.sort((a, b) => {
			if (a.appStartDateTime < b.appStartDateTime) return -1;
			return 1;
		});
	} else if (filterName === "Closer Date Last") {
		filteredAppointments.sort((a, b) => {
			if (a.appStartDateTime > b.appStartDateTime) return -1;
			return 1;
		});
	} else if (filterName === "Pending Appointments First") {
		filteredAppointments = pendingAppointments.concat(confirmedAppointments);
	} else if (filterName === "Confirmed Appointments First") {
		filteredAppointments = confirmedAppointments.concat(pendingAppointments);
	}

	const currentDateTime = new Date();

	return (
		<>
			{appointments?.length === 0 ? (
				<p className="lead fs-3 text-center">
					No Booked Appointments Yet!
					<NavLink
						to={`/organizers`}
						className="btn btn-primary rounded-3 fw-semibold m-4 me-1 text-warning"
					>
						Start Booking Now
					</NavLink>
				</p>
			) : (
				<>
					<div className="d-flex justify-content-end mb-4 py-2">
						<DropdownButton
							variant="primary"
							id="dropdown-filter"
							title={filterName}
						>
							{dropdownFilters}
						</DropdownButton>
					</div>

					<Accordion className="mx-2 mb-4">
						{filteredAppointments.map((appoint, index) => (
							<Accordion.Item
								className="border border-primary"
								key={index}
								eventKey={index}
							>
								<Accordion.Header>
									<div>
										<div className="fw-semibold mb-1">
											Appointment with:{" "}
											<span className="text-primary fw-bold mx-2">
												{appoint?.madeToFK?.orgName}
											</span>
										</div>
										<div className="fw-semibold my-1">
											At:{" "}
											<span className="text-primary fw-bold mx-2">
												{appoint?.appStartDateTime.slice(11, 16)}
												{" on "}
												{appoint?.appStartDateTime.slice(0, 10)}
											</span>
										</div>
										<div className="fw-semibold mt-1">
											Status:{" "}
											<span
												className={
													appoint?.status === "pending"
														? `text-warning fw-bold mx-2`
														: `text-success fw-bold mx-2`
												}
											>
												{appoint?.status}
											</span>
										</div>
									</div>
								</Accordion.Header>
								<Accordion.Body className="bg-light fw-semibold">
									<div>
										-
										<span className="text-primary fw-bold mx-1">
											{appoint?.madeToFK?.orgName}{" "}
										</span>
										is a/an
										<span className="text-primary fw-bold mx-1">
											{" "}
											{appoint?.madeToFK?.title}{" "}
										</span>
										in the
										<span className="text-primary fw-bold mx-1">
											{" "}
											{appoint?.industryIDFK?.name}{" "}
										</span>
										industry.
										<NavLink
											to={`/organizer/view`}
											state={appoint?.madeToFK?._id}
											className="btn btn-primary py-0 px-1 mx-2 rounded-pill"
										>
											View Profile
										</NavLink>
									</div>
									<div className="my-3">
										- Appointment is
										<span
											className={
												appoint?.status === "pending"
													? `text-warning fw-bold mx-2`
													: `text-success fw-bold mx-2`
											}
										>
											{" "}
											{appoint?.status}
										</span>
										{currentDateTime < new Date(appoint?.allowedCancelTime) && (
											<button
												onClick={() => {
													cancelHandler(appoint?._id);
												}}
												className="btn btn-danger py-0 px-2 mx-2 rounded-pill"
											>
												Cancel
											</button>
										)}
									</div>
									<div className="my-3">
										- Appointment is at
										<span className="text-primary fw-bold mx-1">
											{appoint?.appStartDateTime.slice(11, 16)}
											{" on "}
											{appoint?.appStartDateTime.slice(0, 10)}
										</span>
										and final allowed time to cancel is
										<span className="text-primary fw-bold mx-1">
											{" "}
											{appoint?.allowedCancelTime.slice(0, 10)}
										</span>
										at
										<span className="text-primary fw-bold mx-1">
											{" "}
											{appoint?.allowedCancelTime.slice(11, 16)}
										</span>
										.
									</div>
									<div className="my-3">
										- Appointment is
										<span className="text-primary fw-bold mx-1">
											{appoint?.online ? "online " : "offline "}
										</span>
										{"in "}
										<span className="text-primary fw-bold mx-1">
											{appoint?.place}
										</span>
										{appoint?.group && (
											<>
												{" "}
												and it's a
												<span className="text-primary fw-bold mx-1">
													group meeting
												</span>
											</>
										)}
										.
									</div>
									<div>
										- Contact Info for
										<span className="text-primary fw-bold mx-1">
											{" "}
											{appoint?.madeToFK?.orgName}
										</span>
										:
										<div>
											{appoint?.madeToFK?.contact?.orgEmail && (
												<>
													<FaEnvelope className="fs-5 ms-4 me-2 text-dark" />
													<a
														className="text-primary fw-bold fs-6 me-3"
														rel="noreferrer"
														target="_blank"
														href={`mailto:${appoint?.madeToFK?.contact?.orgEmail}`}
													>
														{appoint?.madeToFK?.contact?.orgEmail}
													</a>
												</>
											)}
										</div>
										<div>
											{appoint?.madeToFK?.contact?.phone && (
												<>
													<FaPhoneSquareAlt className="fs-5 ms-4 me-2 text-dark" />
													<a
														className="text-primary fw-bold fs-6 me-3"
														rel="noreferrer"
														target="_blank"
														href={`tel:+${appoint?.madeToFK?.contact?.phone}`}
													>
														{appoint?.madeToFK?.contact?.phone}
													</a>
												</>
											)}
											{appoint?.madeToFK?.contact?.anthorPhone && (
												<>
													<FaPhoneSquareAlt className="fs-5 ms-4 me-2 text-dark" />
													<a
														className="text-primary fw-bold fs-6 me-3"
														target="_blank"
														rel="noreferrer"
														href={`tel:+${appoint?.madeToFK?.contact?.anthorPhone}`}
													>
														{appoint?.madeToFK?.contact?.anthorPhone}
													</a>
												</>
											)}
										</div>
										<div>
											{appoint?.madeToFK?.contact?.facebook && (
												<>
													<FaFacebookSquare className="fs-5 ms-4 me-2 text-dark" />
													<a
														className="text-primary fw-bold fs-6 me-3"
														rel="noreferrer"
														target="_blank"
														href={`${appoint?.madeToFK?.contact?.facebook}`}
													>
														Facebook Profile
													</a>
												</>
											)}
											{appoint?.madeToFK?.contact?.linkedin && (
												<>
													<FaLinkedin className="fs-5 ms-4 me-2 text-dark" />
													<a
														className="text-primary fw-bold fs-6"
														rel="noreferrer"
														target="_blank"
														href={`${appoint?.madeToFK?.contact?.linkedin}`}
													>
														LinkedIn Profile
													</a>
												</>
											)}
										</div>
										<div>
											{appoint?.madeToFK?.contact?.address && (
												<>
													<FaMapMarkerAlt className="fs-5 ms-4 me-2 text-dark" />
													<span className="text-primary fw-bold fs-6 me-3">
														{appoint?.madeToFK?.contact?.address}
													</span>
												</>
											)}
										</div>
									</div>
								</Accordion.Body>
							</Accordion.Item>
						))}
					</Accordion>
				</>
			)}
		</>
	);
}
