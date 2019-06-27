import React, {Component} from "react";
import CalTable from "./containers/table";
import events from './events';
import Toolbar from './containers/toolBar'

class  App extends Component {
  
  render(){
    let currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const firstDateofMonth = new Date(currentDate.getFullYear(),currentMonth,1);
    const firstDayofMonth = firstDateofMonth.getDay();
    return (
      <div>
        <div className ="App" style={{width:'70%', height:'100%',padding:'0vh',display:'flex', justifyContent:'center'}}>
          <CalTable firstDayofMonth = {firstDayofMonth} events = {events}></CalTable>
        </div>
        <Toolbar/>
      </div>
    );
  }
  
}

export default App;
