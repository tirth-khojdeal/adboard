import { Paper, Typography } from "@material-ui/core";
import { Route } from "react-router";
import Demo from "../Section";
import './style.css';

export default function Content() {

  return (
      <Paper className="content-root content-welcome-msg" elevation={3}>
        <Route exact path="/">
          <Typography component="div" style={{ height: "50vh" }}>
            <h1>Welcome to our Board</h1>
          </Typography>
        </Route>
        <Route exact path="/sub1">
          <h1>sub 1</h1>
        </Route>
        <Route exact path="/sub2">
          <h1>sub 2</h1>
        </Route>
        <Route exact path="/sub3">
          <h1>sub 3</h1>
        </Route>
        <Route exact path="/analyze">
          <Demo />
        </Route>
      </Paper>
  );
}



