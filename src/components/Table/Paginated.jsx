import React, { useEffect, useMemo } from "react";
import { useTable, usePagination } from "react-table";


export const Paginated = ({ columns, data, orderPage, setOrderPage }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 }
    },
    usePagination
  );

  const { pageIndex, pageSize } = state;



  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
   
        <span>
           Keyingi sahifaga o'tish:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              let pageNumber = Number(e.target.value)
               
                    pageNumber >=1 ? setOrderPage(pageNumber) : 1
                    // if(pageNumber >=1) {
                    //       setOrderPage(pageNumber)
                    // })
                ? (e.target.value) - 1
                : 0;
              gotoPage(pageNumber)
            }}
            style={{ width: "50px" }}
          />
        </span>{" "}
        {/* <select
          value={pageSize}
          onChange={(e) => setPageSize(1)}
        >
          {[1].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select> */}
      </div>
    </>
  );
};
