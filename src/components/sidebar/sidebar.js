import React from "react";
import clsx from "clsx";
import { makeStyles} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
// import IconButton from "@material-ui/core/IconButton";
// import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
// import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
// import logo from '../../assets/logo.jpg';
import nlogo from "../../assets/nlogo.jpg";
import logoicon from '../../assets/logo_icon.jpg';
import { Paper } from "@material-ui/core";
import './style.css'

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
      <Paper>
        {props.open ? (
          <ListItemIcon className="logo-h">
            <img src={nlogo} alt="" width="auto" />
          </ListItemIcon>
        ) : (
          <ListItemIcon className="MuiToolbar-regular">
            <img src={logoicon} alt="" width="auto" />
          </ListItemIcon>
        )}
      </Paper>
      <List>
        {["Dashboard", "Inbox", "Starred"].map((text, index) => (
          <ListItem className="btn" button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
}
