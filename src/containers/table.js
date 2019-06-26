import React, {Component, useDebugValue} from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import 'date-fns';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DayScheduler from './DayScheduler'
import events from '../events'
import { element } from "prop-types";
import timeIntervalCoverOrNot  from '../components/timeIntervalCoverOrNot'
import { textAlign } from "@material-ui/system";

const Month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct','Nov','Dec'];
let DaysofMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
const cellHeight=100;

const StyledTableCell = withStyles(theme => ({
  head: {
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    width: 100
    
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      //backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

class CalTable extends Component{
    constructor(props){
        super(props);
        let now = new Date();
        let thisMonth = now.getMonth();
        let thisYear = now.getFullYear();
        let lastMonth = thisMonth-1;
        let nextMonth = thisMonth+1;
        let firstDay = new Date(now.getFullYear(),now.getMonth(),1).getDay(); // 一號的星期
        let lastDay = new Date(now.getFullYear(), now.getMonth(),DaysofMonth[thisMonth]).getDay() // 最後一天的星期
        let firstVisibleDate = DaysofMonth[lastMonth]-firstDay+1 <= DaysofMonth[lastMonth] ? DaysofMonth[lastMonth]-firstDay+1 : 1
        let lastVisibleDate = 6-lastDay;

        this.state = {
            now: new Date(),
            thisMonth: thisMonth,
            lastMonth: lastMonth,
            nextMonth: nextMonth,
            thisYear: thisYear,
            firstDay: firstDay,
            lastDay: lastDay,
            firstVisibleDate: firstVisibleDate,
            lastVisibleDate: lastVisibleDate,
            DayNum: DaysofMonth[thisMonth]+firstDay+lastVisibleDate,
            selectedDate: new Date()
        }
    }
    handleBack = () => {
        let newYear = this.state.thisMonth === 0 ? this.state.thisYear-1 : this.state.thisYear;
        if(newYear % 4 === 0 && newYear % 400 !== 0) DaysofMonth[1] = 29;
        let newThisMonth = this.state.thisMonth === 0 ? 11 : this.state.thisMonth -1;
        let newLastMonth = this.state.lastMonth === 0 ? 11 : this.state.lastMonth-1;
        let newNextMonth = this.state.nextMonth === 0 ? 11 : this.state.nextMonth-1;
        this.setState(state => ({
            thisYear: newYear,
            thisMonth: newThisMonth,
            lastMonth: newLastMonth,
            nextMonth: newNextMonth,
            firstDay: new Date(newYear,newThisMonth,1).getDay(),
            lastDay: new Date(newYear,newThisMonth,DaysofMonth[newThisMonth]).getDay(),
            firstVisibleDate: (DaysofMonth[newLastMonth]-new Date(newYear,newThisMonth,1).getDay()+1) <= DaysofMonth[newLastMonth] ? (DaysofMonth[newLastMonth]-new Date(newYear,newThisMonth,1).getDay()+1) : 1,
            lastVisibleDate: 6-new Date(newYear, newThisMonth,DaysofMonth[newThisMonth]).getDay(),
            DayNum: DaysofMonth[newThisMonth]+new Date(newYear,newThisMonth,1).getDay()+6-new Date(newYear, newThisMonth,DaysofMonth[newThisMonth]).getDay()
        }))
    }

    handleNext = () => {
        let newYear = this.state.thisMonth === 11 ? this.state.thisYear+1 : this.state.thisYear;
        if(newYear % 4 === 0 && newYear % 400 !== 0) DaysofMonth[1] = 29;
        let newThisMonth = this.state.thisMonth === 11 ? 0 : this.state.thisMonth+1;
        let newLastMonth = this.state.lastMonth === 11 ? 0 : this.state.lastMonth+1;
        let newNextMonth = this.state.nextMonth === 11 ? 0 : this.state.nextMonth+1;
        this.setState(state => ({
            thisYear: newYear,
            thisMonth: newThisMonth,
            lastMonth: newLastMonth, 
            nextMonth: newNextMonth,
            firstDay: new Date(newYear,newThisMonth,1).getDay(),
            lastDay: new Date(newYear,newThisMonth,DaysofMonth[newThisMonth]).getDay(),
            firstVisibleDate: (DaysofMonth[newLastMonth]-new Date(newYear,newThisMonth,1).getDay()+1) <= DaysofMonth[newLastMonth] ? (DaysofMonth[newLastMonth]-new Date(newYear,newThisMonth,1).getDay()+1) : 1,
            lastVisibleDate: 6-new Date(newYear, newThisMonth,DaysofMonth[newThisMonth]).getDay(),
            DayNum: DaysofMonth[newThisMonth]+new Date(newYear,newThisMonth,1).getDay()+6-new Date(newYear, newThisMonth,DaysofMonth[newThisMonth]).getDay()
        }))
    }
    handleDateUnitClicked = (date)=>{
      var showDayScheduler = document.getElementById("daySchedulerWrapper");
        showDayScheduler.style.display = 'flex';
        this.setState({ selectedDate: date})
    }
    handleDaySchedulerClose = () =>{
      var showDayScheduler = document.getElementById("daySchedulerWrapper");
      showDayScheduler.style.display = 'none';
    }
    handleDateChange = (date) => {
      var selectedDate = new Date(date.getTime());
      selectedDate.setHours(0);selectedDate.setMinutes(0);selectedDate.setSeconds(0);selectedDate.setMilliseconds(0);
      let newThisMonth = selectedDate.getMonth();
      let newYear = selectedDate.getFullYear();
      let newLastMonth = newThisMonth-1;
      let newNextMonth = newThisMonth+1;
      this.setState(state => ({
        thisYear: newYear,
        thisMonth: newThisMonth,
        lastMonth: newLastMonth, 
        nextMonth: newNextMonth,
        firstDay: new Date(newYear,newThisMonth,1).getDay(),
        lastDay: new Date(newYear,newThisMonth,DaysofMonth[newThisMonth]).getDay(),
        firstVisibleDate: (DaysofMonth[newLastMonth]-new Date(newYear,newThisMonth,1).getDay()+1) <= DaysofMonth[newLastMonth] ? (DaysofMonth[newLastMonth]-new Date(newYear,newThisMonth,1).getDay()+1) : 1,
        lastVisibleDate: 6-new Date(newYear, newThisMonth,DaysofMonth[newThisMonth]).getDay(),
        DayNum: DaysofMonth[newThisMonth]+new Date(newYear,newThisMonth,1).getDay()+6-new Date(newYear, newThisMonth,DaysofMonth[newThisMonth]).getDay(),
        selectedDate: selectedDate
      }))
    }
    createDateUnit = (first,max,num,thisDate)=>{
      var date = new Date(thisDate);
      var backgroundColor = '#fff4fb';
      var color = '#897280'
      if ( date.getMonth() !== this.state.thisMonth ) {
        backgroundColor = '#eff2f7';
        color = '#c0c5ce'
      }
      var today = new Date();today.setHours(0);today.setMinutes(0);today.setSeconds(0);today.setMilliseconds(0);
      if ( date.getTime() === today.getTime() ) {
        backgroundColor = '#d8e3d5'
        color = '#7c8c79'
      }
      return(
        <StyledTableCell style = {{height:cellHeight+'px',padding:'2px'}}>
          <div style={{width:'100%', height:'100%', backgroundColor:backgroundColor, borderRadius:'2px', cursor:'pointer'}} onClick={()=>{this.handleDateUnitClicked(date)}}>
            <div style={{padding:'4px', height:'30px', color:color, fontWeight:900,textAlign:'center'}}>{first+num > max ? first-max+num : first+num}</div>
          </div>
        </StyledTableCell>
      )
    }
    createDateRow = (key,first,max,firstDate) => { 
      return(
          <StyledTableRow key={key}>
              {this.createDateUnit(first,max,0,firstDate.setDate(firstDate.getDate()+1))}
              {this.createDateUnit(first,max,1,firstDate.setDate(firstDate.getDate()+1))}
              {this.createDateUnit(first,max,2,firstDate.setDate(firstDate.getDate()+1))}
              {this.createDateUnit(first,max,3,firstDate.setDate(firstDate.getDate()+1))}
              {this.createDateUnit(first,max,4,firstDate.setDate(firstDate.getDate()+1))}
              {this.createDateUnit(first,max,5,firstDate.setDate(firstDate.getDate()+1))}
              {this.createDateUnit(first,max,6,firstDate.setDate(firstDate.getDate()+1))}
          </StyledTableRow>
      )
    }
    displayEvents = () =>{
      var _ = require('lodash');
      var CheckFunctionGenerator = (event) => {return(
        (x)=>{return timeIntervalCoverOrNot(x,event)}
      )}
      var addDays = (date,num,include)=>{
        var tem = new Date( date.getTime()+num*86400000-1*!include);
        return tem;
      }
      let selectedMonth_firstDay = new Date(this.state.thisYear,this.state.lastMonth,this.state.firstVisibleDate);
      if ( this.state.firstVisibleDate === 1 )selectedMonth_firstDay.setMonth(this.state.thisMonth);
      let selectedMonth_lastDay = addDays(selectedMonth_firstDay,this.state.DayNum,false)
      let selectedMonthEvent = {
        start:selectedMonth_firstDay,
        end:selectedMonth_lastDay
      }
      var events = _.cloneDeep(this.props.events.filter(CheckFunctionGenerator(selectedMonthEvent)))
      var weeks_events = [];
      var weeksEvent =[];
      for ( var i = 0 ; i < this.state.DayNum/7 ; ++i){
        var selectedWeek_firstDay = addDays(selectedMonthEvent.start,i*7,true);
        var selestedWeek_lastDay = addDays(selectedWeek_firstDay,7,false)
        var weekEvent = {
          start: selectedWeek_firstDay,
          end: selestedWeek_lastDay
        }
        weeksEvent.push(weekEvent);
      }
      for ( var ii = 0 ; ii < weeksEvent.length ; ++ii ){
        var week_events = _.cloneDeep(this.props.events.filter(CheckFunctionGenerator(weeksEvent[ii])));
        var edited_week_events = week_events.map((event)=>{
          event.start.setHours(0);event.start.setMinutes(0);event.start.setSeconds(0);event.start.setMilliseconds(0);
          event.end.setHours(0);event.end.setMinutes(0);event.end.setSeconds(0);event.end.setMilliseconds(0);
          return event;
        })
        weeks_events.push(edited_week_events);
      }
      var weeks_events_groups = [];
      for ( var num = 0 ; num < weeks_events.length ; ++num){
        var events_groups = [[]];
        for( var i2 = 0 ; i2 < weeks_events[num].length ; ++i2){
          var checkFunction = CheckFunctionGenerator(weeks_events[num][i2]);
          for( var j = 0 ; j < events_groups.length ; ++j){
            if(!events_groups[j].some(checkFunction)){
              events_groups[j].push(weeks_events[num][i2]);
              break;
            }
            else if (j === events_groups.length-1){
              events_groups[events_groups.length]=[weeks_events[num][i2]];
              break;
            }
          }
        }
        weeks_events_groups.push(events_groups)
      }
      var events_displayed =[];
      for ( var _k = 0 ; _k < weeks_events_groups.length ; ++_k){
        var week_events_displayed = [];
        for ( var _j = 0 ; _j < weeks_events_groups[_k].length ; ++_j){
          for (var _i = 0 ; _i < weeks_events_groups[_k][_j].length ; ++_i ){
            var event_width = (weeks_events_groups[_k][_j][_i].end.getTime()-weeks_events_groups[_k][_j][_i].start.getTime())/86400000+1;
            var event_left = (weeks_events_groups[_k][_j][_i].start.getTime()-weeksEvent[_k].start.getTime())/86400000;
            week_events_displayed.push(
              <div key = {weeks_events_groups[_k][_j][_i].id}
                   style={{position:'absolute', backgroundColor:'green', opacity:0.8, 
                           height:'20px', width:100/7*event_width+'%' ,top:22*_j+'px',
                           left:100/7*event_left+'%', borderRadius:'10px', fontSize:'15px',
                           overflowX:'auto', textOverflow:'chip',color:'white',cursor:'pointer'}}
                   id = {weeks_events_groups[_k][_j][_i].id}
                   onClick = {(e)=>{console.log(e.target.id)}}>{weeks_events_groups[_k][_j][_i].title}</div>
            )
          }
        }
        var buttonHeight = ((weeks_events_groups[_k].length-1)*22+50)>100?(weeks_events_groups[_k].length-1)*22+50:100;
        events_displayed.push(
          [
            <div key ={`key1${_k}`} style = {{height:30+'px',width:'100%',position:'relative',pointerEvents:'none'}} />,
            <div key ={`key2${_k}`} style = {{height:cellHeight+(_k!==0)-30+'px',padding:'2px 0',
                                              overflowY:'scroll', overflowX:'hidden',width:'100%',
                                              position:'relative', backgroundColor:'lightgrey', opacity:0.3}} >   
              {week_events_displayed}
            </div>
          ]
        )
      }
      
      return (
        <div style={{position:'absolute', width:'100%', height:'0px'}}>
          {events_displayed}
        </div>
      )
    }
    render(){
        let dayCell = [];
       // let max = DaysofMonth(lastMonth);
        const tem = new Date(this.state.thisYear,this.state.lastMonth,this.state.firstVisibleDate);
        if ( this.state.firstVisibleDate === 1 ) tem.setMonth(this.state.thisMonth);
        tem.setDate(tem.getDate()-1);
        for(let i = 0;i < this.state.DayNum/7; i++){
          dayCell.push(this.createDateRow(i,
                                          this.state.firstVisibleDate+7*i > DaysofMonth[this.state.lastMonth] 
                                          ? this.state.firstVisibleDate+7*i-DaysofMonth[this.state.lastMonth] 
                                          : this.state.firstVisibleDate+7*i,
                                          i === 0 
                                          ? DaysofMonth[this.state.lastMonth] 
                                          : DaysofMonth[this.state.thisMonth],
                                          tem))
        }
        
        return (
          <div style={{position:'relative'}}>
            <Paper style = {{align: 'center' ,width: '100%',marginTop: 'theme.spacing(3)',overflowX: 'auto',}}>
              <div style = {{display: 'flex', justifyContent: 'space-evenly'}}>
                <div style={{color:'inherit',display: 'flex', alignItems: 'center'}}>
                    <IconButton aria-label="ChevronLeftIcon" size="small" color="inherit" onClick={this.handleBack}>
                      <ChevronLeftIcon fontSize="inherit" />
                    </IconButton>
                </div>
                <h3>{Month[this.state.thisMonth]} {this.state.thisYear}</h3>
                <div style={{color:'inherit',display: 'flex', alignItems: 'center'}}>
                  <IconButton aria-label="ChevronRightIcon" size="small" color="inherit" onClick={this.handleNext}>
                    <ChevronRightIcon fontSize="inherit" />
                  </IconButton>
                </div>
              </div>
              <div style={{position:'relative'}}>     
                <Table style = {{backgroundColor:'rgba(150,0,0,0.1) '}}>
                  <TableBody>
                    <StyledTableRow>
                      <StyledTableCell style = {{height:'35px',padding:'2.5px 0', fontWeight:900, color:'grey',textAlign:'center'}}  >Sun</StyledTableCell>
                      <StyledTableCell style = {{height:'35px',padding:'2.5px 0', fontWeight:900, color:'grey',textAlign:'center'}}  >Mon</StyledTableCell>
                      <StyledTableCell style = {{height:'35px',padding:'2.5px 0', fontWeight:900, color:'grey',textAlign:'center'}}  >Tues</StyledTableCell>
                      <StyledTableCell style = {{height:'35px',padding:'2.5px 0', fontWeight:900, color:'grey',textAlign:'center'}}  >Wed</StyledTableCell>
                      <StyledTableCell style = {{height:'35px',padding:'2.5px 0', fontWeight:900, color:'grey',textAlign:'center'}}  >Thur</StyledTableCell>
                      <StyledTableCell style = {{height:'35px',padding:'2.5px 0', fontWeight:900, color:'grey',textAlign:'center'}}  >Fri</StyledTableCell>
                      <StyledTableCell style = {{height:'35px',padding:'2.5px 0', fontWeight:900, color:'grey',textAlign:'center'}}  >Sat</StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
                <div style={{position:'relative'}}>   
                  {this.displayEvents()}
                  <Table style = {{backgroundColor:'rgba(150,0,0,0.1)'}}>
                    <TableBody>
                      {dayCell}
                    </TableBody>
                  </Table>
                </div>  
              </div>
            </Paper>
            <div id = 'daySchedulerWrapper' style={{position:'fixed', top:'0', left:'0',display: 'none', justifyContent: 'center', width:'100%', height:'100%'}}>
              <div style={{position:'absolute', width:'100%',height:'100%',backgroundColor:'black', opacity:'0.3'}} onClick={this.handleDaySchedulerClose}/>
              <div style={{position:'absolute', top:'10vh', opacity:'1'}}>
                <DayScheduler events={events} selectedDate={this.state.selectedDate} handleDateChange={this.handleDateChange}/>
              </div>
            </div>
          </div>
        );
    }
  
}

export default  CalTable
