import React, { useEffect, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useNavigate, useOutletContext } from "react-router-dom";
import { usersAPI } from "../API/AdminPanelApi";
import { AiOutlineClose } from "react-icons/ai";

export default function EditUser() {
	const navigate = useNavigate();
	const userToUpdate = useOutletContext();
	const { getOneUser, editUserStatus } = usersAPI;
	const [msg, setMsg] = useState("");
	const [alert, setAlert] = useState(false);
	const [user, setUser] = useState({});
	const [statusValue, setStatusValue] = useState({});

	useEffect(() => {
		getUser();
		setStatusValue({ status: user.status });
		// eslint-disable-next-line
	}, []);

	// functions to handle data
	const changeSelected = (e) => {
		setStatusValue({ status: e.target.value });
	};
	const getUser = async () => {
		try {
			let res = await getOneUser(userToUpdate);
			setUser(res.data);
		} catch (err) {
			setMsg("please try again");
			setAlert(true);
		}
	};
	// editing functions
	const edit = async () => {
		try {
			let res = await editUserStatus(user.email, statusValue);
			if (res.data.message === "user updated") {
				setMsg("user edited");
				setAlert(true);
				setTimeout(() => {
					navigate("/adminpanel/users");
				}, 3000);
			} else {
				setMsg("please try again");
				setAlert(true);
			}
		} catch (error) {
			setMsg("please try again");
			setAlert(true);
		}
	};
	const submit = () => {
		edit();
	};
	// exit function
	const exit = () => {
		navigate("/adminpanel/users");
	};
	return (
		<div className="flying-container">
			<div className="flying-child d-flex flex-column justify-content-between align-items-center">
				<button
					className="btn p-0 text-end align-self-end px-3 fs-4 text-white"
					onClick={exit}
				>
					<AiOutlineClose />
				</button>
				<h4 className="text-end py-0 text-white">Edit User Status</h4>
				<Form className="my-4">
					<Form.Group className="mb-3" controlId="formBasicCoPassword">
						<Form.Label className="text-white mx-3">Name :</Form.Label>
						<Form.Label className="text-white">{user.firstName}</Form.Label>
						<Form.Label className="text-white mx-2">{user.lastName}</Form.Label>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicCoPassword">
						<Form.Label className="text-white mx-3">Email :</Form.Label>
						<Form.Label className="text-white">{user.email}</Form.Label>
					</Form.Group>
					<Form.Group className="my-3">
						<Form.Label className="text-white">Status</Form.Label>
						<Form.Select id="dropdown" onChange={changeSelected}>
							<option disabled selected value={user.status}>
								{user.status}
							</option>
							<option value="active">active</option>
							<option value="panned">panned</option>
							<option value="deactivated">deactivated</option>
						</Form.Select>
					</Form.Group>
					<Button variant="warning" className="w-100" onClick={submit}>
						Edit
					</Button>
				</Form>
			</div>
			{alert && (
				<Alert
					className="position-fixed text-center mx-3 bottom-0 start-0 w-25"
					variant="success"
				>
					{msg}
				</Alert>
			)}
		</div>
	);
}
