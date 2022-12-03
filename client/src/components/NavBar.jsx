import React, { useEffect } from "react";
import { BiUser } from "react-icons/bi";
import { TbDoorExit } from "react-icons/tb";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

export default function NavBar() {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const logout = () => {
		localStorage.removeItem("userId");
		localStorage.removeItem("token");
		localStorage.removeItem("adm");
		navigate("/home");
	};
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);
	return (
		<>
			<Navbar
				className="bg-primary w-100"
				collapseOnSelect
				expand="lg"
				sticky="top"
			>
				<Container>
					<Navbar.Brand>
						<NavLink to="/home">
							<img src="Assets/Images/logo.png" alt="Mowaeidy" width="100px" />
						</NavLink>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="m-auto">
							<NavLink
								to="/home"
								className={({ isActive }) =>
									isActive
										? "active-link py-lg-3 mx-2 px-2 text-white"
										: "py-lg-3 mx-2 text-white"
								}
							>
								Home
							</NavLink>
							<NavLink
								className={({ isActive }) =>
									isActive
										? "active-link py-lg-3 mx-2 px-2 text-white"
										: "py-lg-3 mx-2 text-white"
								}
								to="/organizers"
							>
								Organizers
							</NavLink>
							{localStorage.getItem("userId") ? (
								<NavLink
									className={({ isActive }) =>
										isActive
											? "active-link py-lg-3 mx-2 px-2 text-white"
											: "py-lg-3 mx-2 text-white"
									}
									to="/organizer/me"
								>
									Calender
								</NavLink>
							) : (
								<NavLink className="py-lg-3 mx-2 text-white" to="/login">
									Calender
								</NavLink>
							)}
							<NavLink
								className={({ isActive }) =>
									isActive
										? "active-link py-lg-3 mx-2 px-2 text-white"
										: "py-lg-3 mx-2 text-white"
								}
								to="/about"
							>
								About
							</NavLink>
							<NavLink
								className={({ isActive }) =>
									isActive
										? "active-link py-lg-3 mx-2 px-2 text-white"
										: "py-lg-3 mx-2 text-white"
								}
								to="/contact"
							>
								Contact
							</NavLink>
							<NavLink
								className={({ isActive }) =>
									isActive
										? "active-link py-lg-3 mx-2 px-2 text-white"
										: "py-lg-3 mx-2 text-white"
								}
								to="/blogs"
							>
								Blog
							</NavLink>
						</Nav>
					</Navbar.Collapse>
					<Navbar.Brand className="pt-0">
						{localStorage.getItem("token") ? (
							<>
								{localStorage.getItem("userId") ? (
									<NavLink
										title="Profile"
										className={({ isActive }) =>
											isActive ? "fs-3 text-white" : "fs-4 text-warning"
										}
										to="/user/me"
									>
										<BiUser className="border text-center border-2 rounded border-warning" />
									</NavLink>
								) : (
									localStorage.getItem("adm") && (
										<NavLink
											title="Admin Panel"
											className={({ isActive }) =>
												isActive ? "fs-3 text-white" : "fs-4 text-warning"
											}
											to="/adminpanel"
										>
											<BiUser className="border text-center border-2 rounded border-warning" />
										</NavLink>
									)
								)}
								<NavLink
									className="ms-1 fs-4 text-warning"
									title="logout"
									to="/home"
								>
									<TbDoorExit onClick={logout} className="" />
								</NavLink>
							</>
						) : (
							<NavLink
								title="Login"
								className={({ isActive }) =>
									isActive ? "fs-2 text-white" : "fs-3 text-warning"
								}
								to="/login"
							>
								<BiUser className="border border-2 rounded border-warning" />
							</NavLink>
						)}
					</Navbar.Brand>
				</Container>
			</Navbar>
		</>
	);
}
