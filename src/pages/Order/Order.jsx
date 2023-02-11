import { useState, useEffect, useMemo } from "react";
import { OrderColumn } from "./OrderColumn";
import "./Order.css";
import { Table } from "../../components/Table";
import { ToggleSwitch } from "../../components/ToggleSwitch";
import { useQuery } from "react-query";





export const Order = () => {

	

	const data = [
		{
			id_number: 6,
			user_name: "Muhammadbek Jo'rabekov",
			user_phone: "+998 90 123 45 67",
			product_name: "Ortopedik Eko matras",
			product_count: "4",
			toggle: <ToggleSwitch />,

		},
		{
			id_number: 7,
			user_name: "Robert Fox",
			user_phone: "+998 90 123 45 67",
			product_name: "Ortopedik Eko matras",
			product_count: "4",
			toggle: "false",
		},
	];
	const columns = useMemo(() => OrderColumn, []);
  const orderData = useMemo(() => data, [])



	return (
		<div className="flex-grow-2 p-5 order">
			
			<Table columns={columns} data={orderData} />
		</div>
	);
};
