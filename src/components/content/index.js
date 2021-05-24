import { Container, Paper, Typography } from "@material-ui/core";
import Section from "../Section";
import Demo from "../Section/demo";
import './style.css';

export default function Content({togglevalue}) {

  return (
    <div className="content-root">
      <Container maxWidth="lg">
        <Paper className="content-welcome-msg" elevation={4}>
          {togglevalue === 3 ? (
            <>
            {/* <Section /> */}
            <Demo/>
            </>
          ) : (
            <Typography component="div" style={{ height: "50vh" }}>
              <h1>Welcome to our Board</h1>
            </Typography>
          )}
        </Paper>
      </Container>
    </div>
  );
}



