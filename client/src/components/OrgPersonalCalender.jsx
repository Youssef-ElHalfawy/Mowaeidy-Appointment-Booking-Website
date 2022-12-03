import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import momentPlugin from "@fullcalendar/moment";
import { useDispatch, useSelector } from "react-redux";
import { getAllAppointmentsOrg } from "../store/reducer/appointSlice";

export default function OrgPersonalCalender({ organizer }) {
	const dispatch = useDispatch();
	const { appointments, isDone } = useSelector((state) => state.appointReducer);
	// const [eventInfo, setEventInfo] = useState();

	// setting calender events
	const [organizerEvents, setOrganizerEvents] = useState([]);

	const businessHours = {
		daysOfWeek: organizer?.availDays,
		startTime: organizer?.availHours?.startTime, // a start time
		endTime: organizer?.availHours?.endTime, // an end time
	};
	// const handleSelect = (info) => {
	// 	console.log(info);
	// 	const { start, end } = info;
	// 	const eventNamePrompt = prompt("Enter, event name");
	// 	if (eventNamePrompt) {
	// 		setEvents([
	// 			...events,
	// 			{
	// 				start,
	// 				end,
	// 				title: eventNamePrompt,
	// 				id: uuid(),
	// 			},
	// 		]);
	// 	}
	// 	console.log(events);
	// };
	useEffect(() => {
		dispatch(getAllAppointmentsOrg(organizer?._id));
		// eslint-disable-next-line
	}, []);
	useEffect(() => {
		if (isDone) setOrgAppointments();
		// eslint-disable-next-line
	}, [isDone]);

	// show current organizer event
	const setOrgAppointments = () => {
		let appColor;
		// eslint-disable-next-line
		appointments?.map((oneApp) => {
			if (oneApp?.status === "pending") {
				appColor = "yellow";
			} else if (oneApp?.status === "confirmed") {
				appColor = "green";
			}
			setOrganizerEvents((organizerEvents) => [
				...organizerEvents,
				{
					start: oneApp?.appStartDateTime,
					end: oneApp?.appEndDateTime,
					backgroundColor: appColor,
					title: oneApp?.madeByFK?.lastName,
					id: oneApp?.appID,
				},
			]);
		});
	};

	return (
		<>
			{isDone && (
				<FullCalendar
					plugins={[
						daygridPlugin,
						interactionPlugin,
						timeGridPlugin,
						momentPlugin,
					]}
					firstDay="6" //starts with saturday
					allDaySlot={false} //to hide all day slot
					dayMaxEventRows={true}
					views={["dayGridMonth", "timeGridWeek", "timeGridDay"]} //the avail views
					eventTimeFormat={{
						hour: "numeric",
						minute: "2-digit",
						meridiem: "short",
					}}
					headerToolbar={{
						start: "today prev next",
						end: "dayGridMonth timeGridWeek timeGridDay",
					}}
					events={organizerEvents} //show events in calender
					businessHours={businessHours} //apply bussines hours
					// eventClick={addApp}
					// initialView={"timeGridFourDay"}
				/>
			)}
			{/* <Outlet context={{ eventInfo, organizer }} /> */}
		</>
	);
}
