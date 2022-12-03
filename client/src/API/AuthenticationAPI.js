import axios from "axios";
const baseUrl = "http://localhost:5000";

const addNewUser = async (user) => {
	try {
		const res = await axios.post(`${baseUrl}/user/signUp`, user);
		return res;
	} catch (error) {
		console.log(error);
	}
};
const loginUser = async (user) => {
	try {
		const res = await axios.post(`${baseUrl}/user/signIn`, user);
		return res;
	} catch (e) {
		console.log(e);
	}
};
const addNewOrganizer = async (organizer) => {
	try {
		const res = await axios.post(
			`${baseUrl}/organizer/organizerSignUp`,
			organizer
		);
		return res;
	} catch (error) {
		console.log(error);
	}
};

const getInudstries = async () => {
	try {
		const res = await axios.get(`${baseUrl}/adminpanel/industries`);
		return res;
	} catch (e) {
		console.log(e);
	}
};

export const userAPI = {
	addNewUser,
	loginUser,
};
export const organizerAPI = {
	getInudstries,
	addNewOrganizer,
};
