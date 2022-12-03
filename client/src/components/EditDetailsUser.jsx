import { editUserMe } from "../store/reducer/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert, Form } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { useForm } from "react-hook-form";

export default function UserEditDetails() {
	const { state } = useLocation();
	const navigator = useNavigate();
	const { editedUser } = useSelector((state) => state.userReducer);
	const dispatch = useDispatch();
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

	//----Validating and accepting data from Inputs
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	//----Button fires Action to edit
	const editUser = (editedUser) => {
		if (state) {
			let idArg = state._id;
			let userArg = editedUser;
			dispatch(editUserMe({ idArg, userArg })); //args names must match the names in CRUD
		} else {
			console.log("Not Authorized to Edit to Database"); //!!!
		}
		setTimeout(() => {
			navigator(-1);
		}, 3000);
	};

	const onSubmit = (data) => {
		let editedUser = { ...data };
		editUser(editedUser);
		console.log(editedUser);
	};
	return (
		<div className="bg-light">
			<Form className="p-5 text-dark" onSubmit={handleSubmit(onSubmit)}>
				<div className="container border rounded-5 border-2 border-dark">
					<div className="row p-3 pb-0 d-flex w-100 justify-content-between">
						<div className="col-lg-3 col-md-5 col-8">
							<img
								src={state?.profilePicture}
								alt="profile"
								width="180"
								height="180"
								className="border border-warning rounded-circle shadow"
							/>
							<Form.Label
								className="mt-3 text-dark fw-semibold"
								htmlFor="userImgSrc"
							>
								Picture URL <FaEdit className="ms-2 fs-5 mb-1" />
							</Form.Label>
							<Form.Control
								name="profilePicture"
								type="url"
								id="userImgSrc"
								className="form-control fs-6 bg-transparent border-0 mb-3 text-primary rounded-pill"
								placeholder="Enter Picture URL"
								{...register("profilePicture", {
									value: state?.profilePicture,
									required: "profile picture is Required",
									minLength: {
										value: 0,
										message: "profile link can't be empty",
									},
								})}
							/>
							{errors.firstName && (
								<p className="text-danger fw-semibold">
									{errors?.profilePicture?.message}
								</p>
							)}
						</div>

						<div className="col-lg-9 col-md-7 col-12">
							<Form.Label
								className=" mt-5 text-dark fw-semibold"
								htmlFor="firstName"
							>
								First Name
							</Form.Label>
							<Form.Control
								name="firstName"
								type="text"
								id="firstName"
								className="form-control fs-4 fw-bold bg-transparent border-0 text-primary rounded-pill w-75"
								placeholder="Enter your first name"
								{...register("firstName", {
									value: state?.firstName,
									required: "firstName is Required",
									minLength: {
										value: 3,
										message: "firstName must be at least 5 letters",
									},
									maxLength: {
										value: 10,
										message: "firstName must be less than 50 letter ",
									},
								})}
							/>
							{errors.firstName && (
								<p className="text-danger fw-semibold">
									{errors?.firstName?.message}
								</p>
							)}
							<Form.Label
								className="mt-2 text-dark fw-semibold"
								htmlFor="lastName"
							>
								Last Name
							</Form.Label>
							<Form.Control
								name="lastName"
								type="text"
								id="lastName"
								className="form-control fs-4 fw-bold bg-transparent border-0 mb-2 text-primary rounded-pill w-75"
								placeholder="Enter your last name"
								{...register("lastName", {
									value: state?.lastName,
									required: "lastName is Required",
									minLength: {
										value: 3,
										message: "lastName must be at least 3 letters",
									},
									maxLength: {
										value: 15,
										message: "lastName must be less than 15 letter ",
									},
								})}
							/>
							{errors.lastName && (
								<p className="text-warning fw-semibold">
									{errors?.lastName?.message}
								</p>
							)}
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
							<div className="my-3 fw-semibold text-dark">
								<div className="text-dark text-start my-3">
									<Form.Label
										className="text-warning fw-semibold"
										htmlFor="userEmail"
									>
										Email:
									</Form.Label>
									<Form.Control
										name="email"
										type="email"
										id="userEmail"
										className="form-control text-center  mt-2 border-0 text-primary rounded-pill"
										placeholder="Enter Email"
										{...register("email", {
											value: state?.email,
											pattern: {
												value:
													/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
												message: "Please Enter Valid Email",
											},
										})}
									/>
								</div>
								{errors.email && (
									<p className="text-warning fw-semibold">
										{errors?.email?.message}
									</p>
								)}
								<div className="text-dark text-start my-3">
									<Form.Label
										className="text-warning fw-semibold"
										htmlFor="userPhone1"
									>
										Phone:
									</Form.Label>
									<Form.Control
										name="Phone"
										type="tel"
										id="userPhone"
										className="form-control text-center mt-2 border-0 text-primary rounded-pill"
										placeholder="Enter Phone 1"
										{...register("Phone", {
											value: state?.phone,
											required: "Phone is Required",
											pattern: {
												value: /^01[0-2,5]{1}[0-9]{8}$/g,
												message: "Please enter a valid Phone number",
											},
										})}
									/>
									{errors.Phone && (
										<p className="text-danger fw-semibold">
											{errors?.Phone?.message}
										</p>
									)}
								</div>
								<div className="text-dark text-start my-3">
									<Form.Label
										className="text-warning fw-semibold"
										htmlFor="userCity"
									>
										City:
									</Form.Label>
									<Form.Select
										name="city"
										type="text"
										id="userCity"
										className="form-control text-center  mt-2 border-0 text-primary rounded-pill"
										placeholder="Enter Your City/Location"
										{...register("city", {
											required: "please select your city",
											value: state?.city,
										})}
									>
										{cities &&
											cities.map((city, index) => {
												return <option key={index}>{city}</option>;
											})}
									</Form.Select>
								</div>
								<div className="text-dark text-start my-3">
									<Form.Label
										className="text-warning fw-semibold"
										htmlFor="userDoB"
									>
										Date of Birth:
									</Form.Label>
									<Form.Control
										name="dateOfBirth"
										type="date"
										id="userDoB"
										className="form-control text-center  mt-2 border-0 text-primary rounded-pill"
										placeholder="Enter Your DoB"
										{...register("dateOfBirth", {
											value: state?.dateOfBirth,
										})}
									/>
									{errors.dateOfBirth && (
										<p className="text-danger">
											{errors?.dateOfBirth?.message}
										</p>
									)}
								</div>
								<hr className="my-4" />
							</div>
						</div>
						<div className="vr p-0"></div>

						<div className="col">
							<h4 className="my-4 text-dark">Appointment Details</h4>
							<p className="lead fs-2 my-3 py-5 text-center text-primary">
								APPOINTMENTS Can't Be Edited From Here
							</p>
						</div>
					</div>
				</div>
				{/* {isEdited && ( */}
				<div className="row pt-5">
					<button
						className={
							state
								? "col-lg-2 col-md-3 col-4 btn btn-primary rounded-pill fw-semibold mx-auto text-warning"
								: "disabled invisible"
						}
						name="edit"
					>
						{state ? "Save Changes" : "---"}
					</button>
				</div>
				{/* )} */}
			</Form>

			{editedUser && (
				<Alert
					className="position-fixed text-center mx-3 bottom-0 start-0 w-25"
					variant="success"
				>
					User Info Edited Successfully
				</Alert>
			)}
			{/* {noeditAlert && (<Alert className="position-fixed text-center mx-3 bottom-0 start-0 w-25"
          variant="warning">Not Authorized to Edit from Database</Alert>)} */}
		</div>
	);
}
