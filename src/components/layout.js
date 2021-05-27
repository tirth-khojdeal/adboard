import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "../components/header/header";
import Sidebar from "../components/sidebar/sidebar";
import Content from "./content";
import { BrowserRouter, Route } from "react-router-dom";

// Basic Authentication Check
// Check User Session
// Check User Permission
/// Get Dynamic Header Value.jS
/// get dynamic Sidebar Value from Config.JS
/// header and Footer Only render on successfull login
/// Different Login page and Different Signup Page

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };


  const [togglevalue, setToggleValue] = useState();
  const getToggle = (toggle) => {
    setToggleValue(toggle);
  };

  return (
    <div className={classes.root}>
      {/* Routes Might Come In Here */}
      <BrowserRouter>
        <Route path="/">
          <CssBaseline />
          <Header
            handleDrawerOpen={handleDrawerOpen}
            handleDrawerClose={handleDrawerClose}
            open={open}
          />
          <Sidebar
            handleDrawerOpen={handleDrawerOpen}
            handleDrawerClose={handleDrawerClose}
            getToggle={getToggle}
            open={open}
          />
          <Content togglevalue={togglevalue} />
        </Route>
      </BrowserRouter>
    </div>
  );
}           

