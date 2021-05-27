import React, { Fragment } from "react";
import { usePagination, useSortBy, useTable, useExpanded } from "react-table";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import MtTable from "@material-ui/core/Table";
import MtBody from "@material-ui/core/TableBody";
import MtCell from "@material-ui/core/TableCell";
import MtHead from "@material-ui/core/TableHead";
import MtRow from "@material-ui/core/TableRow";
import TableContainer from "@material-ui/core/TableContainer";
import { Container, Typography } from "@material-ui/core";

const TrTableContainer = withStyles({
  root: {
    borderRadius: 3,
    border: 0,
    width:"100%",
    color: "white",
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
})(TableContainer);
const TrMtRow=withStyles({
    root:{
        backgroundColor:"#797ef6",
        width:"100%",
    }
})(MtRow);

export default function Table({ columns: userColumns, data, renderRowSubComponent }) {
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    page, // Instead of using 'rows', we'll use page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    visibleColumns,
    state: { pageIndex, pageSize, expanded },
  } = useTable(
    {
      columns: userColumns,
      data,
      initialState: { pageIndex: 1, expanded: { 3: true } },
    },
    useSortBy,
    useExpanded,
    usePagination
  );
  return (
    <TrTableContainer component={Paper}>
      <MtTable {...getTableProps()}>
        <MtHead>
          {headerGroups.map((headerGroup) => (
            <TrMtRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <MtCell
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? "sort-desc"
                        : "sort-asc"
                      : ""
                  }
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </MtCell>
              ))}
            </TrMtRow>
          ))}
        </MtHead>

        <MtBody {...getTableBodyProps()}>
          {page.map((row, i) => {
            // Prepare the row for display
            prepareRow(row);
            return (
              // <MtRow {...row.getRowProps()}>
              //   {row.cells.map((cell) => {
              //     // Apply the cell props
              //     return (
              //       <MtCell {...cell.getCellProps()}>
              //         {
              //           // Render the cell contents
              //           cell.render("Cell")
              //         }
              //       </MtCell>
              //     );
              //   })}
              // </MtRow>
              <Fragment key={row.getRowProps().key}>
                <MtRow>
                  {row.cells.map((cell) => {
                    return (
                      <MtCell {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </MtCell>
                    );
                  })}
                </MtRow>
                {row.isExpanded && (
                  <MtRow>
                    <MtCell colSpan={visibleColumns.length}>
                      {renderRowSubComponent(row)}
                    </MtCell>
                  </MtRow>
                )}
              </Fragment>
            );
          })}
        </MtBody>
      </MtTable>
      <Container
        color="primary"
        style={{ backgroundColor: "#797ef6" }}
        className="pagination"
      >
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <Typography color="primary" component="span">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </Typography>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </Container>
    </TrTableContainer>
  );
}
