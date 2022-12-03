import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getinfo } from "../store/reducer/InfoSlice";

export default function AboutPage() {
  const dispatch = useDispatch();
	const { infos } = useSelector((state) => state.info);

	
	// loading data
	useEffect(() => {
		dispatch(getinfo());
		// eslint-disable-next-line
	}, []);
	return (
		<div className="container my-4  ">
			<div className="row align-items-center gy-5">
				<div className="col-md-6 col-sm-12">
					<img
						className="side-img"
						src="/Assets/Images/about.webp"
						alt="about"
					/>
				</div>
				<div className="col-md-6 col-sm-12">
					<h2 className="text-center section-title">About us</h2>
					<p className="text-center text-dark lead">{infos[0]?.aboutUs}</p>
				</div>
			</div>
		</div>
	);
}
