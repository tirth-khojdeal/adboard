import { Box, Button, Container, CssBaseline, Grid, TableCell, TableRow, TextField, Typography} from "@material-ui/core";
import "./style.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Table from "./Table";
import BorderAllIcon from '@material-ui/icons/BorderAll';
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file


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
      </>
    );
  }

  function SubRowAsync({ row, rowProps, visibleColumns }) {
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState();

      useEffect(() => {
        (async () => {
          const res = await axios("adsets.json", {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          });
              const timer = setTimeout(() => {
                setData(res.data.data);
                setLoading(false);
              }, 500);

              return () => {
                clearTimeout(timer);
              };
        })();
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

  // const [state, setState] = useState([
  //   {
  //     startDate: new Date(),
  //     endDate: addDays(new Date(), 7),
  //     key: "selection",
  //   },
  // ]);
  // const [popup,setPopup]=useState(true);
  const [state, setState] = useState("2021 - 06 - 24");

  return (
    <div className="App">
      <div style={{ width: "100%" }}>
        <Box
          display="flex"
          flexDirection="row-reverse"
          p={1}
          m={1}
          bgcolor="background.paper"
        >
          <input type="date" value={state} onChange={(e)=>setState(e.target.value)}/>
          <input type="date"/>

          {/* <div className="">
            <DateRangePicker
              onChange={(item) => setState([item.selection])}
              showSelectionPreview={true}
              showPreview={false}
              moveRangeOnFirstSelection={false}
              months={2}
              ranges={state}
              direction="horizontal"
            />
          </div> */}
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          p={2}
          m={1}
          bgcolor="background.paper"
        >
          <Typography
            style={{ fontWeight: "700px", fontSize: "2rem", color: "coral" }}
            component="h1"
          >
            Analyze
          </Typography>
        </Box>
      </div>
      <CssBaseline />
      <Table
        columns={columns}
        data={data}
        renderRowSubComponent={renderRowSubComponent}
      />
    </div>
  );
}
