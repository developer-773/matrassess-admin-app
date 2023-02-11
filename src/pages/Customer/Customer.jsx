import { useMemo } from "react";
import { Table } from "../../components/Table"
import { CustomersColumn } from "./CustomersColumn";
import "./Customer.css"
import { ToggleSwitch } from "../../components/ToggleSwitch";
import {MdDelete} from "react-icons/md"
import './Customer.css'

export const Customer = () => {


		const data = [{
			id_number: 7,
      date: "12:13-12.05.2021",
			user_phone: "+998 90 123 45 67",
			toggle: <ToggleSwitch />,
      delete: <button className="p-3">
      <MdDelete color="red" size={20} />
    </button>,
      
		},
	];


	const columns = useMemo(() => CustomersColumn, []);
  const customerData = useMemo(() => data, [])
  return (
    <div className="p-5 customers">
      <Table columns={columns} data={customerData}/>
    </div>
  )
}
