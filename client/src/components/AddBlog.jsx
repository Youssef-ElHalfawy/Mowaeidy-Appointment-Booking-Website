import React, { useEffect, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { blogAPI } from "../API/AdminPanelApi";
import { AiOutlineClose } from "react-icons/ai";

export default function AddBlog() {
	const { addBlog, getOneBlog, editBlog } = blogAPI;
	const location = useLocation();
	const navigate = useNavigate();
	// add
	const [formValues, setFormValues] = useState({
		blogHeader: "",
		blogBody: "",
		blogDate: new Date(),
		blogPicture: "",
	});
	// edit
	const blogToUpdate = useOutletContext();
	const [blog, setBlog] = useState({});
	const [isEdit, setIsEdit] = useState(false);
	// errors
	const [msg, setMsg] = useState("");
	const [isError, setIsError] = useState(true);
	const [alert, setAlert] = useState(false);
	const [err, setErr] = useState({
		blogHeader: null,
		blogBody: null,
		blogPicture: null,
	});
	// use Effect
	useEffect(() => {
		if (location.pathname === "/adminpanel/blogs/edit") {
			getBlog();
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
				err.blogHeader === null &&
				err.blogBody === null &&
				err.blogPicture === null
			) {
				setIsError(false);
			} else {
				setIsError(true);
			}
		} else {
			if (
				err.blogHeader === null &&
				err.blogBody === null &&
				err.blogPicture === null &&
				formValues.blogHeader !== "" &&
				formValues.blogBody !== "" &&
				formValues.blogPicture !== 0
			) {
				setIsError(false);
			} else {
				setIsError(true);
			}
		}
	};
	let setErrorsFunc = (e) => {
		if (isEdit) {
			setBlog({
				...blog,
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
			case "blogHeader":
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
			case "blogBody":
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
			case "blogPicture":
				if (e.target.value.length > 0) {
					setErrorsFunc(e);
				} else if (e.target.value.length <= 0) {
					setErr({
						...err,
						[e.target.name]: `${e.target.name} can't be empty`,
					});
				}
				break;
			default:
				break;
		}
	};
	// functions to handle data
	const getBlog = async () => {
		try {
			let res = await getOneBlog(blogToUpdate);
			res.data.message ? navigate("/adminpanel/blogs") : setBlog(res.data);
		} catch (err) {
			console.log(err);
		}
	};
	const add = async () => {
		try {
			let res = await addBlog(formValues);
			if (res.data.message === "done") {
				setMsg("blog added");
				setAlert(true);
				setTimeout(() => {
					navigate("/adminpanel/blogs");
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
			let res = await editBlog(blog._id, blog);
			if (res.data.message === "blog updated") {
				setMsg("blog edited");
				setAlert(true);
				setTimeout(() => {
					navigate("/adminpanel/blogs");
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
		navigate("/adminpanel/blogs");
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
					{isEdit ? "Edit Blog" : "Add Blog"}
				</h4>
				<Form className="my-4">
					<Form.Group className="mb-3" controlId="formBasicBlogHeader">
						<Form.Control
							name="blogHeader"
							onChange={changeHandler}
							type="text"
							placeholder="Blog Header"
							maxLength="30"
							defaultValue={isEdit ? blog.blogHeader : ""}
						/>
						{err.blogHeader && (
							<Form.Text className="text-danger">{err.blogHeader}</Form.Text>
						)}
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicblogBody">
						<Form.Control
							as="textarea"
							name="blogBody"
							onChange={changeHandler}
							type="text"
							placeholder="Body"
							maxLength="300"
							defaultValue={isEdit ? blog.blogBody : ""}
						/>
						{err.blogBody && (
							<Form.Text className="text-danger">{err.blogBody}</Form.Text>
						)}
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicblogPicture">
						<Form.Control
							name="blogPicture"
							onChange={changeHandler}
							type="text"
							placeholder="Picture Link"
							defaultValue={isEdit ? blog.blogPicture : ""}
						/>
						{err.blogPicture && (
							<Form.Text className="text-danger">{err.blogPicture}</Form.Text>
						)}
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
