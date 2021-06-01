import { Button, CssBaseline, TableCell, TableRow} from "@material-ui/core";
import "./style.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Table from "./Table";
import BorderAllIcon from '@material-ui/icons/BorderAll';

export default function Demo() {
  const [data, setData] = useState([]);
  const [adset, setAdset] = useState([]);


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


  function SubRows({ row, rowProps, data, loading }) {
    if (loading) {
      return (
        <TableRow>
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell colSpan={1}>Loading...</TableCell>
        </TableRow>
      );
    }
    return (
      <>
        return (
          {/* <div>
            {JSON.stringify(data)}
          </div> */}
        <TableRow key={row.index}>
          <TableCell />
          <TableCell>
            <span {...row.getToggleRowExpandedProps()}>
              {row.isExpanded ? "👇" : "👉"}
            </span>
          </TableCell>
          <TableCell>
            <BorderAllIcon />
            {data[row.index].name}
          </TableCell>
          <TableCell>{data[row.index].status}</TableCell>
        </TableRow>
        );
      </>
    );
  }

  function SubRowAsync({ row, rowProps, visibleColumns }) {
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState();
    React.useEffect(() => {
      const timer = setTimeout(() => {
        setData(adset);
        setLoading(false);
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    }, []);

    return (
      <SubRows
        row={row}
        rowProps={rowProps}
        visibleColumns={visibleColumns}
        data={data}
        loading={loading}
      />
    );
  }

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
        SubCell: () => null,
      },
      {
        Header: "NAME",
        accessor: "name",
        SubCell: (cellProps) => (
          <>
              {cellProps.value}
          </>
        ),
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
        SubCell: () => null,
      },
      {
        Header: "CPC",
        accessor: "insights.data[0].cpc",
        SubCell: () => null,
      },
      {
        Header: "SPEND",
        accessor: "insights.data[0].spend",
        SubCell: () => null,
      },
      {
        Header: "CTR",
        accessor: "insights.data[0].ctr",
        SubCell: () => null,
      },
      {
        Header: "REACH",
        accessor: "insights.data[0].reach",
        SubCell: () => null,
      },
      {
        Header: "IMPRESSIONS",
        accessor: "insights.data[0].impressions",
        SubCell: () => null,
      },
      {
        Header: "DATE_START",
        accessor: "insights.data[0].date_start",
        SubCell: () => null,
      },
      {
        Header: "DATE_STOP",
        accessor: "insights.data[0].date_stop",
        SubCell: () => null,
      },
    ],
    []
  );

  // const renderRowSubComponent = (row) => {
  //   const data = row.original;
  //   let { name, insights, ...others } = data;
  //   return (
  //     <>
  //       {insights ? (
  //         <>
  //           <TableCell colSpan={3}></TableCell>
  //           <TableCell style={{ color: "blue" }}>
  //             {insights.data[0].clicks}
  //           </TableCell>
  //           <TableCell style={{ color: "blue" }}>
  //             {insights.data[0].cpc}
  //           </TableCell>
  //           <TableCell style={{ color: "blue" }}>
  //             {insights.data[0].spend}
  //           </TableCell>
  //           <TableCell style={{ color: "blue" }}>
  //             {insights.data[0].ctr}
  //           </TableCell>
  //           <TableCell style={{ color: "blue" }}>
  //             {insights.data[0].reach}
  //           </TableCell>
  //           <TableCell style={{ color: "blue" }}>
  //             {insights.data[0].impressions}
  //           </TableCell>
  //           <TableCell style={{ color: "blue" }}>
  //             {insights.data[0].date_start}
  //           </TableCell>
  //           <TableCell style={{ color: "blue" }}>
  //             {insights.data[0].date_stop}
  //           </TableCell>
  //         </>
  //       ) : (
  //         <TableCell colSpan={8} style={{ color: "blue", textAlign: "center" }}>
  //           No Data
  //         </TableCell>
  //       )}
  //     </>
  //   );
  // };

  // Create a function that will render our row sub components
  const renderRowSubComponent = React.useCallback(
    ({ row, rowProps, visibleColumns }) => (
      <SubRowAsync
        row={row}
        rowProps={rowProps}
        visibleColumns={visibleColumns}
      />
    ),
    []
  );

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
