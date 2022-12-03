import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { adminsAPI } from "../API/AdminPanelApi";
import { MdDeleteOutline, MdPersonAddAlt } from "react-icons/md";
import { Outlet } from "react-router-dom";

export default function AdminsData() {
	const [admins, setAdmins] = useState([]);
	const [msg, setMsg] = useState([]);
	const { getAdmins, delAdmin } = adminsAPI;
	// functions to handle data
	const getAllAdmins = async () => {
		try {
			const res = await getAdmins();
			setAdmins(res.data);
		} catch (error) {
			console.log(error);
		}
	};
	const deleteAdmin = async (adminId) => {
		try {
			const res = await delAdmin(adminId);
			setMsg(res.message);
		} catch (error) {
			console.log(error);
		}
	};

	// loading data
	useEffect(() => {
		getAllAdmins();
		// eslint-disable-next-line
	}, [msg]);
	return (
		<div>
			{/* table header */}
			<div className="container text-center my-3">
				<h2 className="text-primary">Admins</h2>
			</div>
			{/* Add button */}
			<div className="container d-flex justify-content-end ">
				<a className="btn border-0 p-0" href="admins/add">
					<MdPersonAddAlt className="fs-4 text-info" />
				</a>
			</div>
			<Outlet />
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
						<th>Name</th>
						<th>Email</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{admins &&
						admins.map((admin, index) => {
							return (
								<tr key={index}>
									<td>{admin?.name}</td>
									<td>{admin?.email}</td>
									<td>
										<button
											className="btn border-0 p-0"
											onClick={() => deleteAdmin(admin?._id)}
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
