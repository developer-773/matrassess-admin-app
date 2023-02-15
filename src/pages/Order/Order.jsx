import { useState, useEffect, useMemo } from "react";
import { OrderColumn } from "./OrderColumn";
import "./Order.css";
import { Table } from "../../components/Table";
import { ToggleSwitch } from "../../components/ToggleSwitch";
import { useQuery } from "react-query";
import { useQueryData } from "../../hook";
import axios from "axios";
import { Token } from "../../auth";
import { Paginated } from "../../components/Table/Paginated";
import { withErrorBoundary, useErrorBoundary } from "react-use-error-boundary";


export const Order = () => {
	const [page, setPage] = useState(1)
	
	const {data, isLoading, refetch, status, error} = useQueryData("order", `orders/${page}`)
	const columns = useMemo(() => OrderColumn, []);

	useEffect(() => {refetch()},[page])
  
	

return (
	<div className="flex-grow-2 p-5 order">
			{data?.data?.length ? (
				<>
				<Paginated columns={columns} data={data?.data} orderPage={page} setOrderPage={setPage}/>
				{error ? <p>Bu sahifada buyurtmalar mavjud emas!</p> : ''}
				</>	
			) : status === "loading" ? (
				<h2>Ma'lumotlar yuklanmoqda... Internet bormi?</h2>
			) : '' ? (
				<h2 className="text-danger">Server bilan muammo yuzaga keldi !</h2>
			) : !data?.length ? (
				setTimeout(() => {
					<h3>Buyurtmalar hozircha mavjud emas.</h3>
				  },2500)
			) : (
				""
			)}
		</div>
	);
};
