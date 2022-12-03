import React from "react";
import { Form, Col, Row, Alert, Container } from "react-bootstrap";
import "../css/register.css";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { userAPI } from "../API/AuthenticationAPI";

export default function Login() {
	const { loginUser } = userAPI;
	const [msg, setMsg] = useState("");
	const [alert, setAlert] = useState();
	const [alertColor, setAlertColor] = useState("success");
	const navigate = useNavigate();
	const [check, setCheck] = useState();
	const adminCheckHandler = (e) => {
		if (e.target.checked) {
			setCheck(true);
		} else {
			setCheck(false);
		}
	};
	const loginHandler = async (data) => {
		let userexist = { ...data, admin: check };
		try {
			let res = await loginUser(userexist);
			if (res?.data?.message === "invalid acount") {
				setMsg("invalid account");
				setAlertColor("danger");
				setAlert(true);
			} else if (res?.data?.message === "sorry you email or pass is error") {
				setMsg("invalid email or password");
				setAlertColor("danger");
				setAlert(true);
			} else if (res?.data?.message === "user is panned please contact us") {
				setMsg("user is panned please contact us");
				setAlertColor("danger");
				setAlert(true);
				setTimeout(() => {
					navigate("/contact");
				}, 3000);
			} else if (res?.data?.message === "take your token") {
				localStorage.setItem("token", res?.data?.token);
				res?.data?.userId
					? localStorage.setItem("userId", res?.data?.userId)
					: localStorage.setItem("adm", res?.data?.adm);
				setMsg("welcome");
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
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const onSubmit = (data) => {
		loginHandler(data);
	};

	return (
		<div className="login-page">
			<Row>
				<img
					src="/Assets/Images/login.png"
					alt="login"
					className="booster-login img-fluid"
				/>
			</Row>
			<Container>
				<Row>
					<Col
						xs="12"
						md="6"
						className="d-flex flex-md-column justify-content-evenly"
					>
						<div>
							<h1 className="head fs-1">Hello Again!</h1>
							<span className="text-secondary fs-6 mt-1">
								Welcome back , you've been missed!
							</span>
						</div>
					</Col>
					<Col
						xs="12"
						md="6"
						className="d-flex flex-column justify-content-evenly"
					>
						<h1 className="head fs-1  text-center mt-5">Login</h1>

						<Form
							className="border border-3 rounded-4 border-primary mt-3 mb-1 py-4 px-3"
							onSubmit={handleSubmit(onSubmit)}
						>
							<Row>
								<Col className="mb-4">
									<Form.Label className="fs-5">E-Mail</Form.Label>
									<Form.Control
										className=""
										type="text"
										name="email"
										placeholder="Enter Your Email"
										{...register("email", {
											required: "Email is Required",
											pattern: {
												value:
													/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
												message: "Please enter a valid email",
											},
										})}
									/>
									{errors.email && (
										<p className="text-danger text-semiold">
											{errors.email?.message}
										</p>
									)}
								</Col>
							</Row>

							<Row className="">
								<Col className="mb-4">
									<Form.Label className="fs-5">Password</Form.Label>
									<Form.Control
										className="fields"
										type="password"
										placeholder="Enter Your Password"
										name="password"
										{...register("password", {
											required: "you must specify password",
											minLength: {
												value: 8,
												message: "Password must have at least 8 characters",
											},
										})}
									/>
									{errors.password && (
										<p className="text-danger">{errors.password?.message}</p>
									)}
								</Col>
							</Row>
							<Row className="">
								<Col className="text-center">
									<button
										className="signIn btn  btn-warning rounded-3 w-100"
										onSubmit={loginHandler}
									>
										Sign In
									</button>
									<p className=" check1 mt-3">
										Sign in as an
										<span className="check">Admin</span> ?
										<input
											className="mx-2"
											type="checkbox"
											id="adminCheck"
											onClick={adminCheckHandler}
										></input>
									</p>
								</Col>
								{alert && (
									<Alert
										className="position-fixed text-center mx-3 bottom-0 start-0 w-25"
										variant={alertColor}
									>
										{msg}
									</Alert>
								)}
							</Row>
						</Form>
					</Col>
					<NavLink to="/SignUp">
						<h6 className="text-dark text-md-end me-2 fs-6 mb-3 text-center">
							not a member ?
							<span className="text-primary fs-6">Register Now</span>
						</h6>
					</NavLink>
				</Row>
			</Container>
		</div>
	);
}
