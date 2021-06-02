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
import Popover from "@material-ui/core/Popover";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";

import { Box, Button,Container, Grid, InputBase, List, ListItem, MenuItem, Select, Typography } from "@material-ui/core";

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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <>{children}</>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Table({ columns: userColumns, data, renderRowSubComponent,renderRowSub2Component }) {
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
    allColumns,
    getToggleHideAllColumnsProps,
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
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {setAnchorEl(event.currentTarget);};
  const handleClose = () => {setAnchorEl(null);};
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box display="flex" flexDirection="column" p={1}>
        <AppBar position="relative">
          <Tabs
            flexDirection="flex-start"
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Campaigns" {...a11yProps(0)} />
            <Tab label="Adsets" {...a11yProps(1)} />
            <Tab label="Ads" {...a11yProps(2)} />
          </Tabs>
          <Button
            aria-describedby={id}
            variant="contained"
            color="secondary"
            onClick={handleClick}
            style={{ position: "absolute", right: "0px", top: "6px" }}
          >
            Columns
          </Button>
        </AppBar>
        <TabPanel value={value} index={0}>
          <TableContainer component={Paper}>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <Grid item xs={12} md={6}>
                <List>
                  <ListItem>
                    <Typography color="primary">
                      <IndeterminateCheckbox
                        {...getToggleHideAllColumnsProps()}
                      />
                      Toggle All
                    </Typography>
                  </ListItem>
                  {allColumns.map((column) => (
                    <Typography color="primary" key={column.id}>
                      <ListItem>
                        <input
                          type="checkbox"
                          {...column.getToggleHiddenProps()}
                        />
                        {column.id}
                      </ListItem>
                    </Typography>
                  ))}
                </List>
              </Grid>
            </Popover>
            <MtTable {...getTableProps()}>
              <MtHead>
                {headerGroups.map((headerGroup) => (
                  <TrMtRow {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <MtCell
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
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
                  const rowProps = row.getRowProps();
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
                          {renderRowSubComponent({
                            row,
                            rowProps,
                            visibleColumns,
                          })}
                        </>
                      )}
                      {row.isExpanded && (
                        <>
                          {renderRowSub2Component({
                            row,
                            rowProps,
                            visibleColumns,
                          })}
                        </>
                      )}
                    </Fragment>
                  );
                })}
              </MtBody>
            </MtTable>
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
                    const page = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
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
          </TableContainer>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TableContainer component={Paper}>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <Grid item xs={12} md={6}>
                <List>
                  <ListItem>
                    <Typography color="primary">
                      <IndeterminateCheckbox
                        {...getToggleHideAllColumnsProps()}
                      />
                      Toggle All
                    </Typography>
                  </ListItem>
                  {allColumns.map((column) => (
                    <Typography color="primary" key={column.id}>
                      <ListItem>
                        <input
                          type="checkbox"
                          {...column.getToggleHiddenProps()}
                        />
                        {column.id}
                      </ListItem>
                    </Typography>
                  ))}
                </List>
              </Grid>
            </Popover>
            <MtTable {...getTableProps()}>
              <MtBody {...getTableBodyProps()}>
                {page.map((row, i) => {
                  prepareRow(row);
                  const rowProps = row.getRowProps();
                  return (
                    <Fragment key={row.getRowProps().key}>
                      <>
                        {renderRowSubComponent({
                          row,
                          rowProps,
                          visibleColumns,
                        })}
                      </>
                      {row.isExpanded && (
                        <>
                          {renderRowSub2Component({
                            row,
                            rowProps,
                            visibleColumns,
                          })}
                        </>
                      )}
                    </Fragment>
                  );
                })}
              </MtBody>
            </MtTable>
          </TableContainer>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <TableContainer component={Paper}>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <Grid item xs={12} md={6}>
                <List>
                  <ListItem>
                    <Typography color="primary">
                      <IndeterminateCheckbox
                        {...getToggleHideAllColumnsProps()}
                      />{" "}
                      Toggle All
                    </Typography>
                  </ListItem>
                  {allColumns.map((column) => (
                    <Typography color="primary" key={column.id}>
                      <ListItem>
                        <input
                          type="checkbox"
                          {...column.getToggleHiddenProps()}
                        />
                        {column.id}
                      </ListItem>
                    </Typography>
                  ))}
                </List>
              </Grid>
            </Popover>
            <MtTable {...getTableProps()}>
              <MtBody {...getTableBodyProps()}>
                {page.map((row, i) => {
                  prepareRow(row);
                  const rowProps = row.getRowProps();
                  return (
                    <Fragment key={row.getRowProps().key}>
                        <>
                          {renderRowSub2Component({
                            row,
                            rowProps,
                            visibleColumns,
                          })}
                        </>
                    </Fragment>
                  );
                })}
              </MtBody>
            </MtTable>
          </TableContainer>
        </TabPanel>
      </Box>
    </>
  );
}
