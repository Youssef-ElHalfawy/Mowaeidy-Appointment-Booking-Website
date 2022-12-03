import React from "react";
import { useEffect } from "react";
import { Form, Col, Row, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/register.css";
import { organizerAPI } from "../API/AuthenticationAPI";
import { useState } from "react";
export default function RegisterOrganizer() {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();
	const { state } = useLocation();
	const navigate = useNavigate();
	const { id } = state;
	const { addNewOrganizer, getInudstries } = organizerAPI;
	const [industries, setIndusrty] = useState();
	const [individual, setIndivdual] = useState(false);
	const [industryIDFK, setIndustryIDFK] = useState();
	const [allowPayment, setAllowPayment] = useState(false);
	const [msg, setMsg] = useState("");
	const [alert, setAlert] = useState();
	const [alertColor, setAlertColor] = useState("success");


	const [availHours, setAvailHours] = useState({
		startTime: "",
		endTime: "",
	});
	const [contact, setContact] = useState({
		phone: "",
		anthorPhone: "",
		orgEmail: "",
	});
	const [days, setDays] = useState({
		sat: 7,
		sun: 7,
		mon: 7,
		tue: 7,
		wed: 7,
		thu: 7,
		fri: 7,
	});

	const [daysError, setDaysError] = useState(false);
	const phoneHandler = (e) => {
		console.log(e.target.value);
		if (e.target.value !== null) {
			setContact({ ...contact, phone: e.target.value });
		}
	};
	const anthorPhoneHandler = (e) => {
		console.log(e.target.value);
		if (e.target.value !== null) {
			setContact({ ...contact, anthorPhone: e.target.value });
		}
	};
	const orgEmailHandler = (e) => {
		if (e.target.value !== null) {
			setContact({ ...contact, orgEmail: e.target.value });
		}
	};

	const startTimeHandler = (e) => {
		if (e.target.value !== null) {
			setAvailHours({ ...availHours, startTime: e.target.value });
		}
	};
	const endTimeHandler = (e) => {
		if (e.target.value !== null) {
			setAvailHours({ ...availHours, endTime: e.target.value });
		}
	};

	const getAllIndustries = async () => {
		try {
			const res = await getInudstries();
			setIndusrty(res.data);
		} catch (e) {
			console.log(e);
		}
	};
	const daysHandler = (e) => {
		setDaysError(false);
		let dayName = e.target.name;
		if (e.target.checked) {
			setDays({ ...days, [dayName]: parseInt(e.target.value) });
		} else {
			setDays({ ...days, [dayName]: 7 });
		}
	};
	const industryHandler = (e) => {
		let selectedIndustry = e.target.value;
		setIndustryIDFK(selectedIndustry);

		industries.map((industry) => {
			if (industry._id === selectedIndustry) {
				setAllowPayment(industry.allowPayment);
			}
			return industry;
		});
	};
	const indvidualHandler = (e) => {
		if (e.target.checked) {
			setIndivdual(true);
		} else {
			setIndivdual(false);
		}
	};
	const add = async (newOrganizer) => {
		try {
			const res = await addNewOrganizer(newOrganizer);
			if (res?.data?.message === "signUp error") {
				setMsg("Something Wrong ");
				setAlertColor("danger")
				setAlert(true);
			} else if (res?.data?.message === "orginzer added successfuly") {
				setMsg("orginzer added successfuly welcome");
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
	const onSubmit = (data) => {
		let userIDFK = id;
		let availDays = [];
		let keys = Object.keys(days);
		keys.map((key) => {
			if (days[key] !== 7) {
				availDays.push(days[key]);
			}
			return days;
		});
		const { amountOfRequiredDaposit, question, description, orgName, title } =
			data;
		const newOrganizer = {
			amountOfRequiredDaposit,
			description,
			orgName,
			title,
			individual,
			contact,
			question,
			availHours,
			availDays,
			industryIDFK,
			userIDFK,
		};
		if (availDays.length === 0) {
			setDaysError(true);
		} else {
			add(newOrganizer);
		}
	};
	useEffect(() => {
		getAllIndustries();
		// eslint-disable-next-line
	}, []);

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
					<Form>
						<Row className="row mx-5">
							<Col sm={12} lg={6} className="">
								<span className="label">Org Name</span>
								<Form.Control
									className="fields"
									type="text"
									name="orgName"
									placeholder="Company || Person"
									{...register("orgName", {
										required: "orgName is Required",
										minLength: {
											value: 5,
											message: "orgName must be at least 5 letters",
										},
										maxLength: {
											value: 50,
											message: "OrgName must be less than 50 letter ",
										},
									})}
								/>
								{errors.orgName && (
									<p className="text-danger fw-semibold">
										{errors.orgName.message}
									</p>
								)}
							</Col>
							<Col sm={12} lg={6} className="mt-lg-0 mt-3">
								<span className="label">Title</span>
								<Form.Control
									className="fields"
									type="text"
									name="title"
									placeholder=" Title"
									{...register("title", {
										required: "Title is Required",
										minLength: {
											value: 4,
											message: "Title must be at least 4 character",
										},
										maxLength: {
											value: 20,
											message: "Title must be less than 20 character ",
										},
									})}
								/>
								{errors.title && (
									<p className="text-danger fw-semibold">
										{errors?.title?.message}
									</p>
								)}
							</Col>
						</Row>

						{/** phones */}
						<Row className="row mx-5 mt-4">
							<Col sm={12} lg={6}>
								<label className="label">Phone</label>
								<Form.Control
									className="fields"
									type="phone"
									name="phone"
									placeholder="+20111122354"
									{...register("Phone", {
										required: "Phone is Required",
										pattern: {
											value: /^01[0-2,5]{1}[0-9]{8}$/g,
											message: "Please enter a valid Phone number",
										},
									})}
									onChange={phoneHandler}
								/>
								{errors.Phone && (
									<p className="text-danger fw-semibold">
										{errors?.Phone?.message}
									</p>
								)}
							</Col>

							<Col sm={12} lg={6} className="mt-lg-0 mt-3">
								<label className="label">
									Anthor Phone <span className="option mx-2">(optional)</span>
								</label>
								<Form.Control
									className="fields"
									type="phone"
									name="anthorPhone"
									placeholder="+20111256874"
									{...register("anthorPhone", {
										pattern: {
											value: /^01[0-2,5]{1}[0-9]{8}$/g,
											message: "Please enter a valid Phone number",
										},
									})}
									onChange={anthorPhoneHandler}
								/>
								{errors.anthorPhone && (
									<p className="text-danger fw-semibold">
										{errors?.anthorPhone?.message}
									</p>
								)}
							</Col>
						</Row>

						{/** orgEmail and description */}
						<Row className="row mx-5 mt-2">
							<Col sm={12} lg={6} className="">
								<label className="label">Org E-mail</label>
								<Form.Control
									placeholder="ITI@ddd.com"
									type="email"
									name="orgEmail"
									className="fields"
									{...register("orgEmail", {
										required: "Email is required",
										pattern: {
											value:
												/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
											message: "Please Enter Valid Email",
										},
									})}
									onChange={orgEmailHandler}
								/>
								{errors.orgEmail && (
									<p className="text-danger fw-semibold">
										{errors?.orgEmail?.message}
									</p>
								)}
							</Col>
							<Col sm={12} lg={6} className="mt-lg-0 mt-3">
								<div className="form-group">
									<label className="label">Description</label>
									<textarea
										class="field"
										rows={1}
										className="text2"
										name="description"
										placeholder="Introduce Yourself"
										{...register("description", {
											required: "You Must Describe Your Industry",
											minLength: {
												value: 20,
												message: "description must be more than 20 character",
											},
											maxLength: {
												value: 400,
												messsage: "description must be less than 400 character",
											},
										})}
									/>
									{errors.description && (
										<p className="text-danger fw-semibold">
											{errors.description?.message}
										</p>
									)}
								</div>
							</Col>
						</Row>
						<Row className="row mx-5 mt-2">
							<Col sm={12} lg={6}>
								<label className="label">Indusrty</label>
								<Form.Select
									className="fields"
									type="text"
									onChange={industryHandler}
									name="industryIDFK"
									placeholder="Fashion"
								>
									{industries &&
										industries.map((indusrty, index) => {
											return (
												<option value={indusrty._id} key={index}>
													{indusrty?.name}
												</option>
											);
										})}
								</Form.Select>
							</Col>
							<Col sm={12} lg={6} className="mt-lg-0 mt-3">
								{allowPayment && (
									<>
										<label className="label">Minimun Salary</label>
										<Form.Control
											placeholder="Enter your minimun salary"
											type="text"
											name="amountOfRequiredDaposit"
											className="fields"
											{...register("amountOfRequiredDaposit", {
												required: "please specify your salary",
											})}
										></Form.Control>
										{errors.amountOfRequiredDaposit && (
											<p className="text-danger fw-semibold">
												{errors.amountOfRequiredDaposit?.message}
											</p>
										)}
									</>
								)}
							</Col>
						</Row>

						<div className="mx-5">
							<Row className=" mt-4 mb-4">
								<Col sm={12} md={6} lg={3}>
									{" "}
									<p className="label">
										<input
											type="checkbox"
											name="sat"
											value={6}
											className="ch1 mx-2"
											onChange={daysHandler}
										></input>
										Saturday
									</p>
								</Col>
								<Col sm={12} md={6} lg={3}>
									{" "}
									<p className="label">
										<input
											type="checkbox"
											name="sun"
											value={0}
											className="ch1 mx-2"
											onChange={daysHandler}
										></input>
										Sunday
									</p>
								</Col>
								<Col sm={12} md={6} lg={3}>
									{" "}
									<p className="label">
										<input
											type="checkbox"
											name="mon"
											value={1}
											className="ch1 mx-2"
											onChange={daysHandler}
										></input>
										Monday
									</p>
								</Col>
								<Col sm={12} md={6} lg={3}>
									{" "}
									<p className="label">
										<input
											type="checkbox"
											name="tue"
											value={2}
											className="ch1 mx-2"
											onChange={daysHandler}
										></input>
										Tuesday
									</p>
								</Col>
								<Col sm={12} md={6} lg={3}>
									{" "}
									<p className="label">
										<input
											type="checkbox"
											name="wed"
											value={3}
											className="ch1 mx-2"
											onChange={daysHandler}
										></input>
										Wednesday
									</p>
								</Col>
								<Col sm={12} md={6} lg={3}>
									{" "}
									<p className="label">
										<input
											type="checkbox"
											name="thu"
											value={4}
											className="ch1 mx-2"
											onChange={daysHandler}
										></input>
										Thursday
									</p>
								</Col>
								<Col sm={12} md={6} lg={3}>
									{" "}
									<p className="label">
										<input
											type="checkbox"
											name="fri"
											value={5}
											className="ch1 mx-2"
											onChange={daysHandler}
										></input>
										Friday
									</p>
								</Col>
								{daysError && (
									<p className="text-danger fw-semibold">
										please select at least one day
									</p>
								)}
							</Row>
						</div>
						{/** Time  */}
						<Row className="row mx-5 mt-2">
							<Col sm={12} lg={6}>
								<label className="label">Start Time</label>
								<Form.Control
									type="time"
									name="startTime"
									onSelect={startTimeHandler}
									className="fields"
									{...register("startTime", {
										required: "Start Time is Required",
									})}
								/>
								{errors.startTime && (
									<p className="text-danger fw-semibold">
										{errors.startTime?.message}
									</p>
								)}
							</Col>

							<Col sm={12} lg={6} className="mt-lg-0 mt-3">
								<label className="label">End Time</label>
								<Form.Control
									type="time"
									name="endTime"
									onSelect={endTimeHandler}
									className="fields"
									{...register("endTime", {
										required: "End Time is Required",
									})}
								/>
								{errors.endTime && (
									<p className="text-danger fw-semibold">
										{errors.endTime?.message}
									</p>
								)}
							</Col>
						</Row>

						<Row className="row mx-5 mt-4">
							<Col sm={12} lg={6}>
								<div className="form-group">
									<label className="label">Question To Your Client</label>
									<textarea
										class="field"
										placeholder="Write Your Question"
										className="text"
										name="question"
										rows={3}
										{...register("question", {
											maxLength: {
												value: 100,
												messsage: "question must be less than 100 character",
											},
										})}
									></textarea>
									{errors.question && (
										<p className="text-danger fw-semibold">
											{errors.question?.message}
										</p>
									)}
									<p className=" label mt-5">
										Indvidual
										<input
											type="checkbox"
											onChange={indvidualHandler}
											className="ch1"
										></input>
									</p>
								</div>
							</Col>
							<Col className=" mx-3 col-lg-4"></Col>
						</Row>

						<Row className="row mx-5 my-4 d-flex">
							<Col className=" mx-4 col-lg-5"></Col>
							<Col sm={12} lg={6} className="mt-lg-0 mt-3">
								<button
									className="btn2 btn-warning mx-2 rounded-4"
									onClick={handleSubmit(onSubmit)}
								>
									Finish
								</button>
							</Col>
						</Row>
					</Form>
					{alert && (
						<Alert
							className="position-fixed text-center mx-3 bottom-0 start-0 w-25"
							variant={alertColor}
						>
							{msg}
						</Alert>
					)}
				</div>
			</div>
		</div>
	);
}
