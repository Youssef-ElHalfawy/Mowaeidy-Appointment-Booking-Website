import { useState } from "react";
import { editOrganizerMe } from "../store/reducer/orgSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Alert, Form } from "react-bootstrap";

export default function EditDetails() {
	//----state is carrying the data from orgDetails

	const { state } = useLocation();
	const navigator = useNavigate();
	const { id: paramId } = useParams();

	const { editedOrg } = useSelector((state) => state.orgReducer);
	const dispatch = useDispatch();

	//----Handling data from Inputs

	const [formData, setFormData] = useState({
		name: state ? state.orgName : "",
		title: state ? state.title : "",
		industry: state ? state.industryIDFK?.name : "",
		description: state ? state.description : "",
		contactInfo: state ? state.contactInfo : "",
		imgSrc: state ? state.imgSrc : "",
	});
	const [errorMessage, setErrorMessage] = useState({
		name: "",
		title: "",
		industry: "",
		description: "",
		contactInfo: "",
		imgSrc: "",
	});

	//----Validating and accepting data from Inputs

	const changeHandler = (e) => {
		if (e.target.value.length > 0) {
			setFormData({
				...formData,
				// ...state,              //in case you use Put not Patch
				[e.target.name]: e.target.value,
			});
			setErrorMessage({
				...errorMessage,
				[e.target.name]: "",
			});
		} else {
			setErrorMessage({
				...errorMessage,
				[e.target.name]: "Input field is required",
			});
		}
	};

	//----Button fires Action to edit

	const submitHandler = (e) => {
		//?????
		e.preventDefault();
		// let noEditAlert = false;
		if (paramId && state) {
			let idArg = state.id;
			let orgArg = formData;
			dispatch(editOrganizerMe({ idArg, orgArg })); //args names must match the names in CRUD
		} else {
			console.log("Not Authorized to Edit to Database"); //!!!
			// noEditAlert = true
		}
		setTimeout(() => {
			navigator(-1);
		}, 1500);
	};

	return (
		<div className="bg-light">
			<Form
				noValidate
				className="p-5 text-dark"
				onSubmit={submitHandler}
				onChange={changeHandler}
			>
				<div className="container border rounded-5 border-2 border-dark">
					<div className="row p-3 pb-0 d-flex w-100 justify-content-between">
						<div className="col-lg-3 col-md-6 col-8">
							<img
								src={formData.imgSrc}
								width="180"
								height="180"
								className="border border-warning rounded-circle shadow"
							/>
							<Form.Control
								name="imgSrc"
								type="text"
								id="orgImgSrc"
								className="form-control fs-6 bg-transparent border-0 ms-1 my-3 text-primary rounded-pill"
								defaultValue={formData.imgSrc}
								placeholder="Enter Picture URL"
							/>{" "}
							{/* show new image button --> fire action getOne ??! */}
							<div className="text-danger">{errorMessage.imgSrc}</div>
						</div>

						<div className="col-lg-9 col-md-6 col-12">
							<Form.Control
								name="name"
								type="text"
								id="orgName"
								className="form-control fs-4 fw-bold bg-transparent border-0 mt-5 text-primary rounded-pill w-75"
								defaultValue={formData.name}
								placeholder="Enter Name"
							/>
							<div className="text-danger">{errorMessage.name}</div>
							<Form.Control
								name="title"
								type="text"
								id="orgTitle"
								className="form-control fs-5 fw-semibold bg-transparent border-0 my-2 text-primary rounded-pill w-75"
								defaultValue={formData.title}
								placeholder="Enter Title"
							/>
							<div className="text-danger">{errorMessage.title}</div>
						</div>
					</div>

					<div className="row">
						<div className="col-lg-2"></div>
						<div className="col-lg-10 col-12 mb-2">
							<hr />
							<Form.Control
								name="description"
								as="textarea"
								rows={3}
								id="orgDesc"
								className="form-control bg-transparent border-0 my-4 text-black-50 rounded-1"
								defaultValue={formData.description}
								placeholder="Enter a description"
							/>
							<div className="text-danger">{errorMessage.description}</div>
						</div>
					</div>
					<hr />

					<div className="row">
						<div className="col-md-3 col-12">
							<div className="my-3 fw-semibold text-dark">
								Industry:
								<Form.Control
									name="industry"
									type="text"
									id="orgIndustry"
									className="form-control text-center fs-5 fw-semibold bg-transparent mt-2 border-0 text-primary rounded-pill"
									defaultValue={formData.industry}
									placeholder="Enter Industry"
								/>
							</div>
							<div className="text-danger">{errorMessage.industry}</div>
							<hr />

							{/* <div className="my-3 fw-semibold text-dark">
								Contact Info:
								<div className="text-dark text-start my-3">
									Phone 1:
									<Form.Control
										name="contactInfo.phone1"
										type="text"
										id="orgPhone1"
										className="form-control text-center bg-transparent mt-2 border-0 text-primary rounded-pill"
										defaultValue={formData.contactInfo.phone1}
										placeholder="Enter Phone 1"
									/>
								</div>
								<div className="text-danger">
									{errorMessage.contactInfo.phone1}
								</div>
								<div className="text-dark text-start my-3">
									Phone 2:
									<Form.Control
										name="contactInfo.phone2"
										type="text"
										id="orgPhone2"
										className="form-control text-center bg-transparent mt-2 border-0 text-primary rounded-pill"
										defaultValue={formData.contactInfo.phone2}
										placeholder="Enter Phone 2"
									/>
								</div>
								<div className="text-danger">
									{errorMessage.contactInfo.phone2}
								</div>
								<div className="text-dark text-start my-3">
									Email 1:
									<Form.Control
										name="contactInfo.email1"
										type="text"
										id="orgEmail1"
										className="form-control text-center bg-transparent mt-2 border-0 text-primary rounded-pill"
										defaultValue={formData.contactInfo.email1}
										placeholder="Enter Email 1"
									/>
								</div>
								<div className="text-danger">
									{errorMessage.contactInfo.email1}
								</div>
								<div className="text-dark text-start my-3">
									Email 2:
									<Form.Control
										name="contactInfo.email2"
										type="text"
										id="orgEmail2"
										className="form-control text-center bg-transparent mt-2 border-0 text-primary rounded-pill"
										defaultValue={formData.contactInfo.email2}
										placeholder="Enter Email 2"
									/>
								</div>
								<div className="text-danger">
									{errorMessage.contactInfo.email2}
								</div>
								<div className="text-dark text-start my-3">
									Address:
									<Form.Control
										name="contactInfo.address"
										type="text"
										id="orgAddress"
										className="form-control text-center bg-transparent mt-2 border-0 text-primary rounded-pill"
										defaultValue={formData.contactInfo.address}
										placeholder="Enter Address"
									/>
								</div>
								<div className="text-danger">
									{errorMessage.contactInfo.address}
								</div>
								<hr />
							</div> */}
						</div>
						<div className="vr p-0 col-md-1"></div>

						<div className="col-md-8 col-12">
							<h4 className="my-3 text-dark">Calender</h4>
							<h1 className="my-5 py-5 text-center text-primary">
								CALENDER Can't Be Edited From Here
							</h1>
						</div>
					</div>
				</div>

				<div className="row pt-5">
					<button
						className={
							paramId && state
								? "col-lg-2 col-md-3 col-4 btn btn-gradient rounded-pill fw-semibold mx-auto"
								: "disabled invisible col-lg-2 col-md-3 col-4 btn btn-gradient rounded-pill fw-semibold mx-auto"
						}
						name="edit"
					>
						{" "}
						{paramId && state ? "Save Changes" : "---"}
					</button>
				</div>
			</Form>

			{editedOrg && (
				<Alert
					className="position-fixed text-center mx-3 bottom-0 start-0 w-25"
					variant="success"
				>
					Organizer Edited successfully
				</Alert>
			)}
			{/* {noeditAlert && (<Alert className="position-fixed text-center mx-3 bottom-0 start-0 w-25"
          variant="warning">Not Authorized to Edit from Database</Alert>)} */}
		</div>
	);
}
