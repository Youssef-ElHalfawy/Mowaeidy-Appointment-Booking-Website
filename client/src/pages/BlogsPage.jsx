import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import Blog from "../components/OneBlog";
import { Outlet } from "react-router-dom";
import { getBlogs } from "../store/reducer/BlogSlice";

export default function BlogsPage() {
	const { blogs, isLoading, isError } = useSelector((state) => state.blogs);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getBlogs());
	}, [dispatch]);

	return (
		<div className="container">
			<h2 className="py-5 text-center mt-5 text-primary">Our Blogs</h2>
			{isLoading ? (
				<h1 className="alert alert-danger"> Loading.... </h1>
			) : (
				<>
					<div className="container px-4 rounded">
						<div className="row px-3 py-4 text-light">
							{blogs?.map((blog, index) => (
								<Blog key={index} blog={blog} />
							))}
						</div>
					</div>
					<div className=" mt-3 rounded bg-primary text-dark ">
						{blogs.length ? <Outlet /> : ""}
					</div>
				</>
			)}
			{isError && <h1 className="alert alert-danger"> Error.... </h1>}
		</div>
	);
}
