import { Box, Button, CssBaseline, TableCell, TableRow, Typography} from "@material-ui/core";
import "./style.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Table from "./Table";
import BorderAllIcon from '@material-ui/icons/BorderAll';
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import IconBarChart from "@material-ui/icons/BarChart";


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
            <BorderAllIcon style={{ verticalAlign: "middle" }} />
            <span className="pl-5">{data[row.index].name}</span>
          </TableCell>
          <TableCell>{data[row.index].effective_status}</TableCell>
        </TableRow>
      </>
    );
  }

    function Sub2Rows({ row, rowProps, data, loading }) {
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
          {data.map((datas) => (
            <TableRow key={datas.id}>
              <TableCell />
              <TableCell />
              <TableCell>
                <img
                  style={{ verticalAlign: "middle" }}
                  src={datas.creative.thumbnail_url}
                  alt="NA"
                  height="25px"
                  width="25px"
                />
                <span className="pl-5">{datas.name}</span>
              </TableCell>
              <TableCell>
                <Typography variant="p">{datas.name}</Typography>
              </TableCell>
              <TableCell>{datas.effective_status}</TableCell>
            </TableRow>
          ))}
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

    function Sub2RowAsync({ row, rowProps, visibleColumns }) {
      const [loading2, setLoading2] = React.useState(true);
      const [data2, setData2] = React.useState();

      useEffect(() => {
        (async () => {
          const res = await axios("ads.json", {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          });
          const timer = setTimeout(() => {
            setData2(res.data.data);
            setLoading2(false);
          }, 500);

          return () => {
            clearTimeout(timer);
          };
        })();
      }, []);

      return (
        <Sub2Rows
          row={row}
          rowProps={rowProps}
          visibleColumns={visibleColumns}
          data={data2}
          loading={loading2}
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
        SubCell: (cellProps) => <>{cellProps.value}</>,
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
        Header: "OBJECTIVE",
        accessor: "objective",
        SubCell: () => null,
      },
      {
        Header: "ID",
        accessor: "id",
        SubCell: () => null,
      },
      // {
      //   Header: "SPEND",
      //   accessor: "insights.data[0].spend",
      //   SubCell: () => null,
      // },
      // {
      //   Header: "CTR",
      //   accessor: "insights.data[0].ctr",
      //   SubCell: () => null,
      // },
      // {
      //   Header: "REACH",
      //   accessor: "insights.data[0].reach",
      //   SubCell: () => null,
      // },
      // {
      //   Header: "IMPRESSIONS",
      //   accessor: "insights.data[0].impressions",
      //   SubCell: () => null,
      // },
      // {
      //   Header: "DATE_START",
      //   accessor: "insights.data[0].date_start",
      //   SubCell: () => null,
      // },
      // {
      //   Header: "DATE_STOP",
      //   accessor: "insights.data[0].date_stop",
      //   SubCell: () => null,
      // },
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
    const renderRowSub2Component = React.useCallback(
      ({ row, rowProps, visibleColumns }) => (
        <Sub2RowAsync
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
  const [state, setState] = useState("2021 - 06 - 24");

  return (
    <div className="App">
      <CssBaseline />
      <div style={{ width: "100%" }}>
        <Box
          display="flex"
          flexDirection="row-reverse"
          p={1}
          m={1}
          bgcolor="background.paper"
        >
          <select>
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
          <input
            type="date"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <input type="date" />

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
            style={{ fontWeight: "700px", fontSize: "2rem",}}
            component="h1"
          >
            <IconBarChart />
            Analyze
            <span
              style={{ fontSize: "1.5rem", color: "white",backgroundColor:"blue",borderRadius:"10px",padding:"5px" }}
            >
              Beta
            </span>
          </Typography>
        </Box>
      </div>
      <Table
        columns={columns}
        data={data}
        renderRowSubComponent={renderRowSubComponent}
        renderRowSub2Component={renderRowSub2Component}
      />
    </div>
  );
}
