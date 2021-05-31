import React from 'react';
import { makeStyles ,useTheme} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Select from '@material-ui/core/Select';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './automate.css';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Filter from './filter.js';
const useStyles = makeStyles((theme) => ({
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
export default function Target() {
  const classes = useStyles();
  const [value, setValue] = React.useState('');
  const [dropValue,setDropVAlue]=React.useState('');
  const [selectoption,setSelectOption]=React.useState('');
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const bull = <span className={classes.bullet}>•</span>;
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleChangeData = (event) => {
    setDropVAlue(event.target.value);
  };
  
  const handleChangeSelect = (event) => {
    setPersonName(event.target.value);
  };
  const handleChangeOption =(event)=>{
    setSelectOption(event.target.value);
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
        <Card className={classes.root ,"target-card"} style={{marginTop:"20px",padding:20}} variant="outlined">
        <CardContent>
      <div>
          <div className="left-pos">
          <div className="block-d">
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



              <div className="block-d">
              <div className="target-text">
              Add to folder
                  </div>
                  <div className="target-automation">
                    <div className="target-roas">
                        <p>Folder</p>
                        <Select style={{width:"100%"}}
          multiple
          displayEmpty
          value={personName}
          onChange={handleChangeSelect}
          input={<Input />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Placeholder</em>;
            }

            return selected.join(', ');
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value="">
            <em>Placeholder</em>
          </MenuItem>
          {names.map((name) => (
            <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
              {name}
            </MenuItem>
          ))}
        </Select>
                        </div>
                     
                    
                  </div>
              </div>
          </div>
          
          <div className="right-pos">
          <div className="block-d">
          <div className="target-text">
              Target
                  </div>
                  <div className="target-automation">
                    <div className="target-roas">
                        <p>Folder</p>
                        <div className="bg-white">
                    <p>This Automation will apply to</p>
                    <Select style={{width:"49%" ,marginRight:10}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={dropValue}
          onChange={handleChangeData}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>

        <Select style={{width:"49%"}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectoption}
          onChange={handleChangeOption}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>                    </div>
                        </div>
                     
                        <Filter/>        
                  </div>
            
          </div>
          </div>
      </div>
        </CardContent>
      
      </Card>
</>
  );
}
