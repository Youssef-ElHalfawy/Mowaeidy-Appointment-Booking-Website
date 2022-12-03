import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { usersAPI } from "../API/AdminPanelApi";
import { AiFillEdit } from "react-icons/ai";
import { Outlet, useNavigate } from "react-router-dom";

export default function UsersData() {
	const navigate = useNavigate();
	const [users, setUsers] = useState([]);
	const [userToUpdate, setUserToUpdate] = useState("");
	const { getUsers } = usersAPI;
	// functions to handle data
	const getAllUsers = async () => {
		try {
			const res = await getUsers();
			setUsers(res.data);
		} catch (error) {
			console.log(error);
		}
	};
	const editUser = (userID) => {
		setUserToUpdate(userID);
		navigate("/adminpanel/users/edit");
	};

	// loading data
	useEffect(() => {
		getAllUsers();
		// eslint-disable-next-line
	}, []);
	return (
		<div>
			{/* table header */}
			<div className="container text-center my-3">
				<h2 className="text-primary">Users</h2>
			</div>
			<Outlet context={userToUpdate} />

			{/* Table */}
			<Table
				responsive
				className="container mt-3 text-center"
				bordered
				hover
				variant="secondary"
			>
				<thead>
					<tr className="align-middle">
						{/* <th>ID</th> */}
						<th>First Name</th>
						<th>Last Name</th>
						<th>Email</th>
						<th>City</th>
						<th>Phone</th>
						<th>DoB</th>
						<th>Is Organier</th>
						<th>commited</th>
						<th>Appointments</th>
						<th>Status</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{users &&
						users.map((user, index) => {
							return (
								<tr key={index}>
									{/* <td>{user?.id}</td> */}
									<td>{user?.firstName}</td>
									<td>{user?.lastName}</td>
									<td>{user?.email}</td>
									<td>{user?.city}</td>
									<td>{user?.phone}</td>
									<td>
										{user.dateOfBirth
											? user?.dateOfBirth?.slice(
													0,
													user?.dateOfBirth.indexOf("T")
											  )
											: "no DOB"}
									</td>
									<td>{user?.organizer.toString()}</td>
									<td>{user?.commited}</td>
									<td>{user?.numberOfAppointment}</td>
									<td>{user?.status}</td>
									<td>
										<button
											className="btn border-0 p-0"
											onClick={() => editUser(user?._id)}
										>
											<AiFillEdit className="fs-4 text-danger" />
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
