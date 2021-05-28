import { Box, CssBaseline, TableCell } from "@material-ui/core";
import "./style.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Table from "./Table";
import { withStyles } from "@material-ui/styles";

export default function Demo() {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const result = await axios("data.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      setData(result.data.data);
      console.log(result.data.data);
    })();
  }, []);

const SubRow=withStyles({
  root:{
    width:"100%",
    display:"flex",
    justifyContent:"space-evenly",
    backgroundColor:"white",
    color:"blue",
    padding:"20px",
  }
})(Box);

  const columns = React.useMemo(
    () => [
      {
        id: "expander", // Make sure it has an ID
        // Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
        //   <span {...getToggleAllRowsExpandedProps()}>
        //     {isAllRowsExpanded ? "👇" : "👉"}
        //   </span>
        // ),
        Cell: ({ row }) => 
            <span {...row.getToggleRowExpandedProps()}>
              {row.isExpanded ? '👇' : '👉'}
            </span>
      },
      {
        Header: "NAME",
        accessor: "name",
      },
      {
        Header: "STATUS",
        accessor: "status",
      },
      {
        Header: "INSIGHTS",
        accessor: "insights.data[0].clicks",
      },
    ],
    []
  );

    const renderRowSubComponent = (row) => {
      const data= row.original;
      let {name,insights,...others} = data;
      return (
        <>
          {insights ? (
              <>
                <TableCell style={{ color: "blue" }}>
                  {insights.data[0].clicks}
                </TableCell>
                <TableCell style={{ color: "blue" }}>
                  {insights.data[0].cpc}
                </TableCell>
                <TableCell style={{ color: "blue" }}>
                  {insights.data[0].spend}
                </TableCell>
                <TableCell style={{ color: "blue" }}>
                  {insights.data[0].ctr}
                </TableCell>
                {/* <TableCell style={{ color: "blue" }}>
                  {insights.data[0].reach}
                </TableCell>
                <TableCell style={{ color: "blue" }}>
                  {insights.data[0].impressions}
                </TableCell>
                <TableCell style={{ color: "blue" }}>
                  {insights.data[0].data_start}
                </TableCell>
                <TableCell style={{ color: "blue" }}>
                  {insights.data[0].data_stop}
                </TableCell> */}
              </>
          ) : (
            <TableCell
              colSpan={8}
              style={{ color: "blue", textAlign: "center" }}
            >
              No Data
            </TableCell>
          )}
        </>
      );
    };


  return (
    <div className="App">
      <CssBaseline />
      <Table
        columns={columns}
        data={data}
        renderRowSubComponent={renderRowSubComponent}
      />
    </div>
  );
}
