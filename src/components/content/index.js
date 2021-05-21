import { Container, Paper, Typography } from "@material-ui/core";
import './style.css';

export default function Content() {

  return (
    <div className="content-root">
      <Container maxWidth="lg">
        <Paper className="content-welcome-msg" elevation={4}>
          <Typography component="div" style={{ height: "50vh" }}>
            <h1>Welcome to our Board</h1>
          </Typography>
        </Paper>
      </Container>
    </div>
  );
}



