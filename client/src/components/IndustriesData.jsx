import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { industriesAPI } from "../API/AdminPanelApi";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteOutline, MdPersonAddAlt } from "react-icons/md";
import { Outlet, useNavigate } from "react-router-dom";

export default function IndustriesData() {
	const navigate = useNavigate();
	const [indistries, setIndistries] = useState([]);
	const [msg, setMsg] = useState([]);
	const [industryToUpdate, setIndustryToUpdate] = useState("");
	const { getIndustries, delIndustry } = industriesAPI;
	// functions to handle data
	const getAllIndustries = async () => {
		try {
			const res = await getIndustries();
			setIndistries(res.data);
		} catch (error) {
			console.log(error);
		}
	};
	const deleteIndustry = async (IndustryId) => {
		try {
			const res = await delIndustry(IndustryId);
			setMsg(res.message);
		} catch (error) {
			console.log(error);
		}
	};
	const editIndustry = (industryId) => {
		setIndustryToUpdate(industryId);
		navigate("/adminpanel/industries/edit");
	};

	// loading data
	useEffect(() => {
		getAllIndustries();
		// eslint-disable-next-line
	}, [msg]);
	return (
		<div>
			{/* table header */}
			<div className="container text-center my-3">
				<h2 className="text-primary">Industries</h2>
			</div>
			{/* Add button */}
			<div className="container d-flex justify-content-end ">
				<a className="btn border-0 p-0" href="industries/add">
					<MdPersonAddAlt className="fs-4 text-info" />
				</a>
			</div>
			<Outlet context={industryToUpdate} />

			{/* Table */}
			<Table
				responsive
				className="container mt-3 text-center"
				bordered
				hover
				variant="secondary"
			>
				<thead>
					<tr>
						<th>name</th>
						<th>description</th>
						<th>canclation Time</th>
						<th>Payment Allowed</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody className="align-middle">
					{indistries &&
						indistries.map((industry, index) => {
							return (
								<tr key={index}>
									<td>{industry?.name}</td>
									<td className="text-break w-25">{industry?.description}</td>
									<td>{industry?.canclationTime}</td>
									<td>{industry?.allowPayment.toString()}</td>
									<td>
										<button
											className="btn border-0 p-0"
											onClick={() => editIndustry(industry?._id)}
										>
											<AiFillEdit className="fs-4 text-danger" />
										</button>
										<button
											className="btn border-0 p-0"
											onClick={() => deleteIndustry(industry?._id)}
										>
											<MdDeleteOutline className="fs-4 text-secondary" />
										</button>
									</td>
								</tr>
							);
						})}
				</tbody>
			</Table>
		</div>
	);
}
