import React, {Component} from "react";
import DayBox from './components/day_box';
import Title from "./components/title";
import CalTable from "./containers/table";
import './App.css';

class  App extends Component {
  
  render(){
    let currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const firstDateofMonth = new Date(currentDate.getFullYear(),currentMonth,1);
    const firstDayofMonth = firstDateofMonth.getDay();
    return (
      <div className ="App">
        <CalTable firstDayofMonth = {firstDayofMonth}></CalTable>
      </div>
    );
  }
  
}

export default App;
