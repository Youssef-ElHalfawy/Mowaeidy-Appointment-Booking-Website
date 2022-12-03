import React, { useEffect, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { industriesAPI } from "../API/AdminPanelApi";
import { AiOutlineClose } from "react-icons/ai";

export default function AddIndustry() {
	const { addIndustry, getOneIndustry, editIndustry } = industriesAPI;
	const location = useLocation();
	const navigate = useNavigate();
	// add
	const [formValues, setFormValues] = useState({
		name: "",
		description: "",
		canclationTime: 0,
		allowPayment: false,
	});
	// edit
	const industryToUpdate = useOutletContext();
	const [industry, setIndustry] = useState({});
	const [isEdit, setIsEdit] = useState(false);
	// errors
	const [msg, setMsg] = useState("");
	const [isError, setIsError] = useState(true);
	const [alert, setAlert] = useState(false);
	const [err, setErr] = useState({
		name: null,
		description: null,
		canclationTime: null,
	});
	// use Effect
	useEffect(() => {
		if (location.pathname === "/adminpanel/industries/edit") {
			getIndustry();
			setIsEdit(true);
		}
		// eslint-disable-next-line
	}, []);
	useEffect(() => {
		checkerrors();
		// eslint-disable-next-line
	}, [err]);
	// checking errors and setting values functions
	const checkerrors = () => {
		if (isEdit) {
			if (
				err.name === null &&
				err.description === null &&
				err.canclationTime === null
			) {
				setIsError(false);
			} else {
				setIsError(true);
			}
		} else {
			if (
				err.name === null &&
				err.description === null &&
				err.canclationTime === null &&
				formValues.name !== "" &&
				formValues.description !== "" &&
				formValues.canclationTime !== 0
			) {
				setIsError(false);
			} else {
				setIsError(true);
			}
		}
	};
	let setErrorsFunc = (e) => {
		if (isEdit) {
			setIndustry({
				...industry,
				[e.target.name]: e.target.value,
			});
		} else {
			setFormValues({
				...formValues,
				[e.target.name]: e.target.value,
			});
		}
		setErr({
			...err,
			[e.target.name]: null,
		});
	};
	const changeHandler = (e) => {
		switch (e.target.name) {
			case "name":
				if (e.target.value.length <= 4) {
					setErr({
						...err,
						[e.target
							.name]: `${e.target.name} length must be more than 4 charaters`,
					});
				} else {
					setErrorsFunc(e);
				}
				break;
			case "description":
				if (e.target.value.length > 0 && e.target.value.length <= 300) {
					setErrorsFunc(e);
				} else if (e.target.value.length > 300) {
					setErr({
						...err,
						[e.target.name]: `${e.target.name} can't be more than 300`,
					});
				} else if (e.target.value.length <= 0) {
					setErr({
						...err,
						[e.target.name]: `${e.target.name} can't be empty`,
					});
				}
				break;
			case "canclationTime":
				if (e.target.value.length > 0 && !isNaN(e.target.value)) {
					setErrorsFunc(e);
				} else if (isNaN(e.target.value)) {
					setErr({
						...err,
						[e.target.name]: `${e.target.name} must be a number`,
					});
				} else if (e.target.value.length <= 0) {
					setErr({
						...err,
						[e.target.name]: `${e.target.name} can't be empty`,
					});
				}
				break;
			case "allowPayment":
				setFormValues({
					...formValues,
					[e.target.name]: e.target.checked,
				});
				setIndustry({
					...industry,
					[e.target.name]: e.target.checked,
				});
				break;
			default:
				break;
		}
	};
	// functions to handle data
	const getIndustry = async () => {
		try {
			let res = await getOneIndustry(industryToUpdate);
			res.data.message
				? navigate("/adminpanel/industries")
				: setIndustry(res.data);
		} catch (err) {
			console.log(err);
		}
	};
	const add = async () => {
		try {
			let res = await addIndustry(formValues);
			if (res.data.message === "done") {
				setMsg("industry added");
				setAlert(true);
				setTimeout(() => {
					navigate("/adminpanel/industries");
				}, 3000);
			} else {
				setMsg("please try agian later");
				setAlert(true);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const edit = async () => {
		try {
			let res = await editIndustry(industry._id, industry);
			if (res.data.message === "industry updated") {
				setMsg("industry edited");
				setAlert(true);
				setTimeout(() => {
					navigate("/adminpanel/industries");
				}, 3000);
			} else {
				setMsg("please try again");
				setAlert(true);
			}
		} catch (e) {
			setMsg("please try again");
			setAlert(true);
		}
	};
	// submit function
	const submit = () => {
		if (isError) {
			setMsg("Changes isn't allowed");
			setAlert(true);
		} else {
			isEdit ? edit() : add();
		}
	};
	// exit function
	const exit = () => {
		navigate("/adminpanel/industries");
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
				<h4 className="text-end py-0 text-white">
					{isEdit ? "Edit Industry" : "Add Industry"}
				</h4>
				<Form className="my-4">
					<Form.Group className="mb-3" controlId="formBasicName">
						<Form.Control
							name="name"
							onChange={changeHandler}
							type="text"
							placeholder="Industry name"
							maxLength="30"
							defaultValue={isEdit ? industry.name : ""}
						/>
						{err.name && (
							<Form.Text className="text-danger">{err.name}</Form.Text>
						)}
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicDesc">
						<Form.Control
							as="textarea"
							name="description"
							onChange={changeHandler}
							type="text"
							placeholder="description"
							maxLength="300"
							defaultValue={isEdit ? industry.description : ""}
						/>
						{err.description && (
							<Form.Text className="text-danger">{err.description}</Form.Text>
						)}
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicCanclationTime">
						<Form.Control
							name="canclationTime"
							onChange={changeHandler}
							type="text"
							placeholder="canclation Time"
							defaultValue={isEdit ? industry.canclationTime : ""}
						/>
						{err.canclationTime && (
							<Form.Text className="text-danger">
								{err.canclationTime}
							</Form.Text>
						)}
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicAllowPayment">
						<Form.Check
							name="allowPayment"
							onChange={changeHandler}
							className="text-white"
							type="switch"
							id="allowPayment"
							defaultChecked={isEdit ? industry.allowPayment : null}
							label="Allow Payment"
						/>
					</Form.Group>
					{isEdit ? (
						<Button variant="warning" className="w-100" onClick={submit}>
							Edit
						</Button>
					) : (
						<Button
							variant="warning"
							className={isError ? "disabled w-100" : "w-100"}
							onClick={submit}
						>
							Add
						</Button>
					)}
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
