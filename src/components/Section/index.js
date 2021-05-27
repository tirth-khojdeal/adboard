// App.js
import { CssBaseline } from "@material-ui/core";
import './style.css'

import axios from "axios";
import React, { useMemo, useState, useEffect } from "react";

import Table from "./Table";

export default function Demo(){
  /* 
    - Columns is a simple array right now, but it will contain some logic later on. It is recommended by react-table to memoize the columns data
    - Here in this example, we have grouped our columns into two headers. react-table is flexible enough to create grouped table headers
  */
  // data state to store the TV Maze API data. Its initial value is an empty array
  const [data, setData] = useState([]);

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    (async () => {
    //   const result = await axios("https://api.tvmaze.com/search/shows?q=snow");
    const result = await axios("data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    // const response=JSON.parse(result);
      setData(result.data.data);
      console.log(result.data.data);
    })();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        // Build our expander column
        id: "expander", // Make sure it has an ID
        Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
          <span {...getToggleAllRowsExpandedProps()}>
            {isAllRowsExpanded ? "👇" : "👉"}
          </span>
        ),
        Cell: ({ row }) =>
          // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
          // to build the toggle for expanding a row
          row.canExpand ? (
            <span
              {...row.getToggleRowExpandedProps({
                style: {
                  // We can even use the row.depth property
                  // and paddingLeft to indicate the depth
                  // of the row
                  paddingLeft: `${row.depth * 2}rem`,
                },
              })}
            >
              {row.isExpanded ? "👇" : "👉"}
            </span>
          ) : null,
      },
      {
        Header: "ID",
        accessor: "id", // accessor is the "key" in the data
      },
      {
        Header: "NAME",
        accessor: "name", // accessor is the "key" in the data
      },
      {
        Header: "STATUS",
        accessor: "status", // accessor is the "key" in the data
      },
      // {
      //   Header: "INSIGHTS",
      //   accessor: "insights",
      // },
    ],
    []
  );

  return (
    <div className="App">
      <CssBaseline />
      <Table columns={columns} data={data} />
    </div>
  );
}
