import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import KeyboardArrowDownOutlinedIcon from "@material-ui/icons/KeyboardArrowDownOutlined";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import logo from "../../assets/logo.svg";
import mlogo from "../../assets/mlogo.svg";
import {Paper} from "@material-ui/core";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Collapse from "@material-ui/core/Collapse";


import IconExpandLess from "@material-ui/icons/ExpandLess";
import IconExpandMore from "@material-ui/icons/ExpandMore";
import IconDashboard from "@material-ui/icons/Dashboard";
import IconShoppingCart from "@material-ui/icons/ShoppingCart";
import IconPeople from "@material-ui/icons/People";
import IconBarChart from "@material-ui/icons/BarChart";
import "./style.css";

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
          function handleClick() {
            setOpen(!open);
          }

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
      <Paper elevation={4}>
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
        <ListItem
          button
          onClick={handleClick}
          className={open ? "btn" : "btn bg-secondary color-white"}
        >
          <ListItemIcon className={classes.menuItemIcon}>
            <IconDashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
          {open ? <IconExpandLess /> : <IconExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Divider />
          <List component="div" disablePadding>
            <ListItem button className={classes.menuItem}>
              <ChevronRightIcon />
              <ListItemText inset primary="Sub 1" />
            </ListItem>
            <ListItem button className={classes.menuItem}>
              <ChevronRightIcon />
              <ListItemText inset primary="Sub 2" />
            </ListItem>
            <ListItem button className={classes.menuItem}>
              <ChevronRightIcon />
              <ListItemText inset primary="Sub 3" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button className={classes.menuItem}>
          <ListItemIcon className={classes.menuItemIcon}>
            <IconShoppingCart />
          </ListItemIcon>
          <ListItemText primary="Charts" />
        </ListItem>

        <ListItem button className={classes.menuItem}>
          <ListItemIcon className={classes.menuItemIcon}>
            <IconBarChart />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItem>

        <ListItem button className={classes.menuItem}>
          <ListItemIcon className={classes.menuItemIcon}>
            <IconPeople />
          </ListItemIcon>
          <ListItemText primary="Form" />
        </ListItem>
        <ListItem button className={classes.menuItem}>
          <ListItemIcon className={classes.menuItemIcon}>
            <IconPeople />
          </ListItemIcon>
          <ListItemText primary="Table" />
        </ListItem>

        {/* <ListItem button onClick={handleClick} className={classes.menuItem}>
          <ListItemIcon className={classes.menuItemIcon}>
            <IconLibraryBooks />
          </ListItemIcon>
          <ListItemText primary="Nested Pages" />
          {open ? <IconExpandLess /> : <IconExpandMore />}
        </ListItem> */}
        {/* <Collapse in={open} timeout="auto" unmountOnExit>
          <Divider />
          <List component="div" disablePadding>
            <ListItem button className={classes.menuItem}>
              <ListItemText inset primary="Nested Page 1" />
            </ListItem>
            <ListItem button className={classes.menuItem}>
              <ListItemText inset primary="Nested Page 2" />
            </ListItem>
          </List>
        </Collapse> */}
      </List>
      <Divider />
    </Drawer>
  );
}
