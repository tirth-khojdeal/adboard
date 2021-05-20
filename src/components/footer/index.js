import { Button, Grid } from "@material-ui/core";
import { useState } from "react";

export default function Footer(){
    const [val,setVal]=useState(true);
    return (
      <div className="p-10">
        <Grid container>
          <Grid>
            <div
              style={{ width: "100px", display: "inline-block" }}
              className="bold"
              onClick={() => setVal(!val)}
            >
              +
            </div>
            <div style={{ width: "100px" }} className={val ? "show" : "hide"}>
              <Grid container direction="column">
                <Button>And</Button>
                <Button>Condition</Button>
                <Button>Group</Button>
              </Grid>
            </div>
          </Grid>
          <Grid>
            <select name="Select trigger">
              <option>--Select trigger--</option>
              <optgroup label="Swedish Cars">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
              </optgroup>
              <optgroup label="German Cars">
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
              </optgroup>
            </select>
          </Grid>
          <Grid>
            <select name="select time">
              <option>--Select time--</option>
              <optgroup label="Swedish Cars">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
              </optgroup>
              <optgroup label="German Cars">
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
              </optgroup>
            </select>
          </Grid>
          <Grid>
            <select name="select">
              <option>--select--</option>
              <optgroup label="Swedish Cars">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
              </optgroup>
              <optgroup label="German Cars">
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
              </optgroup>
            </select>
          </Grid>
          <Grid>
            <input style={{ width: "100px" }} type="text" />
          </Grid>
        </Grid>
      </div>
    );
}