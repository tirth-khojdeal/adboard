import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import React from 'react';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import './automate.css';
class Filter extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      filterArray:[{
      campains:{selectedValue:'',options:['Campaign','XYZ']},
      status:{selectedValue:'',options:['Status','Name']},
      is:{selectedValue:'',options:['is','is not']},
      chooseD:{selectedValue:[],options:['Archieve','Delete','ABC','XYZ','Archieve!!!','ASDASD','ASDSD']},
      },
    ]
    };

  
}
add_success_story(){
  let {filterArray}=this.state
  filterArray.push({campains:{selectedValue:'',options:['Campaign','XYZ']},
  chooseD:{selectedValue:[],options:['Archieve','Delete','ABC','XYZ','Archieve!!!','ASDASD','ASDSD']},
  is:{selectedValue:'',options:['is','is not']},
  status:{selectedValue:'',options:['Status','Name']},
})
  this.setState({filterArray})

}
remove_success_story(data,key){
  let {filterArray}=this.state
 if(filterArray.length>1){
  filterArray.splice(key,1)
  this.setState({filterArray})
 }
}
setDropDownValue=(value,name,index)=>{
  console.log(value,name,index)
  let {filterArray}=this.state
  let selectedItem=filterArray[index]
  if(name==='campaign'){
    selectedItem.campains.selectedValue=value
  }
  else if(name==='chooseD'){
    selectedItem.chooseD.selectedValue=value

  }
  else if(name==='status'){
    selectedItem.status.selectedValue=value

  }
  else if(name==='is'){
    selectedItem.is.selectedValue=value

  }
  this.setState((filterArray))
}
removeChooseD=(indexInside,indexOutSide)=>{
   let {filterArray}=this.state
     let selectedItem=filterArray[indexOutSide]
     selectedItem.chooseD.selectedValue.splice(indexInside,1)
     this.setState((filterArray))

}
  render(){
    
    return (
      <>
      <p>Selection filter</p>
      {this.state.filterArray.map((item,index)=>{
       return(
        <div >
                
                  <div className="target-automation">
                  
                    <div className="target-roas" style={{background:"#fff",paddingTop:"0px!important"}}>
                        
                        <FormControl style={{width:"30%",marginRight:"10px"}}>
                        <InputLabel htmlFor="grouped-native-select">Campaign</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={item.campains.selectedValue}
          onChange={(e)=>this.setDropDownValue(e.target.value,'campaign',index)}
        >
         
         {item.campains.options.map((itemCamp,indexCamp)=>{
           return(          <MenuItem value={itemCamp}>{itemCamp}</MenuItem>
            )

         })}
        </Select>
      </FormControl>

      <FormControl  style={{width:"30%",marginRight:"10px"}}>
      <InputLabel htmlFor="grouped-native-select">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={item.status.selectedValue}
          onChange={(e)=>this.setDropDownValue(e.target.value,'status',index)}
        >
         
         {item.status.options.map((item3,index3)=>{
           return(          <MenuItem value={item3}>{item3}</MenuItem>
            )

         })}
        </Select>
      </FormControl>
      
      <FormControl  style={{width:"30%"}}>
      <InputLabel htmlFor="grouped-native-select">Is</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={item.is.selectedValue}
          onChange={(e)=>this.setDropDownValue(e.target.value,'is',index)}
        >
         
         {item.is.options.map((item4,index4)=>{
           return(          <MenuItem value={item4}>{item4}</MenuItem>
            )

         })}
        </Select>
      </FormControl>
      <FormControl  style={{width:"100%"}}>
<InputLabel htmlFor="grouped-native-select">Choose Delivery Types</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={item.chooseD.selectedValue}
          multiple
          
          onChange={(e)=>this.setDropDownValue(e.target.value,'chooseD',index)}
        >
         
         {item.chooseD.options.map((item2,index2)=>{
           return(          <MenuItem value={item2}>{item2}</MenuItem>
            )

         })}
        </Select>
      </FormControl>
      {item.chooseD.selectedValue.length>0 && item.chooseD.selectedValue.map((itemCD,indexCD)=>{
        return(
          <div style={{color:'white',backgroundColor:'#66ce66',margin:10,padding:5,display:"inline-block",fontSize:"12px",marginTop:"10px"}} onClick={()=>this.removeChooseD(indexCD,index)}>{itemCD} X</div>
        )

      })}
     {this.state.filterArray.length>1 &&  <><br/>
      <DeleteIcon style={{marginTop:"10px"}} onClick={()=>this.remove_success_story(item,index)}/></>}
                        </div>
                  </div>
         
        </div>
       )
      })}
      <Button onClick={()=>this.add_success_story()}>+ Add Filter</Button>
      </>
    );
  }
}

export default Filter;
