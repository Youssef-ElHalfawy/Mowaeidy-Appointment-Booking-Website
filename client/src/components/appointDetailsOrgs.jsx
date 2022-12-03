import { Accordion } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getAllAppointmentsOrg,
	editAppointment,
	deleteAppointmentOrg,
} from "../store/reducer/appointSlice";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { FaPhoneSquareAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function OrgAppointDetails({ organizer }) {
	const { appointments } = useSelector((state) => state.appointReducer);
	const dispatch = useDispatch();

	const [renderChanges, setRenderChanges] = useState(0); //just to rerender the changes by actions

	useEffect(() => {
		dispatch(getAllAppointmentsOrg(organizer?._id));
		// eslint-disable-next-line
	}, [renderChanges]);

	const editHandler = (idArg, appointArg) => {
		appointArg = { ...appointArg, status: "confirmed" }; //can't change status directly so we spread
		dispatch(editAppointment({ idArg, appointArg })); //args names must match the names in CRUD
		setRenderChanges(renderChanges + 1);

		// fire a send email event to --> madeByFK
		// toastify success after
	};

	const cancelHandler = (appointId) => {
		dispatch(deleteAppointmentOrg(appointId));
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
			{appointments.length === 0 ? (
				<p className="lead fs-3 text-center">No Booked Appointments Yet!</p>
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
												{appoint?.madeByFK?.firstName}{" "}
												{appoint?.madeByFK?.lastName}
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
											{appoint?.madeByFK?.firstName}{" "}
											{appoint?.madeByFK?.lastName}{" "}
										</span>
										has booked an appointment with you about
										<span className="text-primary fw-bold mx-1">
											{appoint?.description}{" "}
										</span>
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
										{appoint?.status === "pending" && (
											<button
												onClick={() => {
													editHandler(appoint._id, appoint);
												}}
												className="btn btn-success py-0 px-2 mx-3 rounded-pill"
											>
												Confirm
											</button>
										)}
										{currentDateTime < new Date(appoint?.allowedCancelTime) && (
											<button
												onClick={() => {
													cancelHandler(appoint._id);
												}}
												className="btn btn-danger py-0 px-2 mx-3 rounded-pill"
											>
												{appoint?.status === "pending" ? "Reject" : "Cancel"}
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
											{" "}
											{appoint?.place}{" "}
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
										{appoint?.answer && (
											<>
												{" "}
												and the answer to your question is
												<span className="text-primary fw-bold mx-1">
													{appoint?.answer}
												</span>
											</>
										)}
										.
									</div>
									<div>
										- Contact Info for
										<span className="text-primary fw-bold mx-1">
											{" "}
											{appoint?.madeByFK?.firstName}{" "}
											{appoint?.madeByFK?.lastName}
										</span>
										:
										<div>
											{appoint?.madeByFK?.email && (
												<>
													<FaEnvelope className="fs-5 ms-4 me-2 text-warning" />
													<a
														className="text-primary fw-bold fs-6 me-3"
														rel="noreferrer"
														target="_blank"
														href={`mailto:${appoint?.madeByFK?.email}`}
													>
														{appoint?.madeByFK?.email}
													</a>
												</>
											)}
										</div>
										<div>
											{appoint?.madeByFK?.phone && (
												<>
													<FaPhoneSquareAlt className="fs-5 ms-4 me-2 text-warning" />
													<a
														className="text-primary fw-bold fs-6 me-3"
														rel="noreferrer"
														target="_blank"
														href={`tel:+${appoint?.madeByFK?.phone}`}
													>
														{appoint?.madeByFK?.phone}
													</a>
												</>
											)}
										</div>
										<div>
											{appoint?.madeByFK?.city && (
												<>
													<FaMapMarkerAlt className="fs-5 ms-4 me-2 text-warning" />
													<span className="text-primary fw-bold fs-6 me-3">
														{appoint?.madeByFK?.city}
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
