import { Container, Paper, Typography } from "@material-ui/core";
import { Route } from "react-router";
import Section from "../Section";
import Demo from "../Section/demo";
import './style.css';

export default function Content({togglevalue}) {

  return (
    <div className="content-root">
      <Container maxWidth="lg">
        <Paper className="content-welcome-msg" elevation={4}>
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
          <Route exact path="/charts">
            <h1>charts</h1>
          </Route>
          <Route exact path="/reports">
            <h1>reports</h1>
          </Route>
          <Route exact path="/form">
            <h1>form</h1>
          </Route>
          <Route exact path="/table">
            <h1>table</h1>
          </Route>
        </Paper>
      </Container>
    </div>
  );
}



