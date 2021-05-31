import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import logo from "../../assets/logo.svg";
import mlogo from "../../assets/mlogo.svg";
import { Paper } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

import IconBarChart from "@material-ui/icons/BarChart";
import AssessmentIcon from "@material-ui/icons/Assessment";

import "./style.css";
import { Link } from "react-router-dom";

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    width: `calc(100% - ${drawerWidth}px)`,
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
}));

export default function Sidebar(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  
  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: props.open,
        [classes.drawerClose]: !props.open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: props.open,
          [classes.drawerClose]: !props.open,
        }),
      }}
    >
      <Divider />
      <Paper elevation={0} >
        {props.open ? (
          <ListItemIcon className="logo-h">
            <img className="p5" src={logo} alt="" width="auto" />
          </ListItemIcon>
        ) : (
          <ListItemIcon className="MuiToolbar-regular">
            <img className="p5" src={mlogo} alt="" width="auto" height="50px" />
          </ListItemIcon>
        )}
      </Paper>
      <List component="nav" className={classes.appMenu} disablePadding>
        <Link to="/analyze">
          <ListItem
            onClick={() => {
              setOpen(!open);
            }}
            className={!open ? "bg-secondary color-white" : ""}
          >
            <ListItemIcon>
              <IconBarChart />
            </ListItemIcon>
            <ListItemText primary="Analyze" />
          </ListItem>
        </Link>

        <Link to="/automate">
          <ListItem>
            <ListItemIcon>
              <AssessmentIcon />
            </ListItemIcon>
            <ListItemText primary="Automate" />
          </ListItem>
        </Link> 

      </List>
    </Drawer>
  );
}
