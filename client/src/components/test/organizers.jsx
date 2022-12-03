import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Dropdown, DropdownButton } from "react-bootstrap";
import { getAllOrganizers, orgActions } from "../store/reducer/orgSlice";
import SingleOrg from "./singleOrg";
import SideOrg from "./sideOrg";

export default function Organizers() {
	//----State from orgSlice

	const { organizers, filteredOrgs, isLoading, error } = useSelector(
		(state) => state.orgReducer
	);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllOrganizers());
		// eslint-disable-next-line
	}, []);

	//----Dynamic Dropdown list

	const orgCategories = [
		"All Industries",
		...new Set(organizers.map((org) => org?.industryIDFK?.name)),
	];
	const dropdownCategories = orgCategories.map((category) => (
		<Dropdown.Item
			as="button"
			key={category}
			onClick={() => {
				filterHandler(category);
			}}
		>
			{category}
		</Dropdown.Item>
	));

	//----Choosing a category fires a filter Action

	const [categoryName, setCategoryName] = useState("Select Industry");
	const filterHandler = (category) => {
		dispatch(orgActions.categoryFilter(category));
		setCategoryName(category);
	};
	// console.log(categoryName);

	//----Search filters again based on input

	const [searchInput, setSearchInput] = useState("");
	const searchHandler = (e) => setSearchInput(e.target.value);

	let searchedOrgs = organizers;
	if (filteredOrgs.length === 0) {
		searchedOrgs = organizers.filter(
			(org) => org?.orgName?.toLowerCase().indexOf(searchInput) !== -1
		);
	} else {
		searchedOrgs = filteredOrgs.filter(
			(org) => org?.orgName?.toLowerCase().indexOf(searchInput) !== -1
		);
	}
	// console.log(searchedOrgs);

	//----Showing details for organizer clicked on the side

	const [showSide, setShowSide] = useState(false);

	//----Final list of filtered organizers to show

	const finalOrgList =
		organizers.length === 0 ? (
			<p className="lead fs-3">No Organizers To Show</p>
		) : (
			searchedOrgs.map((org) => (
				<SingleOrg
					key={org._id}
					orgData={org}
					onClick={() => setShowSide(org)}
				/>
			))
		);
	// console.log(showSide);

	return (
		<div className="bg-light p-5">
			<h2 className="mb-5 text-primary">Our Organizers</h2>
			<div className="container">
				<div className="row mb-5 d-flex justify-content-around">
					<div className="col-md-5 my-4">
						<input
							type="search"
							className={"form-control mx-start"}
							placeholder="Search Organizer Name ..."
							onChange={searchHandler}
							value={searchInput.toLowerCase()}
						/>
					</div>
					<div className="col-md-2 my-4">
						<DropdownButton
							variant="primary"
							id="dropdown-basic"
							title={categoryName}
						>
							{dropdownCategories}
						</DropdownButton>
					</div>
				</div>
			</div>

			<div className="container text-light">
				<div className="row">
					<div className="col-lg-3 col-12">
						{showSide && (
							<SideOrg key={showSide._id} orgData={showSide}></SideOrg>
						)}
						{/* ??????????? */}
						{searchedOrgs.map((org) => (
							<SideOrg
								key={org._id}
								orgData={org}
								onClick={() => setShowSide(org)}
							/>
						))}
					</div>
					<div className="col-lg-9 col-12">{!error && finalOrgList}</div>
				</div>
			</div>

			{isLoading && (
				<Alert
					className="position-fixed text-center mx-3 bottom-0 start-0 w-25"
					variant="info"
				>
					Loading organizers...
				</Alert>
			)}
			{error && (
				<Alert
					className="position-fixed text-center mx-3 bottom-0 start-0 w-25"
					variant="danger"
				>
					Couldn't get organizers from Database
				</Alert>
			)}
		</div>
	);
}
