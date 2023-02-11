import { useFilters, useTable } from "react-table";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

export const Table = ({ columns, data }) => {

	const [styles, setStyles] = useState(false)

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		state,
		setGlobalFilter,
		prepareRow,
	} = useTable({ columns, data }, useFilters);

	const sty = {
		position: "relative",
		zIndex: "3",
	};

	window.addEventListener("click", (evt) => {
		const target = evt.target;
		if (target.className === "td") {
			setStyles(true)
		}

		if(target.parentElement.style === 'position-relative') {
		 setStyles(false)
		}

	});


	return (
		<div className="table-box">
			<table {...getTableProps()}>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup?.getHeaderGroupProps()}>
							{headerGroup?.headers?.map((column) => (
								<th {...column?.getHeaderProps()}>
									{column?.render("Header")}
									{/* <div>
										{column.canFilter
											? column.render("Filter")
											: column.render("Header")}
									</div> */}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{rows?.map((row) => {
						prepareRow(row);
						return (
							<tr {...row?.getRowProps()}>
								{row?.cells?.map((cell) => {
									return (
										<td {...cell?.getCellProps()} className="td">
											{cell?.render("Cell")}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};
