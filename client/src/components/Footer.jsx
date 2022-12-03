import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FiPhoneCall, FiFacebook, FiLinkedin } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getinfo } from "../store/reducer/InfoSlice";

export default function Footer() {
	const dispatch = useDispatch();
	const { infos } = useSelector((state) => state.info);

	// loading data
	useEffect(() => {
		dispatch(getinfo());
		// eslint-disable-next-line
	}, []);
	return (
		<>
			<div className="bg-dark text-light">
				<footer className="container pb-2 pt-4">
					<Container>
						<Row>
							<NavLink to="/home" className="px-2 mb-3">
								<img alt="logo" src="Assets/Images/logo.png" width="150px" />
							</NavLink>
						</Row>
						<Row>
							<Col xs={12} md={6} lg={3}>
								<p className="my-1 w-75 text-white ">
									We take the work out of connecting with others so you can
									accomplish more.
								</p>
								<a
									target="_blank"
									rel="noreferrer"
									href={infos[0]?.socialMediaLinks?.facebook}
									className="px-2 mb-3 text-white"
								>
									<FiFacebook className="m-2 mt-3 fs-4" />
								</a>
								<a
									target="_blank"
									rel="noreferrer"
									href={infos[0]?.socialMediaLinks?.linkedin}
									className="px-2 mb-3 text-white"
								>
									<FiLinkedin className="m-2 mt-3 fs-4" />
								</a>
								<a
									target="_blank"
									rel="noreferrer"
									href={`tel:+${infos[0]?.contactPhones}`}
									className="px-2 mb-3 text-white"
								>
									<FiPhoneCall className="m-2 mt-3 fs-4" />
								</a>
							</Col>
							<Col xs={6} md={3} lg={3}>
								<ul className="nav flex-column text-warning">
									<li className="mb-2">
										<NavLink to="/home" className="p-0 ">
											Home
										</NavLink>
									</li>
									<li className="mb-2">
										<NavLink to="/organizers" className="p-0">
											Organizers
										</NavLink>
									</li>
									<li className="mb-2">
										<NavLink to="/about" className="p-0">
											About
										</NavLink>
									</li>
								</ul>
							</Col>
							<Col xs={6} md={3} lg={3}>
								<ul className="nav flex-column text-warning">
									<li className="mb-2">
										<NavLink to="/contact" className="p-0">
											Contact
										</NavLink>
									</li>
									<li className="mb-2">
										<NavLink to="/blogs" className="p-0">
											Blogs
										</NavLink>
									</li>
								</ul>
							</Col>
							<Col xs={6} md={6} lg={3}>
								<NavLink to="/signUp" className="btn btn-warning mt-2 mt-lg-0">
									Get Started
								</NavLink>
							</Col>
						</Row>
						<Row>
							<div className="d-flex flex-column flex-sm-row justify-content-center ">
								<h5 className="fs-6">
									<span className="text-warning mx-2">&copy;</span>
									Copy Right <span className="text-warning">Mowaeidy</span> 2022
								</h5>
							</div>
						</Row>
					</Container>
				</footer>
			</div>
		</>
	);
}
