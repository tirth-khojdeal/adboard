import { Button, CssBaseline, TableCell } from "@material-ui/core";
import "./style.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Table from "./Table";

export default function Demo() {
  const [data, setData] = useState([]);
  const [adset,setAdset]=useState([]);

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

    useEffect(() => {
      (async () => {
        const res = await axios("adsets.json", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        setAdset(res.data.data);
        // console.log(res.data.data[0].name);
      })();
    }, []);

// const SubRow=withStyles({
//   root:{
//     width:"100%",
//     display:"flex",
//     justifyContent:"space-evenly",
//     backgroundColor:"white",
//     color:"blue",
//     padding:"20px",
//   }
// })(Box);

  const columns = React.useMemo(
    () => [
      {
        id: "expander", // Make sure it has an ID
        // Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
        //   <span {...getToggleAllRowsExpandedProps()}>
        //     {isAllRowsExpanded ? "👇" : "👉"}
        //   </span>
        // ),
        Cell: ({ row }) => (
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? "👇" : "👉"}
          </span>
        ),
      },
      {
        Header: "NAME",
        accessor: "name",
      },
      {
        Header: "STATUS",
        accessor: "status",
        maxWidth: 70,
        minWidth: 70,
        Cell: ({ row: { original } }) => (
          <Button variant="contained" onClick={() => console.log(original)}>
            {original.status}
          </Button>
        ),
      },
      {
        Header: "ClICKS",
        accessor: "insights.data[0].clicks",
      },
      {
        Header: "CPC",
        accessor: "insights.data[0].cpc",
      },
      {
        Header: "SPEND",
        accessor: "insights.data[0].spend",
      },
      {
        Header: "CTR",
        accessor: "insights.data[0].ctr",
      },
      {
        Header: "REACH",
        accessor: "insights.data[0].reach",
      },
      {
        Header: "IMPRESSIONS",
        accessor: "insights.data[0].impressions",
      },
      {
        Header: "DATE_START",
        accessor: "insights.data[0].date_start",
      },
      {
        Header: "DATE_STOP",
        accessor: "insights.data[0].date_stop",
      },
    ],
    []
  );

    const renderRowSubComponent =(row)=> {
      const data= row.original;
      let {name,insights,...others} = data;
      return (
        <>
          {insights ? (
              <>
              <TableCell colSpan={3}></TableCell>
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
                <TableCell style={{ color: "blue" }}>
                  {insights.data[0].reach}
                </TableCell>
                <TableCell style={{ color: "blue" }}>
                  {insights.data[0].impressions}
                </TableCell>
                <TableCell style={{ color: "blue" }}>
                  {insights.data[0].date_start}
                </TableCell>
                <TableCell style={{ color: "blue" }}>
                  {insights.data[0].date_stop}
                </TableCell>
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
