import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import {
  PagingState,
  SortingState,
  CustomPaging
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel
} from "@devexpress/dx-react-grid-material-ui";

export default () => {
  const [columns] = useState([
    { name: "name", title: "Name" },
    { name: "status", title: "Status" },
    { name: "id", title: "Id" },
    // { name: "insights",title:"Insights" },
  ]);
  const [rows, setRows] = useState([]);
  const [tableColumnExtensions] = useState([
    { columnName: "id", align: "right" },
    // { columnName: "insights", align: "right" },
  ]);
  const [sorting, setSorting] = useState([
    { columnName: "name", direction: "desc" }
  ]);

  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageSizes] = useState([5, 10, 15]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const changePageSize = (value) => {
    const totalPages = Math.ceil(totalCount / value);
    const updatedCurrentPage = Math.min(currentPage, totalPages - 1);

    setPageSize(value);
    setCurrentPage(updatedCurrentPage);
  };


  const loadData = () => {
        fetch("data.json", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => response.json())
        .then(({ data}) => {
          setRows(data);
          setTotalCount(data.length);
          setLoading(false);
        })
        .catch(() => setLoading(false));
  };

  useEffect(() => loadData());

  return (
    <Paper style={{ position: "relative" }}>
      <Grid rows={rows} columns={columns}>
        <SortingState sorting={sorting} onSortingChange={setSorting} />
        <PagingState
          currentPage={currentPage}
          onCurrentPageChange={setCurrentPage}
          pageSize={pageSize}
          onPageSizeChange={changePageSize}
        />
        <CustomPaging totalCount={totalCount} />
        <Table columnExtensions={tableColumnExtensions} />
        <TableHeaderRow showSortingControls />
        <PagingPanel pageSizes={pageSizes} />
      </Grid>
      {loading && <h1>hii</h1>}
    </Paper>
  );
};

