import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { blogAPI } from "../API/AdminPanelApi";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteOutline, MdPersonAddAlt } from "react-icons/md";
import { Outlet, useNavigate } from "react-router-dom";

export default function BlogsData() {
	const navigate = useNavigate();
	const [blogs, setBlogs] = useState([]);
	const [msg, setMsg] = useState([]);
	const [blogToUpdate, setBlogToUpdate] = useState("");
	const { getBlogs, delBlog } = blogAPI;
	// functions to handle data
	const getAllBlogs = async () => {
		try {
			const res = await getBlogs();
			setBlogs(res.data);
		} catch (error) {
			console.log(error);
		}
	};
	const deleteBlog = async (blogId) => {
		try {
			const res = await delBlog(blogId);
			setMsg(res.message);
		} catch (error) {
			console.log(error);
		}
	};
	const editBlog = (blogId) => {
		setBlogToUpdate(blogId);
		navigate("/adminpanel/blogs/edit");
	};

	// loading data
	useEffect(() => {
		getAllBlogs();
		// eslint-disable-next-line
	}, [msg]);
	return (
		<div>
			{/* table header */}
			<div className="container text-center my-3">
				<h2 className="text-primary">Blogs</h2>
			</div>
			{/* Add button */}
			<div className="container d-flex justify-content-end ">
				<a className="btn border-0 p-0" href="blogs/add">
					<MdPersonAddAlt className="fs-4 text-info" />
				</a>
			</div>
			<Outlet context={blogToUpdate} />

			{/* Table */}
			<Table
				responsive
				className="container mt-3 text-center"
				bordered
				hover
				variant="secondary"
			>
				<thead>
					<tr>
						<th>Header</th>
						<th>Body</th>
						<th>Date</th>
						<th>Picture</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody className="align-middle">
					{blogs &&
						blogs.map((blog, index) => {
							return (
								<tr key={index} className="">
									<td>{blog?.blogHeader}</td>
									<td>{blog?.blogBody?.slice(0, 200)}</td>
									<td>
										{blog?.blogDate.slice(0, blog?.blogDate.indexOf("T"))}
									</td>
									<td>
										<img
											src={blog?.blogPicture}
											alt="badLink"
											className="table-img"
										/>
									</td>
									<td>
										<button
											className="btn border-0 p-0"
											onClick={() => editBlog(blog?._id)}
										>
											<AiFillEdit className="fs-4 text-danger" />
										</button>
										<button
											className="btn border-0 p-0"
											onClick={() => deleteBlog(blog?._id)}
										>
											<MdDeleteOutline className="fs-4 text-danger" />
										</button>
									</td>
								</tr>
							);
						})}
				</tbody>
			</Table>
		</div>
	);
}
