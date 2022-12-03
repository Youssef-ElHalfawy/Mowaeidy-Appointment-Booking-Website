import React, { useState } from "react";
import { Button, Collapse, ListGroup } from "react-bootstrap";

export default function Sidebar() {
	const [open, setOpen] = useState(false);
	return (
		<div>
			<div className="container-fluid">
				<div className="row flex-nowrap">
					<Collapse in={open}>
						<div className="col-sm-2 col-auto px-2 py-2" id="sidebar">
							<div
								className="list-group border-0 text-center text-sm-start min-vh-100"
								id="sidebar-menu"
							>
								<ListGroup>
									<ListGroup.Item>
										<a
											href="/adminpanel/admins"
											data-bs-parent="#sidebar"
											className="btn text-uppercase"
										>
											Admins
										</a>
									</ListGroup.Item>
									<ListGroup.Item>
										<a
											href="/adminpanel/users"
											data-bs-parent="#sidebar"
											className="btn text-uppercase"
										>
											users
										</a>
									</ListGroup.Item>
									<ListGroup.Item>
										<a
											href="/adminpanel/industries"
											data-bs-parent="#sidebar"
											className="btn text-uppercase"
										>
											industries
										</a>
									</ListGroup.Item>
									<ListGroup.Item>
										<a
											href="/adminpanel/blogs"
											data-bs-parent="#sidebar"
											className="btn text-uppercase"
										>
											blogs
										</a>
									</ListGroup.Item>
									<ListGroup.Item>
										<a
											href="/adminpanel/info"
											data-bs-parent="#sidebar"
											className="btn text-uppercase"
										>
											Information
										</a>
									</ListGroup.Item>
								</ListGroup>
							</div>
						</div>
					</Collapse>

					<div className="col-sm col border-start ps-md-2 pt-2">
						<Button
							onClick={() => setOpen(!open)}
							aria-controls="sidebar"
							aria-expanded={open}
						>
							click
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
