import React, { useEffect, useState } from "react";
import { Alert, Col, Form, Row } from "react-bootstrap";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { infoAPI } from "../API/AdminPanelApi";
import { getinfo } from "../store/reducer/InfoSlice";
import "../css/infoData.css";

export default function EditInfo() {
	const { editInfo } = infoAPI;
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { infos } = useSelector((state) => state.info);

	// edit
	const [information, setInformation] = useState([]);
	// errors
	const [msg, setMsg] = useState("");
	const [isError, setIsError] = useState(true);
	const [alert, setAlert] = useState(false);
	const [err, setErr] = useState({
		contactPhones: null,
		email: null,
		facebook: null,
		linkedin: null,
		aboutUs: null,
		fFeatureOne: null,
		fFeatureTwo: null,
		fFeatureThree: null,
		fPrice: null,
		pFeatureOne: null,
		pFeatureTwo: null,
		pFeatureThree: null,
		pPrice: null,
	});
	// use Effect
	useEffect(() => {
		dispatch(getinfo());
		// setInformation(infos[0]);

		// eslint-disable-next-line
	}, []);
	useEffect(() => {
		checkerrors();
		// eslint-disable-next-line
	}, [err]);
	// checking errors and setting values functions
	const checkerrors = () => {
		if (
			err.contactPhones == null &&
			err.email == null &&
			err.facebook == null &&
			err.linkedin == null &&
			err.aboutUs == null &&
			err.fFeatureOne == null &&
			err.fFeatureTwo == null &&
			err.fFeatureThree == null &&
			err.fPrice == null &&
			err.pFeatureOne == null &&
			err.pFeatureTwo == null &&
			err.pFeatureThree == null &&
			err.pPrice == null
		) {
			setIsError(false);
		} else {
			setIsError(true);
		}
	};
	const changeHandler = (e) => {
		if (information.length === 0) {
			setValues();
		}
		let regexMail = /^[\w=-]+@[\w-]+[.]+[\w]{2,3}$/;
		let regexPhone = /^01[0-2,5]{1}[0-9]{8}$/;
		switch (e.target.name) {
			case "contactPhones":
				if (!e.target.value.match(regexPhone)) {
					setErr({
						...err,
						contactPhones: "phone must be a phone number",
					});
				} else {
					setErr({
						...err,
						contactPhones: null,
					});
					setInformation({
						...information,
						[e.target.name]: e.target.value,
					});
				}
				break;
			case "email":
				if (!e.target.value.match(regexMail)) {
					setErr({
						...err,
						email: "email must match anything@example.com",
					});
				} else {
					setErr({
						...err,
						email: null,
					});
					setInformation({
						...information,
						socialMediaLinks: {
							...information.socialMediaLinks,
							email: e.target.value,
						},
					});
				}
				break;
			case "facebook":
				if (e.target.value.length <= 0) {
					setErr({
						...err,
						facebook: "facebook link can't be empty",
					});
				} else {
					setErr({
						...err,
						facebook: null,
					});
					setInformation({
						...information,
						socialMediaLinks: {
							...information.socialMediaLinks,
							facebook: e.target.value,
						},
					});
				}
				break;
			case "linkedin":
				if (e.target.value.length <= 0) {
					setErr({
						...err,
						linkedin: "linkedin link can't be empty",
					});
				} else {
					setErr({
						...err,
						linkedin: null,
					});
					setInformation({
						...information,
						socialMediaLinks: {
							...information.socialMediaLinks,
							linkedin: e.target.value,
						},
					});
				}
				break;
			case "aboutUs":
				if (e.target.value.length < 20) {
					setErr({
						...err,
						aboutUs: "about can't be less than 20 charactars",
					});
				} else {
					setErr({
						...err,
						aboutUs: null,
					});
					setInformation({
						...information,
						[e.target.name]: e.target.value,
					});
				}
				break;
			case "prices.free.featureOne":
				if (e.target.value.length <= 0) {
					setErr({
						...err,
						fFeatureOne: "feature can't be empty",
					});
				} else {
					setErr({
						...err,
						fFeatureOne: null,
					});
					setInformation({
						...information,
						prices: {
							...information.prices,
							free: {
								...information.prices.free,
								featureOne: e.target.value,
							},
						},
					});
				}
				break;
			case "prices.free.featureTwo":
				if (e.target.value.length <= 0) {
					setErr({
						...err,
						fFeatureTwo: "feature can't be empty",
					});
				} else {
					setErr({
						...err,
						fFeatureTwo: null,
					});
					setInformation({
						...information,
						prices: {
							...information.prices,
							free: {
								...information.prices.free,
								featureTwo: e.target.value,
							},
						},
					});
				}
				break;
			case "prices.free.featureThree":
				if (e.target.value.length <= 0) {
					setErr({
						...err,
						fFeatureThree: "feature can't be empty",
					});
				} else {
					setErr({
						...err,
						fFeatureThree: null,
					});
					setInformation({
						...information,
						prices: {
							...information.prices,
							free: {
								...information.prices.free,
								featureThree: e.target.value,
							},
						},
					});
				}
				break;
			case "prices.free.price":
				if (e.target.value.length <= 0) {
					setErr({
						...err,
						fPrice: "feature can't be empty",
					});
				} else {
					setErr({
						...err,
						fPrice: null,
					});
					setInformation({
						...information,
						prices: {
							...information.prices,
							free: {
								...information.prices.free,
								price: e.target.value,
							},
						},
					});
				}
				break;
			case "prices.premium.featureOne":
				if (e.target.value.length <= 0) {
					setErr({
						...err,
						pFeatureOne: "feature can't be empty",
					});
				} else {
					setErr({
						...err,
						pFeatureOne: null,
					});
					setInformation({
						...information,
						prices: {
							...information.prices,
							premium: {
								...information.prices.premium,
								featureOne: e.target.value,
							},
						},
					});
				}
				break;
			case "prices.premium.featureTwo":
				if (e.target.value.length <= 0) {
					setErr({
						...err,
						pFeatureTwo: "feature can't be empty",
					});
				} else {
					setErr({
						...err,
						pFeatureTwo: null,
					});
					setInformation({
						...information,
						prices: {
							...information.prices,
							premium: {
								...information.prices.premium,
								featureTwo: e.target.value,
							},
						},
					});
				}
				break;
			case "prices.premium.featureThree":
				if (e.target.value.length <= 0) {
					setErr({
						...err,
						pFeatureThree: "feature can't be empty",
					});
				} else {
					setErr({
						...err,
						pFeatureThree: null,
					});
					setInformation({
						...information,
						prices: {
							...information.prices,
							premium: {
								...information.prices.premium,
								featureThree: e.target.value,
							},
						},
					});
				}
				break;
			case "prices.premium.price":
				if (e.target.value.length <= 0) {
					setErr({
						...err,
						pPrice: "feature can't be empty",
					});
				} else {
					setErr({
						...err,
						pPrice: null,
					});
					setInformation({
						...information,
						prices: {
							...information.prices,
							premium: {
								...information.prices.premium,
								price: e.target.value,
							},
						},
					});
				}
				break;
			default:
				break;
		}
	};
	// functions to handle data
	const setValues = () => {
		setInformation(infos[0]);
	};
	const edit = async () => {
		try {
			let res = await editInfo(infos[0]?._id, information);
			if (res.data.message === "data updated") {
				setMsg("info edited");
				setAlert(true);
				setTimeout(() => {
					navigate("/adminpanel/info");
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
			edit();
		}
	};
	// exit function
	const exit = () => {
		navigate("/adminpanel/info");
	};
	return (
		<div>
			{/* table header */}
			<div className="container text-center my-4">
				<h2 className="text-primary">Edit Website Information</h2>
			</div>
			{/* exit and save button */}
			<div className="container d-flex justify-content-end ">
				<button className="btn border-0 p-0" onClick={submit}>
					<AiOutlineCheckCircle className="fs-4 text-success" />
				</button>
				<button className="btn border-0 p-0" onClick={exit}>
					<AiOutlineCloseCircle className="fs-4 text-danger" />
				</button>
			</div>

			<Form className="container my-3 text-center edit-info-data py-5">
				<Row className="align-items-center justify-content-center mb-3">
					<Form.Label as={Col} sm="12" md="2" lg="1">
						Phone
					</Form.Label>
					<Form.Group as={Col} sm="12" md="4" controlId="formGridPhone">
						<Form.Control
							onChange={changeHandler}
							type="text"
							name="contactPhones"
							placeholder="phone number"
							defaultValue={infos[0]?.contactPhones}
						/>
						{err.contactPhones && (
							<Form.Text className="text-danger">{err.contactPhones}</Form.Text>
						)}
					</Form.Group>
					<Form.Label as={Col} sm="12" md="2" lg="1">
						Email
					</Form.Label>
					<Form.Group as={Col} sm="12" md="4" controlId="formGridPassword">
						<Form.Control
							onChange={changeHandler}
							type="email"
							name="email"
							placeholder="Email"
							defaultValue={infos[0]?.socialMediaLinks.email}
						/>
						{err.email && (
							<Form.Text className="text-danger">{err.email}</Form.Text>
						)}
					</Form.Group>
				</Row>
				<Row className="align-items-center justify-content-center mb-3">
					<Form.Label as={Col} sm="12" md="2" lg="1">
						facebook
					</Form.Label>
					<Form.Group as={Col} sm="12" md="4" controlId="formGridFacebook">
						<Form.Control
							onChange={changeHandler}
							type="text"
							name="facebook"
							placeholder="Facebook Link"
							defaultValue={infos[0]?.socialMediaLinks?.facebook}
						/>
						{err.facebook && (
							<Form.Text className="text-danger">{err.facebook}</Form.Text>
						)}
					</Form.Group>
					<Form.Label as={Col} sm="12" md="2" lg="1">
						linkedin
					</Form.Label>
					<Form.Group as={Col} sm="12" md="4" controlId="formGridLinkedin">
						<Form.Control
							onChange={changeHandler}
							type="text"
							name="linkedin"
							placeholder="Linkedin Link"
							defaultValue={infos[0]?.socialMediaLinks?.linkedin}
						/>
						{err.linkedin && (
							<Form.Text className="text-danger">{err.linkedin}</Form.Text>
						)}
					</Form.Group>
				</Row>
				<hr />
				<Row className="align-items-center justify-content-center mb-3">
					<Form.Group
						as={Col}
						sm="12"
						lg="10"
						className="mb-3"
						controlId="formGridAbout"
					>
						<Form.Label>About Us</Form.Label>
						<Form.Control
							onChange={changeHandler}
							as="textarea"
							rows={4}
							type="text"
							name="aboutUs"
							placeholder="About us"
							maxLength="500"
							defaultValue={infos[0]?.aboutUs}
						/>
						{err.aboutUs && (
							<Form.Text className="text-danger">{err.aboutUs}</Form.Text>
						)}
					</Form.Group>
				</Row>
				<hr />
				<Row className="align-items-center justify-content-center mb-3">
					<Form.Group as={Col} sm="12" md="6" lg="5" controlId="formGridFree">
						<Form.Label>Free price</Form.Label>
						<Form.Control
							onChange={changeHandler}
							type="text"
							name="prices.free.featureOne"
							placeholder="free featureOne"
							className="mb-3"
							maxLength="50"
							defaultValue={infos[0]?.prices.free.featureOne}
						/>
						{err.fFeatureOne && (
							<Form.Text className="text-danger">{err.fFeatureOne}</Form.Text>
						)}
						<Form.Control
							onChange={changeHandler}
							type="text"
							name="prices.free.featureTwo"
							placeholder="free featureTwo"
							className="mb-3"
							maxLength="50"
							defaultValue={infos[0]?.prices.free.featureTwo}
						/>
						{err.fFeatureTwo && (
							<Form.Text className="text-danger">{err.fFeatureTwo}</Form.Text>
						)}
						<Form.Control
							onChange={changeHandler}
							type="text"
							name="prices.free.featureThree"
							placeholder="free featureThree"
							className="mb-3"
							maxLength="50"
							defaultValue={infos[0]?.prices.free.featureThree}
						/>
						{err.fFeatureThree && (
							<Form.Text className="text-danger">{err.fFeatureThree}</Form.Text>
						)}
						<Form.Control
							onChange={changeHandler}
							type="text"
							name="prices.free.price"
							placeholder="free price"
							className="mb-3"
							maxLength="15"
							defaultValue={infos[0]?.prices.free.price}
						/>
						{err.fPrice && (
							<Form.Text className="text-danger">{err.fPrice}</Form.Text>
						)}
					</Form.Group>
					<Form.Group
						as={Col}
						sm="12"
						md="6"
						lg="5"
						controlId="formGridPremium"
					>
						<Form.Label>premium price</Form.Label>
						<Form.Control
							onChange={changeHandler}
							type="text"
							name="prices.premium.featureOne"
							placeholder="premium featureOne"
							className="mb-3"
							maxLength="50"
							defaultValue={infos[0]?.prices.premium.featureOne}
						/>
						{err.pFeatureOne && (
							<Form.Text className="text-danger">{err.pFeatureOne}</Form.Text>
						)}
						<Form.Control
							onChange={changeHandler}
							type="text"
							name="prices.premium.featureTwo"
							placeholder="premium featureTwo"
							className="mb-3"
							maxLength="50"
							defaultValue={infos[0]?.prices.premium.featureTwo}
						/>
						{err.pFeatureTwo && (
							<Form.Text className="text-danger">{err.pFeatureTwo}</Form.Text>
						)}
						<Form.Control
							onChange={changeHandler}
							type="text"
							name="prices.premium.featureThree"
							placeholder="premium featureThree"
							className="mb-3"
							maxLength="50"
							defaultValue={infos[0]?.prices.premium.featureThree}
						/>
						{err.pFeatureThree && (
							<Form.Text className="text-danger">{err.pFeatureThree}</Form.Text>
						)}
						<Form.Control
							onChange={changeHandler}
							type="text"
							name="prices.premium.price"
							placeholder="premium price"
							className="mb-3"
							maxLength="15"
							defaultValue={infos[0]?.prices.premium.price}
						/>
						{err.pPrice && (
							<Form.Text className="text-danger">{err.pPrice}</Form.Text>
						)}
					</Form.Group>
				</Row>
			</Form>
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
