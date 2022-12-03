import React, { useState } from "react";
import { useEffect } from "react";
import { Form, Col, Row, Alert } from "react-bootstrap";
//import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import "../css/register.css";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { userAPI } from "../API/AuthenticationAPI";
export default function RegisterUser() {
	//const dispatch = useDispatch();
	const { addNewUser } = userAPI;
	const [msg, setMsg] = useState("");
	const [alert, setAlert] = useState();
	const [alertColor, setAlertColor] = useState();
	const navigate = useNavigate();
	const cities = [
		"Alexandria",
		"Assiut",
		"Aswan",
		"Beheira",
		"Bani Suef",
		"Cairo",
		"Daqahliya",
		"Damietta",
		"Fayyoum",
		"Gharbiya",
		"Giza",
		"Helwan",
		"Ismailia",
		"Kafr El Sheikh",
		"Luxor",
		"Marsa Matrouh",
		"Minya",
		"Monofiya",
		"New Valley",
		"North Sinai",
		"Port Said",
		"Qalioubiya",
		"Qena",
		"Red Sea",
		"Sharqiya",
		"Sohag",
		"South Sinai",
		"Suez",
		"Tanta",
	];
	const nextRegisteration = async (data) => {
		let newUser = { ...data, organizer: check };
		try {
			let res = await addNewUser(newUser);
			if (res.data.message === "Email Exist") {
				setMsg("Email Exists");
				setAlertColor("danger");
				setAlert(true);
			} else if (res?.data?.message === "catch signUp error") {
				setMsg("try again later");
				setAlertColor("danger");
				setAlert(true);
			} else if (res?.data?.message === "userAdd sucessfully") {
				const userId = res?.data?.savedUser?._id;
				localStorage.setItem("userId", res?.data?.savedUser?._id);
				localStorage.setItem("token", res?.data?.token);
				localStorage.setItem("userId", res?.data?.savedUser?._id);
				setMsg("user added");
				setAlertColor("success");
				setAlert(true);
				setTimeout(() => {
					navigate("/signUpOrganizer", { state: { id: userId } });
				}, 3000);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const loginRefHandler = () => {
		navigate("/Login");
	};
	const {
		register,
		formState: { errors },
		handleSubmit,
		watch,
	} = useForm();
	const password = useRef({});
	password.current = watch("password", "");
	const [check, setCheck] = useState(false);
	const organizerCheckHandler = (e) => {
		if (e.target.checked) {
			setCheck(true);
		} else {
			setCheck(false);
		}
	};
	const onSubmit = (data) => {
		add(data);
		//console.log(data)
	};
	const add = async (data) => {
		console.log(data);
		console.log(typeof data.dateOfBirth);
		let newUser = { ...data, organizer: check };
		try {
			let res = await addNewUser(newUser);
			if (res.data.message === "Email Exist") {
				setMsg("Email Exists");
				setAlertColor("danger")
				setAlert(true);
			} else if (res?.data?.message === "catch signUp error") {
				setMsg("try again later");
				setAlertColor("danger")
				setAlert(true);
			} else if (res?.data?.message === "userAdd sucessfully") {
				localStorage.setItem("token", res?.data?.token);
				localStorage.setItem("userId", res?.data?.savedUser?._id);
				setMsg("user added");
				setAlertColor("success");
				setAlert(true);
				setTimeout(() => {
					navigate("/home");
				}, 3000);
			}
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {}, [check]);
	return (
		<div className=" container container-register">
			<div className="row">
				<div className="col-lg-4 col-md-6 col-sm-6">
					<img
						src="/Assets/Images/register.png"
						alt="register"
						className="booster-register"
					></img>
				</div>
				<div className="col-sm-6 col-md-6 col-lg-8 mt-5 form">
					<div className="mb-5">
						<h1 className="text-dark fs-1">
							Welcome To <span className="title fs-1">Mowaidy</span>
						</h1>
						<span className="text-secondary fs-6 mt-1">
							Register your account
						</span>
					</div>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<Row className="row mx-5">
							<Col sm={12} lg={6}>
								<span className="label">First Name</span>
								<Form.Control
									className="fields"
									type="text"
									name="firstName"
									placeholder="John"
									{...register("firstName", {
										required: "firstName is Required",
										minLength: {
											value: 3,
											message: "firstName must be at least 3 character",
										},
										maxLength: {
											value: 10,
											message: "firstName must be less than 11 character ",
										},
									})}
								/>
								{errors.firstName && (
									<p className="text-danger fw-semibold">
										{errors.firstName?.message}
									</p>
								)}
							</Col>
							<Col sm={12} lg={6} className="mt-lg-0 mt-3">
								<label className="label">Last Name</label>
								<Form.Control
									className="fields"
									type="text"
									name="lastName"
									placeholder="schetman"
									{...register("lastName", {
										required: "lastName is Required",
										minLength: {
											value: 3,
											message: "lastName must be at least 3 letters",
										},
										maxLength: {
											value: 15,
											message: "lastName must be less than 16 letter ",
										},
									})}
								/>
								{errors.lastName && (
									<p className="text-danger fw-semibold">
										{errors.lastName?.message}
									</p>
								)}
							</Col>
						</Row>
						<Row className="row mx-5 mt-4">
							<Col sm={12} lg={6}>
								<div className="radios mt-3">
									<h6 className="label">Gender</h6>
									<div className="gender-radio mt-3">
										{["radio"].map((type) => (
											<div key={`inline-${type}`} className="mb-3 ">
												<Form.Check
													{...register("gender", {
														required: "please select gender",
													})}
													inline
													label="Male"
													name="gender"
													value={"male"}
													type={type}
													id={`inline-${type}-1`}
												/>
												<Form.Check
													{...register("gender", {
														required: "please select gender",
													})}
													inline
													label="Female"
													name="gender"
													value={"female"}
													type={type}
													id={`inline-${type}-2`}
												/>
											</div>
										))}
									</div>
									<div>
										{errors.gender && (
											<p className="text-danger fw-semibold">
												{errors.gender?.message}
											</p>
										)}
									</div>
								</div>
							</Col>
							<Col sm={12} lg={6} className="mt-lg-0 mt-3">
								<label className="label">E-mail</label>
								<Form.Control
									className="fields"
									type="text"
									name="email"
									placeholder="hassan@example.com"
									{...register("email", {
										required: "Email is Required",
										pattern: {
											// eslint-disable-next-line
											value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
											message: "Please enter a valid email",
										},
									})}
								/>
								{errors.email && (
									<p className="text-danger fw-semibold">
										{errors.email?.message}
									</p>
								)}
							</Col>
						</Row>

						<Row className="row mx-5 mt-2">
							<Col sm={12} lg={6}>
								<label className="label">Phone</label>
								<Form.Control
									placeholder="+201550335767"
									type="text"
									name="phone"
									className="fields"
									{...register("phone", {
										required: "Phone is Required",
										minLength: {
											value: 8,
											message: "Phone Number Must be more than 8",
										},
										maxLength: {
											value: 15,
											message: "Phone Number Mustn't be more than 8",
										},
										pattern: {
											value: /^01[0-2,5]{1}[0-9]{8}$/,
											message: "Please enter a valid Phone number",
										},
									})}
								/>
								{errors.phone && (
									<p className="text-danger fw-semibold">
										{errors.phone?.message}
									</p>
								)}
							</Col>
							<Col sm={12} lg={6} className="mt-lg-0 mt-3">
								<label className="label">City</label>
								<Form.Select
									aria-label="Select Your City"
									type="text"
									name="city"
									className="fields"
									{...register("city", {
										required: "please select your city",
									})}
								>
									{cities &&
										cities.map((city, index) => {
											return <option key={index}>{city}</option>;
										})}
								</Form.Select>

								{errors.city && (
									<p className="text-danger">{errors.city?.message}</p>
								)}
							</Col>
						</Row>
						<Row className="row mx-5 mt-4">
							<Col sm={12} lg={6}>
								<label className="label">password</label>
								<Form.Control
									placeholder="write strong passcode"
									type="password"
									name="password"
									className="fields"
									{...register("password", {
										required: "",
										minLength: {
											value: 8,
											message: "Password must have at least 8 characters",
										},
										pattern: {
											value: /^[a-zA-Z0-9]{8,30}$/,
											message: "Password is invalid",
										},
									})}
								/>
								{errors.password && (
									<p className="text-danger fw-semibold">
										{errors.password.message}
									</p>
								)}
							</Col>
							<Col sm={12} lg={6} className="mt-lg-0 mt-3">
								<label className="label">Re-password</label>
								<Form.Control
									placeholder="confirm your password"
									type="password"
									name="cpassword"
									className="fields"
									{...register("cpassword", {
										validate: (value) =>
											value === password.current ||
											"The passwords do not match",
									})}
								/>
								{errors.cpassword && (
									<p className="text-danger fw-semibold">
										{errors.cpassword?.message}
									</p>
								)}
							</Col>
						</Row>
						<Row className="mx-5 mt-4">
							<Col sm={12} lg={6} className="">
								<label className="label">Date Of Birth</label>
								<Form.Control
									placeholder="write strong passcode"
									type="date"
									name="dateOfBirth"
									className="fields"
									{...register("dateOfBirth", {})}
								/>
								{errors?.dateOfBirth && (
									<p className="text-danger">{errors?.dateOfBirth?.message}</p>
								)}
							</Col>
							<Col sm={12} lg={6} className="mt-lg-0 align-self-end mt-3">
								<p className=" check1 fs-6 ">
									Sign up as an
									<span className="check">ORGANIZER</span> ?
									<input
										className="mx-2"
										type="checkbox"
										id="orgCheck"
										onClick={organizerCheckHandler}
									></input>
								</p>
							</Col>
						</Row>

						<Row className="row mx-5 my-4 d-flex">
							<Col sm={12} lg={6}>
								<p className="already">
									Already have an account?
									{/* eslint-disable-next-line */}
									<a className="login" href="#" onClick={loginRefHandler}>
										{"	LOGIN"}
									</a>
								</p>
							</Col>
							<Col sm={12} lg={6} className="mt-lg-0 mt-3">
								{check === true ? (
									<button
										className="btn1 btn-primary mx-2 rounded-4 "
										onClick={handleSubmit(nextRegisteration)}
									>
										Next
									</button>
								) : (
									<button
										className="btn2 btn-warning mx-2 rounded-4 "
										onClick={handleSubmit(onSubmit)}
									>
										Finish
									</button>
								)}
								{alert && (
									<Alert
										className="position-fixed text-center mx-3 bottom-0 start-0 w-25"
										variant={alertColor}
									>
										{msg}
									</Alert>
								)}
							</Col>
						</Row>
					</Form>
				</div>
			</div>
		</div>
	);
}
