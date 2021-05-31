import React, { Fragment } from "react";
import {
  usePagination,
  useSortBy,
  useTable,
  useExpanded,
  useRowSelect,
} from "react-table";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import MtTable from "@material-ui/core/Table";
import MtBody from "@material-ui/core/TableBody";
import MtCell from "@material-ui/core/TableCell";
import MtHead from "@material-ui/core/TableHead";
import MtRow from "@material-ui/core/TableRow";
import TableContainer from "@material-ui/core/TableContainer";
import { Button, Container, InputBase, MenuItem, Select, Typography } from "@material-ui/core";

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

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  }
);

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
    // selectedFlatRows,
    state: { pageIndex, 
      pageSize,
      //  selectedRowIds
     },
  } = useTable(
    {
      columns: userColumns,
      data,
      initialState: {
        pageIndex: 0,
        pageSize: 5,
      },
    },
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
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
            prepareRow(row);
            return (
              <Fragment key={row.getRowProps().key}>
                <MtRow {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <MtCell {...cell.getCellProps()}>
                        {cell.render("Cell")}
                        {/* {JSON.stringify(row)} */}
                      </MtCell>
                    );
                  })}
                </MtRow>
                {row.isExpanded && (
                  <>
                    <MtRow style={{ backgroundColor: "coral" }}>
                      <MtCell colSpan={3}></MtCell>
                      <MtCell>CLICKS</MtCell>
                      <MtCell>CPC</MtCell>
                      <MtCell>SPEND</MtCell>
                      <MtCell>CTR</MtCell>
                      <MtCell>REACH</MtCell>
                      <MtCell>IMPRESSIONS</MtCell>
                      <MtCell>DATE_START</MtCell>
                      <MtCell>DATE_STOP</MtCell>
                    </MtRow>
                    <MtRow colSpan={visibleColumns.length}>
                      {renderRowSubComponent(row)}
                    </MtRow>
                  </>
                )}
              </Fragment>
            );
          })}
        </MtBody>
      </MtTable>
      {/* <pre>
        <code>
          {JSON.stringify(
            {
              selectedRowIds: selectedRowIds,
              "selectedFlatRows[].original": selectedFlatRows.map(
                (d) => d.original
              ),
            },
            null,
            2
          )}
        </code>
      </pre> */}
      <Container color="primary" className="pagination">
        <Button
          variant="contained"
          color="primary"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {"<<"}
        </Button>
        <Button
          variant="contained"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {"<"}
        </Button>
        <Button
          variant="contained"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          {">"}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {">>"}
        </Button>

        <Typography color="primary" component="span">
          Page
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </Typography>

        <Typography color="primary" component="span">
          | Go to page:
          <BootstrapInput
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </Typography>
        <Select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 25].map((pageSize) => (
            <MenuItem key={pageSize} value={pageSize}>
              Show {pageSize}
            </MenuItem>
          ))}
        </Select>
      </Container>
    </TrTableContainer>
  );
}
