import axios from "axios";

const baseUrl = "http://localhost:5000/adminpanel";
// admins
let getAdmins = () => axios.get(`${baseUrl}/admins`);
let getOneAdmin = (adminEmail) =>
	axios.get(`${baseUrl}/admins/one?email=${adminEmail}`);
let delAdmin = (adminId) =>
	axios.delete(`${baseUrl}/admins/delete?id=${adminId}`);
let addAdmin = async (admin) => {
	try {
		const res = await getOneAdmin(admin.email);
		if (res.data.message !== "there are no admins") {
			return true;
		} else {
			axios.post(`${baseUrl}/admins/add`, admin);
			return false;
		}
	} catch (err) {}
};

// users
let getUsers = () => axios.get(`${baseUrl}/users`);
let editUserStatus = (userEmail, user) =>
	axios.put(`${baseUrl}/users/edit?email=${userEmail}`, user);
let getOneUser = (userEmail) =>
	axios.get(`${baseUrl}/users/edit?id=${userEmail}`);

// industries
let getIndustries = () => axios.get(`${baseUrl}/industries`);
let delIndustry = (IndustryId) =>
	axios.delete(`${baseUrl}/industries/delete?id=${IndustryId}`);
let addIndustry = (industry) =>
	axios.post(`${baseUrl}/industries/add`, industry);
let getOneIndustry = (industryId) =>
	axios.get(`${baseUrl}/industries/edit?id=${industryId}`);
let editIndustry = (industryId, industry) =>
	axios.put(`${baseUrl}/industries/edit?id=${industryId}`, industry);

// blogs
let getBlogs = () => axios.get(`${baseUrl}/blogs`);
let delBlog = (blogId) =>
	axios.delete(`${baseUrl}/blogs/delete?id=${blogId}`);
let addBlog = (blog) => axios.post(`${baseUrl}/blogs/add`, blog);
let getOneBlog = (blogId) =>
	axios.get(`${baseUrl}/blogs/edit?id=${blogId}`);
let editBlog = (blogId, blog) =>
	axios.patch(`${baseUrl}/blogs/edit?id=${blogId}`, blog);

//info
let editInfo = (InfoId, info) =>
	axios.put(`${baseUrl}/info/edit?id=${InfoId}`, info);

export const adminsAPI = {
	getAdmins,
	delAdmin,
	addAdmin,
};
export const usersAPI = {
	getUsers,
	editUserStatus,
	getOneUser,
};
export const industriesAPI = {
	getIndustries,
	delIndustry,
	addIndustry,
	getOneIndustry,
	editIndustry,
};
export const blogAPI = {
	getBlogs,
	delBlog,
	addBlog,
	getOneBlog,
	editBlog,
};
export const infoAPI = {
	editInfo,
};
