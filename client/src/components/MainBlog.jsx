import React, { useEffect } from "react";
import "../css/MainBlog.min.css";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getBlogs } from "../store/reducer/BlogSlice";
import Devider from "./Devider";

export default function MainBlog() {
	const { blogs } = useSelector((state) => state.blogs);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getBlogs());
	}, [dispatch]);
	return (
		<>
			<div className="card container mb-5 border-light bord">
				<div className="row g-0">
					<div className="col-md-4 m-auto py-3">
						<img
							src={blogs[0]?.blogPicture}
							className="img-fluid rounded-5 "
							alt="blog"
						/>
					</div>
					<div className="col-md-8">
						<div className="card-body">
							<h4 className="card-title text-start text-primary pt-3">
								{blogs[0]?.blogHeader}
							</h4>
							<h6 className="card-title text-start text-primary">
								{blogs[0]?.blogDate?.slice(0, blogs[0]?.blogDate.indexOf("T"))}
							</h6>
							<p className="card-text text-start">
								{`${blogs[0]?.blogBody.slice(0, 100)}...`}
							</p>
							<NavLink to="/blogs">
								<button className="btn btn-primary" type="button">
									Explore More
								</button>
							</NavLink>
						</div>
					</div>
				</div>
			</div>
			<Devider />
		</>
	);
}
