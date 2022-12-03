import axios from "axios";
const baseUrl = "http://localhost:5000/contactus";

const sendMsg = async (data) => {
	try {
		const res = await axios.post(`${baseUrl}`, data);
		return res;
	} catch (error) {
		console.log(error);
	}
};
export const contactAPI = {
	sendMsg,
};
