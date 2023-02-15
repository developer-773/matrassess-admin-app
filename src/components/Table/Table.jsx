import { useFilters, useGlobalFilter, useSortBy, useTable } from "react-table";
import { GlobalInput } from "../Input";

export const Table = ({ columns, data }) => {

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		state, setGlobalFilter,
		prepareRow,
	} = useTable({ columns, data }, useGlobalFilter, useSortBy);


const {globalFilter} = state

	return (
		<div className="table-box">
			<GlobalInput filter={globalFilter} setFilter={setGlobalFilter}/>
			<table {...getTableProps()}>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup?.getHeaderGroupProps()}>
							{headerGroup?.headers?.map((column) => (
								<th {...column?.getHeaderProps(column.getSortByToggleProps)}>
									{column?.render("Header")}
									
									 <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
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
