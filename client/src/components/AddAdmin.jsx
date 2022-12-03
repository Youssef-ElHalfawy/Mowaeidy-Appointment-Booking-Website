import React, { useEffect, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { adminsAPI } from "../API/AdminPanelApi";
import { AiOutlineClose } from "react-icons/ai";

export default function AddAdmin() {
	const { addAdmin } = adminsAPI;
	const [msg, setMsg] = useState("");
	const navigate = useNavigate();
	const [isError, setIsError] = useState(true);
	const [alert, setAlert] = useState(false);
	const [formValues, setFormValues] = useState({
		name: "",
		email: "",
		password: "",
		copassword: "",
	});
	const { copassword, ...newAdmin } = formValues;
	const [err, setErr] = useState({
		name: null,
		email: null,
		password: null,
		copassword: null,
	});

	// checking errors functions
	const checkerrors = () => {
		if (
			err.name === null &&
			err.email === null &&
			err.password === null &&
			err.copassword === null &&
			formValues.name !== "" &&
			formValues.email !== "" &&
			formValues.password !== "" &&
			formValues.copassword !== ""
		) {
			setIsError(false);
		} else {
			setIsError(true);
		}
	};
	let setErrorsFunc = (e) => {
		setFormValues({
			...formValues,
			[e.target.name]: e.target.value,
		});
		setErr({
			...err,
			[e.target.name]: null,
		});
	};
	const changeHandler = (e) => {
		let regex = /^[\w=-]+@[\w-]+[.]+[\w]{2,3}$/;
		switch (e.target.name) {
			case "name":
				if (e.target.value.length <= 3) {
					setErr({
						...err,
						[e.target
							.name]: `${e.target.name} length must be more than 3 charaters`,
					});
				} else {
					setErrorsFunc(e);
				}
				break;
			case "email":
				if (!e.target.value.match(regex)) {
					setErr({
						...err,
						[e.target
							.name]: `${e.target.name} must match example@something.com`,
					});
				} else {
					setErrorsFunc(e);
				}
				break;
			case "password":
				if (e.target.value.length <= 8) {
					setErr({
						...err,
						[e.target
							.name]: `${e.target.name} length must be more than 8 charaters`,
					});
				} else {
					setErrorsFunc(e);
				}
				break;
			case "copassword":
				if (e.target.value !== formValues.password) {
					setErr({
						...err,
						[e.target.name]: `password doesn't match`,
					});
				} else {
					setErrorsFunc(e);
				}
				break;
			default:
				break;
		}
	};
	useEffect(() => {
		checkerrors();
		// eslint-disable-next-line
	}, [err]);
	// adding functions
	const submit = () => {
		add(newAdmin);
	};
	const add = async (newAdmin) => {
		try {
			let adminExists = await addAdmin(newAdmin);
			console.log(adminExists);
			if (adminExists) {
				setMsg("admin already exists");
				setAlert(true);
			} else {
				setMsg("admin added");
				setAlert(true);
				setTimeout(() => {
					navigate("/adminpanel/admins");
				}, 3000);
			}
		} catch (error) {
			console.log(error);
		}
	};
	// exit function
	const exit = () => {
		navigate("/adminpanel/admins");
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
				<h4 className="text-end py-0 text-white">Add Admin</h4>
				<Form className="my-4">
					<Form.Group className="mb-3" controlId="formBasicName">
						{/* <Form.Label>Name</Form.Label> */}
						<Form.Control
							name="name"
							onChange={changeHandler}
							type="text"
							placeholder="Admin name"
						/>
						{err.name && (
							<Form.Text className="text-danger">{err.name}</Form.Text>
						)}
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						{/* <Form.Label>Email address</Form.Label> */}
						<Form.Control
							name="email"
							onChange={changeHandler}
							type="email"
							placeholder="Admin e-mail"
						/>
						{err.email && (
							<Form.Text className="text-danger">{err.email}</Form.Text>
						)}
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicPassword">
						{/* <Form.Label>Password</Form.Label> */}
						<Form.Control
							name="password"
							onChange={changeHandler}
							type="password"
							placeholder="Admin password"
						/>
						{err.password && (
							<Form.Text className="text-danger">{err.password}</Form.Text>
						)}
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicCoPassword">
						{/* <Form.Label>Confirm Password</Form.Label> */}
						<Form.Control
							name="copassword"
							onChange={changeHandler}
							type="password"
							placeholder="Rewrite Admin password"
						/>
						{err.copassword && (
							<Form.Text className="text-danger">{err.copassword}</Form.Text>
						)}
					</Form.Group>
					<Button
						variant="warning"
						className={isError ? "disabled w-100" : "w-100"}
						onClick={submit}
					>
						Add
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
