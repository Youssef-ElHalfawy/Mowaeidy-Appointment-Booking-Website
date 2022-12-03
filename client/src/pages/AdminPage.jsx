import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminPanel from "../components/AdminPanel";

export default function AdminPage() {
	const navigate = useNavigate();
	useEffect(() => {
		checkAdmin();
		// eslint-disable-next-line
	}, []);
	const checkAdmin = () => {
		if (parseInt(localStorage.getItem("adm")) !== 278440) {
			navigate("/home");
		}
	};
	return (
		<>
			<AdminPanel />
		</>
	);
}
