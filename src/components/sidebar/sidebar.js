import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import KeyboardArrowDownOutlinedIcon from "@material-ui/icons/KeyboardArrowDownOutlined";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import nlogo from "../../assets/nlogo.jpg";
import logoicon from "../../assets/nlogo_icon.jpg";
import { Button, Paper } from "@material-ui/core";
import "./style.css";

const drawerWidth = 240;

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
  // const theme = useTheme();
  const [val, setVal] = useState(true);

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
      {/* <div className={classes.toolbar}>
        <IconButton onClick={props.handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </div> */}
      <Divider />
      <Paper elevation={4}>
        {props.open ? (
          <ListItemIcon className="logo-h">
            <img src={nlogo} alt="" width="auto" />
          </ListItemIcon>
        ) : (
          <ListItemIcon className="MuiToolbar-regular">
            <img src={logoicon} alt="" width="auto" height="50px" />
          </ListItemIcon>
        )}
      </Paper>
      <List>
        {[
          { name: "Dashboard", sub: ["Sub 1", "Sub 2", "Sub 3"] },
          { name: "Inbox" },
          { name: "Starred" },
        ].map((text, index) => (
          <div key={index} className="btn-area">
            {!props.open ? (
              <Button>
                <InboxIcon />
              </Button>
            ) : (
              <Button>
                <div className="btn" onClick={() => setVal(!val)}>
                  <InboxIcon />
                  {text.name}
                  {val ? (
                    <ChevronRightIcon />
                  ) : (
                    <>
                      <KeyboardArrowDownOutlinedIcon />
                    </>
                  )}
                </div>
              </Button>
            )}
            {val ? (
              <div>
                {text.sub
                  ? text.sub.map((sub) => (
                      <div className="sbtn-area" key={sub}>
                        <Button>
                          <ChevronRightIcon />
                          {sub}
                        </Button>
                      </div>
                    ))
                  : ""}
              </div>
            ) : (
              ""
            )}
          </div>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
}
