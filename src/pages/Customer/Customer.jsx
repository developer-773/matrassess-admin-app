import { useEffect, useMemo, useState } from "react";
import { Paginated, Table } from "../../components/Table"
import { CustomersColumn } from "./CustomersColumn";
import "./Customer.css"
import { ToggleSwitch } from "../../components/ToggleSwitch";
import {MdDelete} from "react-icons/md"
import './Customer.css'
import { useQueryData } from "../../hook";
import axios from "axios";
import { Token } from "../../auth";
import { ToastAlertDeleteWithId, ToastContainerr } from "../../components/Toastify";

export const Customer = () => {

  const [page, setPage] = useState(1)
  const { data, refetch, error, status } =useQueryData("customer", `contact/${page}`);

  useEffect(() => {refetch()},[page])



Array.isArray(data?.data) ?
data?.data?.map(
  (item) =>
    (item.contacted = (
      <ToggleSwitch />
    ))&&
    (item.delete = (
      <button
        className="btn-delete"
        data-id={item.id}
        type="button"
        onClick={(e) => deleting(+e.target.dataset.id)}
      ></button>
    ))
) : null

const deleting = (id) => {
  ToastAlertDeleteWithId("contact", id);
};

	const columns = useMemo(() => CustomersColumn, []);
 
  return (
    <div className="p-5 customers">
      <ToastContainerr />
			{data?.data?.length ? (
				 <Paginated columns={columns} orderPage={page} setOrderPage={setPage} data={data.data}/>
			) : data?.status === "loading" ? (
				<h2>Ma'lumotlar yuklanmoqda... Internet bormi?</h2>
			) : data?.error?.message === "Network Error" ? (
				<h2 className="text-danger">Server bilan muammo yuzaga keldi !</h2>
			) :  !data?.data?.length ? (
        setTimeout(() => {
          <h3>Mijozlar hozircha mavjud emas. Hohlasangiz qo'shing</h3>
        },2500)
			) : (
				""
			)}
    </div>
  )
}
