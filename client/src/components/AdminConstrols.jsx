import React, { useState } from "react";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function AdminConstrols() {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	return (
		<>
			<Navbar bg="secondary" expand="xxl" className="mb-3 text-white container">
				<Container>
					<Navbar.Brand className="text-white" href="/adminpanel">
						Admin Panel
					</Navbar.Brand>
					<Navbar.Toggle
						onClick={handleShow}
						aria-controls={`offcanvasNavbar`}
					/>
					<Navbar.Offcanvas
						className="bg-primary"
						show={show}
						id={`offcanvasNavbar`}
						aria-labelledby={`offcanvasNavbarLabel`}
						placement="end"
					>
						<Offcanvas.Header
							onClick={handleClose}
							className="text-warning"
							closeButton
						>
							<Offcanvas.Title id={`offcanvasNavbarLabel`}>
								Admin options
							</Offcanvas.Title>
						</Offcanvas.Header>
						<Offcanvas.Body>
							<Nav className="justify-content-end flex-grow-1 pe-3">
								<NavLink
									onClick={handleClose}
									to="/adminpanel/admins"
									className={(isActive) =>
										"nav-link" + (!isActive ? " unselected" : "")
									}
								>
									Admins
								</NavLink>
								<NavLink
									onClick={handleClose}
									to="/adminpanel/users"
									className={(isActive) =>
										"nav-link" + (!isActive ? " unselected" : "")
									}
								>
									Users
								</NavLink>
								<NavLink
									onClick={handleClose}
									to="/adminpanel/industries"
									className={(isActive) =>
										"nav-link" + (!isActive ? " unselected" : "")
									}
								>
									Industries
								</NavLink>
								<NavLink
									onClick={handleClose}
									to="/adminpanel/blogs"
									className={(isActive) =>
										"nav-link" + (!isActive ? " unselected" : "")
									}
								>
									Blogs
								</NavLink>
								<NavLink
									onClick={handleClose}
									to="/adminpanel/info"
									className={(isActive) =>
										"nav-link" + (!isActive ? " unselected" : "")
									}
								>
									Information
								</NavLink>
							</Nav>
						</Offcanvas.Body>
					</Navbar.Offcanvas>
				</Container>
			</Navbar>
		</>
	);
}
