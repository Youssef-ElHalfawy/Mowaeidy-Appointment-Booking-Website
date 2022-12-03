import React from "react";
import { Outlet } from "react-router-dom";
import AdminConstrols from "./AdminConstrols";

export default function AdminPanel() {
	return (
		<div className="min-h-50">
			<AdminConstrols />
			<Outlet />
		</div>
	);
}
