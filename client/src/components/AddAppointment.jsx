import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { appointmentAPI } from "../API/AppointmentAPI";

export default function AddAppointment() {
	const navigate = useNavigate();
	const { eventInfo, organizer } = useOutletContext();
	const { addAppointment } = appointmentAPI;
	const [msg, setMsg] = useState("");
	const [isError, setIsError] = useState(true);
	const [alert, setAlert] = useState(false);
	let cancelTime = new Date(eventInfo?.start.getTime());
	const [newAppointment, setNewAppointment] = useState({
		madeByFK: localStorage.getItem("userId"),
		madeToFK: organizer?._id,
		appStartDateTime: eventInfo?.start,
		appEndDateTime: eventInfo?.end,
		appID: `${organizer?._id}${eventInfo?.startStr}`,
		allowedCancelTime: cancelTime,
		industryIDFK: organizer?.industryIDFK?._id,
		depositPaid: 0, //needs to be generic
		description: "",
		online: false,
		place: "",
		group: false,
		answer: "",
	});
	const [err, setErr] = useState({
		description: null,
		answer: null,
	});

	//functions to handle data
	const setCanclationTime = (numOfHours) => {
		cancelTime.setTime(cancelTime.getTime() - numOfHours * 60 * 60 * 1000);
	};
	const addZero = (i) => {
		if (i < 10) {
			i = "0" + i;
		}
		return i;
	};

	// checking errors functions
	const checkerrors = () => {
		if (organizer?.question) {
			if (
				err.description === null &&
				err.answer === null &&
				newAppointment.description !== "" &&
				newAppointment.answer !== ""
			) {
				setIsError(false);
			} else {
				setIsError(true);
			}
		} else {
			if (err.description === null && newAppointment.description !== "") {
				setIsError(false);
			} else {
				setIsError(true);
			}
		}
	};
	let setErrorsFunc = (e) => {
		setNewAppointment({
			...newAppointment,
			[e.target.name]: e.target.value,
		});
		setErr({
			...err,
			[e.target.name]: null,
		});
	};
	const changeHandler = (e) => {
		switch (e.target.name) {
			case "description":
				if (e.target.value.length <= 0) {
					setErr({
						...err,
						[e.target.name]: `${e.target.name} can't be empty`,
					});
				} else {
					setErrorsFunc(e);
				}
				break;
			case "answer":
				if (e.target.value.length <= 0) {
					setErr({
						...err,
						[e.target.name]: `${e.target.name} can't be empty`,
					});
				} else {
					setErrorsFunc(e);
				}
				break;
			case "online":
				setNewAppointment({
					...newAppointment,
					[e.target.name]: e.target.checked,
				});
				break;
			case "group":
				setNewAppointment({
					...newAppointment,
					[e.target.name]: e.target.checked,
				});
				break;
			case "place":
				setErrorsFunc(e);
				break;
			default:
				break;
		}
	};
	useEffect(() => {
		setCanclationTime(organizer?.industryIDFK?.canclationTime / 2);
		// eslint-disable-next-line
	}, []);
	useEffect(() => {
		checkerrors();
		// eslint-disable-next-line
	}, [err]);
	// adding functions
	const submit = async () => {
		if (isError) {
			setMsg("you can't do that");
			setAlert(true);
		} else {
			try {
				const resp = await addAppointment(newAppointment);
				if (resp?.data?.message === "done") {
					setMsg("appointment added");
					setAlert(true);
					setTimeout(() => {
						navigate("/organizers", { state: organizer?._id });
					}, 3000);
				} else {
					setMsg("something went wrong");
					setAlert(true);
				}
			} catch (err) {
				setMsg("try again later");
				setAlert(true);
			}
		}
	};

	// exit function
	const exit = () => {
		navigate("/organizer/view", { state: organizer?._id });
	};
	return (
		<div className="flying-container">
			<div className="flying-child d-flex px-3 flex-column justify-content-between  align-items-center">
				<button
					className="btn p-0 text-end align-self-end px-3 fs-4 text-white"
					onClick={exit}
				>
					<AiOutlineClose />
				</button>
				<Row className="w-100">
					<Col wrap xs={12} lg={6}>
						<div className=" mt-3">
							<div className="d-flex position-relative">
								<img
									alt="profile"
									src={organizer?.userIDFK?.profilePicture}
									width="80"
									height="80"
									className="rounded-circle shadow"
								/>
								<div className="container flex-column">
									<span className="text-warning fs-3 mx-1 mt-3">
										{organizer?.orgName}
									</span>
									<h5 className="text-primary ">{organizer?.title}</h5>
								</div>
							</div>
							<div className=" d-flex flex-column justify-content-between">
								<div className="ms-5 mt-2">
									<span className="text-white fs-3">
										{eventInfo?.startStr.slice(
											0,
											eventInfo?.startStr.indexOf("T")
										)}
									</span>
									<span className="text-warning d-block fs-6">
										{`${addZero(eventInfo?.start?.getHours())}:${addZero(
											eventInfo?.start?.getMinutes()
										)} to ${addZero(eventInfo?.end?.getHours())}:${addZero(
											eventInfo?.end?.getMinutes()
										)}`}
									</span>
								</div>
								{organizer?.amountOfRequiredDaposit !== 0 && (
									<div className="ms-5 mt-2">
										<span className="text-white fs-3">Cost</span>
										<span className="text-warning d-block fs-6">
											{organizer?.amountOfRequiredDaposit}
										</span>
									</div>
								)}
							</div>
						</div>
					</Col>
					<Col xs={12} lg={6}>
						<Form className="my-4">
							<Form.Group className="mb-3" controlId="formBasicDesc">
								<Form.Label className="text-white text-capitalize">
									Enter a description for the meeting
								</Form.Label>
								<Form.Control
									as="textarea"
									name="description"
									onChange={changeHandler}
									type="text"
									placeholder="Description for the meeting"
									maxLength="300"
								/>
								{err.description && (
									<Form.Text className="text-warning text-capitalize">
										{err.description}
									</Form.Text>
								)}
							</Form.Group>
							{organizer?.question && (
								<Form.Group className="mb-3" controlId="formBasicAnswer">
									<Form.Label className="text-white text-capitalize">
										{organizer?.question}
									</Form.Label>
									<Form.Control
										name="answer"
										onChange={changeHandler}
										type="text"
										maxLength="300"
										placeholder="write your answer"
									/>
									{err.answer && (
										<Form.Text className="text-warning text-capitalize">
											{err.answer}
										</Form.Text>
									)}
								</Form.Group>
							)}
							<Form.Group className="mb-3" controlId="formBasicPlace">
								<Form.Label className="text-white text-capitalize">
									specify the meeting place
								</Form.Label>
								<Form.Control
									name="place"
									onChange={changeHandler}
									type="text"
									maxLength="100"
									placeholder="write your answer"
								/>
							</Form.Group>
							<Row>
								<Col sm="12" md="6">
									<Form.Group className="mb-3" controlId="formBasicOnline">
										<Form.Check
											name="online"
											onChange={changeHandler}
											className="text-white"
											type="switch"
											id="place"
											label="Online"
										/>
									</Form.Group>
								</Col>
								<Col sm="12" md="6">
									<Form.Group className="mb-3" controlId="formBasicGroup">
										<Form.Check
											name="group"
											onChange={changeHandler}
											className="text-white"
											type="switch"
											id="group"
											label="Group"
										/>
									</Form.Group>
								</Col>
							</Row>
							<Button
								variant="warning"
								className={isError ? "disabled w-100" : "w-100"}
								onClick={submit}
							>
								Add
							</Button>
						</Form>
					</Col>
				</Row>
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
