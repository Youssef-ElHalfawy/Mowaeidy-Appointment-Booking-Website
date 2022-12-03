import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import momentPlugin from "@fullcalendar/moment";
import { useDispatch, useSelector } from "react-redux";
import { getAllAppointmentsOrg } from "../store/reducer/appointSlice";

export default function OrgViewCalneder({ organizer }) {
	const { appointments, isDone } = useSelector((state) => state.appointReducer);
	const dispatch = useDispatch();

	const navigate = useNavigate();
	const [eventInfo, setEventInfo] = useState();
	let now = new Date();
	let availTime = new Date();
	availTime = availTime.setMonth(now.getMonth() + 1);

	// setting calender events
	const [organizerEvents, setOrganizerEvents] = useState([]);
	const events = [
		// denay access to previous times
		{
			start: new Date("1822-01-01"),
			end: now,
			display: "background",
			backgroundColor: "gray",
		},
		// denay access to times after one month
		{
			start: availTime,
			end: new Date("3022-01-01"),
			display: "background",
			backgroundColor: "gray",
		},
	];

	const businessHours = {
		daysOfWeek: organizer?.availDays,
		startTime: organizer?.availHours?.startTime, // a start time
		endTime: organizer?.availHours?.endTime, // an end time
	};

	const addApp = (info) => {
		if (localStorage.getItem("userId")) {
			if (!info.allDay && info.start > now && info.end < availTime) {
				setEventInfo(info);
				navigate("/organizer/view/addAppointment");
			}
		} else {
			navigate("/login");
		}
	};
	useEffect(() => {
		dispatch(getAllAppointmentsOrg(organizer?._id));
		// eslint-disable-next-line
	}, []);
	useEffect(() => {
		if (isDone) setOrgAppointments();
		// eslint-disable-next-line
	}, [isDone]);
	// denay access to current organizer event
	const setOrgAppointments = () => {
		// eslint-disable-next-line
		appointments?.map((oneApp) => {
			setOrganizerEvents((organizerEvents) => [
				...organizerEvents,
				{
					start: oneApp?.appStartDateTime,
					end: oneApp?.appEndDateTime,
					display: "background",
					title: "occupied",
					backgroundColor: "gray",
					id: oneApp?.appID,
				},
			]);
		});
	};

	return (
		<>
			{isDone && (
				<div>
					<FullCalendar
						plugins={[
							daygridPlugin,
							interactionPlugin,
							timeGridPlugin,
							momentPlugin,
						]}
						firstDay="6" //starts with saturday
						allDaySlot={false}
						selectConstraint={"businessHours"}
						selectOverlap={false}
						views={["dayGridMonth", "timeGridWeek", "timeGridDay"]} //the avail views
						headerToolbar={{
							start: "today prev next",
							end: "dayGridMonth timeGridWeek timeGridDay",
						}}
						selectMirror={true} //placeholder
						events={(events, organizerEvents)} //show events in calender
						businessHours={businessHours}
						selectable //enable select date
						select={addApp} //selected date callback
						// initialView={"timeGridFourDay"}
					/>
					<Outlet context={{ eventInfo, organizer }} />
				</div>
			)}
		</>
	);
}
