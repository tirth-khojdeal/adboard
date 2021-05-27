import { CssBaseline, Typography } from "@material-ui/core";
import "./style.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Table from "./Table";

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

  const columns = React.useMemo(
    () => [
      {
        id: "expander", // Make sure it has an ID
        Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
          <span {...getToggleAllRowsExpandedProps()}>
            {isAllRowsExpanded ? "👇" : "👉"}
          </span>
        ),
        // Cell: ({ row }) =>
        //   // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
        //   row.canExpand ? (
        //     <span
        //       {...row.getToggleRowExpandedProps({
        //         style: {
        //           paddingLeft: `${row.depth * 2}rem`,
        //         },
        //       })}
        //     >
        //       {row.isExpanded ? "👇" : "👉"}
        //     </span>
        //   ) : null,
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
      },
      {
        Header: "INSIGHTS",
        accessor: "insights.data[0].clicks",
      },
    ],
    []
  );

    const renderRowSubComponent = (row) => {
      const {
        // name: { first, last },
        // location: { city, street, postcode },
        // picture,
        status,
        adsets,

      } = row.original;
      return (
        <>
          <div>Hii In Sub Row{JSON.stringify(row.original)}</div>
          <Typography color="primary">
            <h1>
              Value:{status}/
              {adsets.data[0].id}
            </h1>
          </Typography>
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
