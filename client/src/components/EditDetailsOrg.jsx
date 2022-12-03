import { useEffect, useState } from "react";
import { editOrganizerMe } from "../store/reducer/orgSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { organizerAPI } from "../API/AuthenticationAPI";

export default function EditDetails() {
	//----state is carrying the data from orgDetails
	const { state } = useLocation();
	const navigator = useNavigate();
	const { editedOrg } = useSelector((state) => state.orgReducer);
	const dispatch = useDispatch();

	//----Handling data from Inputs
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();
	const { getInudstries } = organizerAPI;
	const [industries, setIndusrty] = useState();
	const [individual, setIndivdual] = useState(false);
	const [industryIDFK, setIndustryIDFK] = useState();
	const [allowPayment, setAllowPayment] = useState(
		state?.industryIDFK?.allowPayment
	);

	const [availHours, setAvailHours] = useState({
		startTime: state?.availHours?.startTime,
		endTime: state?.availHours?.endTime,
	});
	const [contact, setContact] = useState({
		phone: state?.contact?.phone,
		anthorPhone: state?.contact?.anthorPhone,
		orgEmail: state?.contact?.orgEmail,
	});
	const [satVal, setSatVal] = useState(7);
	const [sunVal, setSunVal] = useState(7);
	const [monVal, setMonVal] = useState(7);
	const [tueVal, setTueVal] = useState(7);
	const [wedVal, setWedVal] = useState(7);
	const [thuVal, setThuVal] = useState(7);
	const [friVal, setFriVal] = useState(7);
	const [satChecked, setSatChecked] = useState(false);
	const [sunChecked, setSunChecked] = useState(false);
	const [monChecked, setMonChecked] = useState(false);
	const [tueChecked, setTueChecked] = useState(false);
	const [wedChecked, setWedChecked] = useState(false);
	const [thuChecked, setThuChecked] = useState(false);
	const [friChecked, setFriChecked] = useState(false);

	const checkedDays = () => {
		// eslint-disable-next-line
		state?.availDays?.map((day) => {
			switch (day) {
				case 0:
					setSunChecked(true);
					setSunVal(0);
					break;
				case 1:
					setMonChecked(true);
					setMonVal(1);
					break;
				case 2:
					setTueChecked(true);
					setTueVal(2);
					break;
				case 3:
					setWedChecked(true);
					setWedVal(3);
					break;
				case 4:
					setThuChecked(true);
					setThuVal(4);
					break;
				case 5:
					setFriChecked(true);
					setFriVal(5);
					break;
				case 6:
					setSatChecked(true);
					setSatVal(6);
					break;
				default:
					break;
			}
		});
	};
	const [daysError, setDaysError] = useState(false);
	const phoneHandler = (e) => {
		if (e.target.value !== null) {
			setContact({ ...contact, phone: e.target.value });
		}
	};
	const anthorPhoneHandler = (e) => {
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
	let availDays = [satVal, sunVal, monVal, tueVal, wedVal, thuVal, friVal];

	const daysHandler = (e) => {
		setDaysError(false);
		if (availDays.length === 0) {
			setDaysError(true);
		}
		availDays = availDays.filter((k) => {
			return k !== 7;
		});
		if (e) {
			if (e.target.checked) {
				availDays.push(parseInt(e.target.value));
			} else {
				availDays.splice(availDays.indexOf(parseInt(e.target.value)), 1);
			}
		}
	};
	const industryHandler = (e) => {
		let selectedIndustry = e.target.value;
		setIndustryIDFK(selectedIndustry);
		// eslint-disable-next-line
		industries.map((industry) => {
			if (industry._id === selectedIndustry) {
				setAllowPayment(industry.allowPayment);
			}
		});
	};
	const indvidualHandler = (e) => {
		if (e.target.checked) {
			setIndivdual(true);
		} else {
			setIndivdual(false);
		}
	};

	const onSubmit = (data) => {
		daysHandler();

		const { amountOfRequiredDaposit, question, description, orgName, title } =
			data;
		let editedOrganizer;
		if (allowPayment) {
			editedOrganizer = {
				amountOfRequiredDaposit,
				description,
				orgName,
				title,
				contact,
				availHours,
				availDays,
				individual,
				industryIDFK,
				question,
			};
		} else {
			editedOrganizer = {
				description,
				orgName,
				title,
				contact,
				availHours,
				availDays,
				individual,
				industryIDFK,
				question,
			};
		}
		if (availDays.length !== 0) {
			add(editedOrganizer);
		}
	};

	useEffect(() => {
		getAllIndustries();
		checkedDays();
		// eslint-disable-next-line
	}, [state]);
	///

	//----Button fires Action to edit
	const add = (editedOrganizer) => {
		if (state) {
			let idArg = state._id;
			let orgArg = editedOrganizer;
			dispatch(editOrganizerMe({ idArg, orgArg })); //args names must match the names in CRUD
		} else {
			console.log("Not Authorized to Edit to Database");
		}
		setTimeout(() => {
			navigator(-1);
		}, 3000);
	};

	return (
		<div className="bg-light">
			<Form
				noValidate
				className="p-5 text-dark"
				onSubmit={handleSubmit(onSubmit)}
				// onChange={changeHandler}
			>
				<div className="container border rounded-5 border-2 border-dark">
					<div className="row p-3 pb-0 d-flex w-100 justify-content-between">
						<div className="col-lg-3 col-md-5 col-8">
							<img
								src={state?.userIDFK?.profilePicture}
								width="180"
								height="180"
								alt="profile"
								className="border border-warning rounded-circle shadow"
							/>
						</div>

						<div className="col-lg-9 col-md-7 col-12">
							<Form.Label
								className=" mt-5 text-dark fw-semibold"
								htmlFor="orgName"
							>
								Organizer Name
							</Form.Label>
							<Form.Control
								name="orgName"
								type="text"
								id="orgName"
								className="form-control fs-4 fw-bold bg-transparent border-0 text-primary rounded-pill w-75"
								placeholder="Enter Name"
								{...register("orgName", {
									value: state?.orgName,
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
								<p className="text-warning mt-3 fw-semibold">
									{errors?.orgName?.message}
								</p>
							)}
							<Form.Label
								className=" mt-2 text-dark fw-semibold"
								htmlFor="orgTitle"
							>
								Title/Job
							</Form.Label>
							<Form.Control
								name="title"
								type="text"
								id="orgTitle"
								className="form-control fs-5 fw-semibold bg-transparent border-0 mb-2 text-dark rounded-pill w-75"
								placeholder="Enter Title"
								{...register("title", {
									required: "Title is Required",
									value: state?.title,
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
								<p className="text-warning mt-3 fw-semibold">
									{errors?.title?.message}
								</p>
							)}{" "}
						</div>
					</div>

					<div className="row">
						<div className="col-lg-2"></div>
						<div className="col-lg-10 col-12 mb-2">
							<hr />
							<Form.Label
								className=" mt-2 text-dark fw-semibold"
								htmlFor="orgDesc"
							>
								Bio/Description
							</Form.Label>
							<Form.Control
								name="description"
								as="textarea"
								rows={3}
								id="orgDesc"
								className="form-control bg-transparent border-0 mb-4 text-black-50 rounded-1"
								placeholder="Enter a description"
								{...register("description", {
									required: "You Must Describe Your Industry",
									value: state?.description,
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
								<p className="text-warning fw-semibold">
									{errors.description?.message}
								</p>
							)}{" "}
						</div>
					</div>
					<hr className="m-0" />

					<div className="row">
						<div
							className="col-lg-3 col-md-4 col-12 rounded-top rounded-5"
							style={{
								backgroundImage:
									"linear-gradient(to bottom, rgb(21, 52, 98), rgb(186, 209, 194))",
							}}
						>
							<div className="my-4 fw-semibold text-dark">
								<Form.Label
									className="text-warning fw-semibold"
									htmlFor="orgIndustry"
								>
									Industry
								</Form.Label>
								<Form.Select
									name="industry"
									type="text"
									id="orgIndustry"
									onChange={industryHandler}
									className="form-control text-center fs-5 fw-semibold mt-2 border-0 text-primary rounded-pill"
									placeholder="Enter Industry"
								>
									{industries &&
										industries.map((indusrty, index) => {
											return (
												<option
													selected={
														indusrty._id === state?.industryIDFK?._id
															? "selected"
															: null
													}
													value={indusrty._id}
													key={index}
												>
													{indusrty?.name}
												</option>
											);
										})}
								</Form.Select>
							</div>
							{allowPayment && (
								<div className="my-4 fw-semibold text-dark">
									<Form.Label
										className="text-warning fw-semibold"
										htmlFor="allowPayment"
									>
										Minimun Salary:
									</Form.Label>
									<Form.Control
										id="allowPayment"
										placeholder="Enter your minimun salary"
										type="text"
										name="amountOfRequiredDaposit"
										className="form-control text-center mt-2 border-0 text-primary rounded-pill"
										{...register("amountOfRequiredDaposit", {
											value: state?.amountOfRequiredDaposit,
											required: "please specify your salary",
										})}
									></Form.Control>
									{errors.amountOfRequiredDaposit && (
										<p className="text-danger fw-semibold">
											{errors.amountOfRequiredDaposit?.message}
										</p>
									)}
								</div>
							)}

							<hr />

							<div className="my-3 fw-semibold text-warning">
								Contact Info:
								<div className="text-dark text-start my-3">
									<Form.Label
										className="text-warning fw-semibold"
										htmlFor="orgorgEmail"
									>
										organizer Email:
									</Form.Label>
									<Form.Control
										name="orgEmail"
										type="email"
										id="orgEmail"
										className="form-control text-center mt-2 border-0 text-primary rounded-pill"
										placeholder="Enter organization Email"
										{...register("orgEmail", {
											value: state?.contact?.orgEmail,
											pattern: {
												value:
													/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
												message: "Please Enter Valid Email",
											},
										})}
										onChange={orgEmailHandler}
									/>
								</div>
								{errors.orgEmail && (
									<p className="text-danger fw-semibold">
										{errors?.orgEmail?.message}
									</p>
								)}
								<div className="text-dark text-start my-3">
									<Form.Label
										className="text-warning fw-semibold"
										htmlFor="orgphone"
									>
										Phone:
									</Form.Label>
									<Form.Control
										name="phone"
										type="tel"
										id="orgphone"
										className="form-control text-center mt-2 border-0 text-primary rounded-pill"
										placeholder="Enter Phone"
										{...register("Phone", {
											value: state?.contact?.phone,
											required: "Phone is Required",
											pattern: {
												value: /^01[0-2,5]{1}[0-9]{8}$/g,
												message: "Please enter a valid Phone number",
											},
										})}
										onChange={phoneHandler}
									/>
								</div>
								{errors.Phone && (
									<p className="text-danger fw-semibold">
										{errors?.Phone?.message}
									</p>
								)}
								<div className="text-dark text-start my-3">
									<Form.Label
										className="text-warning fw-semibold"
										htmlFor="organthorPhone"
									>
										Another Phone:
									</Form.Label>
									<Form.Control
										name="anthorPhone"
										type="tel"
										id="organthorPhone"
										className="form-control text-center mt-2 border-0 text-primary rounded-pill"
										placeholder="Enter another Phone"
										{...register("anthorPhone", {
											value: state?.contact?.anthorPhone,
											pattern: {
												value: /^01[0-2,5]{1}[0-9]{8}$/g,
												message: "Please enter a valid Phone number",
											},
										})}
										onChange={anthorPhoneHandler}
									/>
								</div>
								{errors.anthorPhone && (
									<p className="text-danger fw-semibold">
										{errors?.anthorPhone?.message}
									</p>
								)}
								<hr className="my-4" />
								<div className="text-dark text-start">
									<Form.Label
										className="text-primary fw-semibold"
										htmlFor="ques"
									>
										Question To Your Client
									</Form.Label>
									<textarea
										id="ques"
										class="field"
										placeholder="Write Your Question"
										className="form-control text-center mt-2 border-0 text-primary rounded"
										{...register("question", {
											value: state?.question,
										})}
										rows={3}
									></textarea>
								</div>
								<div className="text-dark text-center">
									<Form.Label
										className="text-primary fw-semibold"
										htmlFor="ind"
									>
										Indvidual
										<input
											type="checkbox"
											id="ind"
											onChange={indvidualHandler}
											defaultChecked={state?.individual ? "true" : null}
											className="ch1"
										></input>
									</Form.Label>
								</div>
							</div>
						</div>
						<div className="vr p-0"></div>
						<div className="col">
							<h4 className="my-4 text-dark">Calender</h4>
							<div>
								<p className="lead fs-2 my-3 py-2 text-center text-primary">
									Available Days
								</p>
								<Row className="my-4">
									<Col sm={12} md={6} lg={3}>
										{" "}
										<p className="label mx-md-0 mx-3">
											<input
												type="checkbox"
												name="sat"
												value={6}
												className="ch1 mx-2"
												defaultChecked={satChecked ? "true" : null}
												onClick={daysHandler}
											></input>
											Saturday
										</p>
									</Col>
									<Col sm={12} md={6} lg={3}>
										{" "}
										<p className="label mx-md-0 mx-3">
											<input
												type="checkbox"
												name="sun"
												value={0}
												defaultChecked={sunChecked ? "true" : null}
												className="ch1 mx-2"
												onClick={daysHandler}
											></input>
											Sunday
										</p>
									</Col>
									<Col sm={12} md={6} lg={3}>
										{" "}
										<p className="label mx-md-0 mx-3">
											<input
												type="checkbox"
												name="mon"
												value={1}
												className="ch1 mx-2"
												defaultChecked={monChecked ? "true" : null}
												onClick={daysHandler}
											></input>
											Monday
										</p>
									</Col>
									<Col sm={12} md={6} lg={3}>
										{" "}
										<p className="label mx-md-0 mx-3">
											<input
												type="checkbox"
												name="tue"
												value={2}
												className="ch1 mx-2"
												defaultChecked={tueChecked ? "true" : null}
												onClick={daysHandler}
											></input>
											Tuesday
										</p>
									</Col>
									<Col sm={12} md={6} lg={3}>
										{" "}
										<p className="label mx-md-0 mx-3">
											<input
												type="checkbox"
												name="wed"
												value={3}
												className="ch1 mx-2"
												defaultChecked={wedChecked ? "true" : null}
												onClick={daysHandler}
											></input>
											Wednesday
										</p>
									</Col>
									<Col sm={12} md={6} lg={3}>
										{" "}
										<p className="label mx-md-0 mx-3">
											<input
												type="checkbox"
												name="thu"
												value={4}
												className="ch1 mx-2"
												onClick={daysHandler}
												defaultChecked={thuChecked ? "true" : null}
											></input>
											Thursday
										</p>
									</Col>
									<Col sm={12} md={6} lg={3}>
										<p className="label mx-md-0 mx-3 mx-1">
											<input
												type="checkbox"
												name="fri"
												value={5}
												className="ch1 mx-2"
												defaultChecked={friChecked ? "true" : null}
												onClick={daysHandler}
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
							<div>
								<p className="lead fs-2 my-3 py-2 text-center text-primary">
									Available Hours
								</p>
								<Row className=" mx-5 mb-4 mt-2">
									<Col sm={12} lg={6}>
										<label className="label">Start Time</label>
										<Form.Control
											type="time"
											name="startTime"
											onSelect={startTimeHandler}
											className="fields"
											{...register("startTime", {
												value: state?.availHours?.startTime,
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
												value: state?.availHours?.endTime,
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
							</div>
						</div>
					</div>
				</div>

				<div className="row pt-5">
					<button
						className={
							state
								? "col-lg-2 col-md-3 col-4 btn btn-primary rounded-pill fw-semibold mx-auto text-warning"
								: "disabled invisible"
						}
						name="edit"
					>
						{" "}
						{state ? "Save Changes" : "---"}
					</button>
				</div>
			</Form>

			{editedOrg && (
				<Alert
					className="position-fixed text-center mx-3 bottom-0 start-0 w-25"
					variant="success"
				>
					Organizer Info Edited Successfully
				</Alert>
			)}
		</div>
	);
}
