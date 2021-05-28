import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './automate.css';
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Target() {
  const classes = useStyles();
  const [value, setValue] = React.useState('');
  const bull = <span className={classes.bullet}>•</span>;
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
  <>
  <Card className={classes.root} variant="outlined">
      <CardContent>
    <div className="card-header">


      <span className="target-text">Name and Target</span>
      <div class="taget-btn">
      <Button className="white-btn">Back</Button>
      <Button className="blue-btn">Next</Button>
      </div>
      </div>
      </CardContent>
    
    </Card>
        <Card className={classes.root ,"target-card"} style={{marginTop:"20px"}} variant="outlined">
        <CardContent>
      <div>
          <div>
              <div>
                  <div className="target-text">
                        Name
                  </div>
                  <div className="target-automation">
                    <div className="target-roas">
                        <p>Automation Name</p>
                    <TextField id="filled-basic" label="Pause if ROAS < 2" className="wtfull" variant="filled" />
                        </div>
                        <div className="target-description">
                        <TextField className="description"
          id="outlined-multiline-flexible"
          label="Description (Optional)"
          multiline
          rowsMax={4}
          value={value}
          onChange={handleChange}
          variant="outlined"
        />
                        </div>
                    
                  </div>
              </div>



              <div></div>
          </div>
          <div></div>
      </div>
        </CardContent>
      
      </Card>
</>
  );
}
