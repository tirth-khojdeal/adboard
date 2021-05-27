import React from "react";
import { useSortBy, useTable, } from "react-table";

import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

import MtTable from "@material-ui/core/Table";
import MtBody from "@material-ui/core/TableBody";
import MtCell from "@material-ui/core/TableCell";
import MtHead from "@material-ui/core/TableHead";
import MtRow from "@material-ui/core/TableRow";
import TableContainer from "@material-ui/core/TableContainer";

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

export default function Table({ columns, data }) {
  // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy // This plugin Hook will help to sort our table columns
  );

  /* 
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
  */
  return (
    <TrTableContainer component={Paper}>
      {/* apply the table props */}
      <MtTable {...getTableProps()}>
        <MtHead>
          {
            // Loop over the header rows
            headerGroups.map((headerGroup) => (
              // Apply the header row props
              <TrMtRow {...headerGroup.getHeaderGroupProps()}>
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((column) => (
                    // Apply the header cell props
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
                      {
                        // Render the header
                        column.render("Header")
                      }
                      {/* Add a sort direction indicator */}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : ""}
                      </span>
                    </MtCell>
                  ))
                }
              </TrMtRow>
            ))
          }
        </MtHead>
        {/* Apply the table body props */}
        <MtBody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            rows.map((row) => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <MtRow {...row.getRowProps()}>
                  {
                    // Loop over the rows cells
                    row.cells.map((cell) => {
                      // Apply the cell props
                      return (
                        <MtCell {...cell.getCellProps()}>
                          {
                            // Render the cell contents
                            cell.render("Cell")
                          }
                        </MtCell>
                      );
                    })
                  }
                </MtRow>
              );
            })
          }
        </MtBody>
      </MtTable>
    </TrTableContainer>
  );
}
