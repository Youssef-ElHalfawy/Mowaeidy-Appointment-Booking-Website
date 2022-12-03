import React from "react";
import { NavLink } from "react-router-dom";
import "../css/NotFoundPage.css";

export default function NotFoundPage() {
	return (
		<>
			<div className="container">
				<img
					src="/Assets/Images/notFound.png"
					alt="Not Found"
					className="not-found"
				></img>
				<h2 className="text-danger text-center">OOPS !!</h2>
				<h3 className="text-primary text-center">something went wrong</h3>
				<div className="mx-auto text-center">
					<span className="text-primary fw-bold fs-5  ">
						please try again later ..
					</span>
					<NavLink to="/home" className="btn ms-2 my-4 btn-outline-danger">
						Home
					</NavLink>
				</div>
			</div>
		</>
	);
}
