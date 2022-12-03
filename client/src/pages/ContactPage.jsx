import React, { useEffect, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { contactAPI } from "../API/ContactAPI";

export default function ContactPage() {
	const { sendMsg } = contactAPI;
	const navigate = useNavigate();
	const [isError, setIsError] = useState(true);
	const [alert, setAlert] = useState(false);
	const [alertBody, setAlertBody] = useState("");
	const [formValues, setFormValues] = useState({
		name: "",
		email: "",
		comment: "",
	});
	const [err, setErr] = useState({
		name: null,
		email: null,
		comment: null,
	});
	useEffect(() => {
		checkerrors();
		// eslint-disable-next-line
	}, [err]);

	const checkerrors = () => {
		if (
			err.name === null &&
			err.email === null &&
			err.comment === null &&
			formValues.name !== "" &&
			formValues.email !== "" &&
			formValues.comment !== ""
		) {
			setIsError(false);
		} else {
			setIsError(true);
		}
	};
	const sendMessage = async () => {
		const res = await sendMsg(formValues);
		if (res?.data?.message === "message has been sent") {
			setAlert(true);
			setAlertBody("message sent we'll contact you soon");
			setTimeout(() => {
				navigate("/home");
			}, 3000);
		} else {
			setAlert(true);
			setAlertBody("something went wrong try again later");
		}
	};
	const submit = () => {
		sendMessage();
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
			case "comment":
				if (e.target.value.length < 1) {
					setErr({
						...err,
						[e.target.name]: `${e.target.name} can't be empty`,
					});
				} else {
					setErrorsFunc(e);
				}
				break;
			default:
				break;
		}
	};
	return (
		<div className="container my-4">
			<div className="row align-items-center gy-5">
				<div className="col-md-6 col-sm-12">
					<img
						className="side-img"
						src="/Assets/Images/contact.jpg"
						alt="contact"
					/>
				</div>
				<div className="col-md-6 col-sm-12">
					<h2 className="text-center section-title">get in touch</h2>
					<h6 className="section-subtitle text-center">
						we are here for you! how can we help?
					</h6>
					<Form>
						<Form.Group className="mb-3" controlId="formBasicPassword">
							<Form.Label>Name</Form.Label>
							<Form.Control
								name="name"
								onChange={changeHandler}
								type="text"
								placeholder="Write your name"
							/>
							{err.name && (
								<Form.Text className="text-danger">{err.name}</Form.Text>
							)}
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control
								name="email"
								onChange={changeHandler}
								type="email"
								placeholder="Write your e-mail"
							/>
							{err.email && (
								<Form.Text className="text-danger">{err.email}</Form.Text>
							)}
						</Form.Group>
						<Form.Group
							className="mb-3"
							controlId="exampleForm.ControlTextarea1"
						>
							<Form.Label>Any comment?</Form.Label>
							<Form.Control
								name="comment"
								onChange={changeHandler}
								as="textarea"
								rows={3}
								placeholder="Go ahead, we are listening"
							/>
							{err.comment && (
								<Form.Text className="text-danger">{err.comment}</Form.Text>
							)}
						</Form.Group>
						<Button
							variant="primary"
							className={isError ? "disabled w-100" : "w-100"}
							onClick={submit}
						>
							Send
						</Button>
					</Form>
				</div>
			</div>
			{alert && (
				<Alert
					className="position-fixed text-center mx-3 bottom-0 start-0 w-25"
					variant="success"
				>
					{alertBody}
				</Alert>
			)}
		</div>
	);
}
