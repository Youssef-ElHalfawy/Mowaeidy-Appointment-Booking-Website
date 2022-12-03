import axios from "axios";

const baseUrl = "http://localhost:5000/organizer/appointments";
let addAppointment = async (appointment) => {
	try {
		const res =axios.post(`${baseUrl}/add`, appointment);
		return res;
	} catch (err) {
		return "error";
	}
};
let getDisapledAppointments = async (orgID) => {
	try {
		return axios.get(`${baseUrl}/view?id=${orgID}`);
	} catch (err) {
		return "error";
	}
};

export const appointmentAPI = {
	addAppointment,
	getDisapledAppointments,
};
