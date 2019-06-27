import React from 'react';
import List from '@material-ui/core/List';
import BetweenSpace from '../../components/BetweenSpace'
import Picker from '../../components/Picker'
import timeIntervalCoverOrNot  from '../../components/timeIntervalCoverOrNot'

const useStyles = {
  root: {
    width: '100%',
    maxWidth: '480px',
  },
};

class DayScheduler extends React.Component {
  constructor(props){
    super(props);
    var todayBegin = new Date();
    todayBegin.setHours(0);todayBegin.setMinutes(0);todayBegin.setSeconds(0);todayBegin.setMilliseconds(0);
    var todayEnd = new Date(todayBegin.getTime()+1000*60*60*24-1);
    var todayEvent = {
      start: todayBegin,
      end: todayEnd,
    }
    var selectedDateEvent = {
      start: props.selectedDate,
      end: new Date(props.selectedDate.getTime()+86400*1000),
    }
    this.state = {
      timeslots : 30,//
      clockTime : 24,//相乘720
      timeUnitHeight : 5,
      selectedDateEvent : selectedDateEvent,
      today : new Date(),
      todayEvent : todayEvent
    }
  }
  componentDidMount() {
    setTimeout(
      () => {
        var todayBegin = new Date();
        todayBegin.setHours(0);todayBegin.setMinutes(0);todayBegin.setSeconds(0);todayBegin.setMilliseconds(0);
        var todayEnd = new Date(todayBegin.getTime()+1000*60*60*24-1);
        var todayEvent = {
          start: todayBegin,
          end: todayEnd,
        }
        this.setState({ today: new Date(), todayEvent: todayEvent })
      },
      60000
    );
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    var selectedDateEvent = {
      start: nextProps.selectedDate,
      end: new Date(nextProps.selectedDate.getTime()+86400*1000),
    }
    return {
      selectedDateEvent:selectedDateEvent
    };
  }
  timeUnit = (i,color) => {
    return(
      <div key = {i}>
        <div style={{backgroundColor:color, height:'1px', width:'480px', display:'flex'}}/>
        <BetweenSpace height={this.state.timeUnitHeight-1}/>
      </div>
    )
  }
  timeUnitGroup = (num) => {
    var xx = [<BetweenSpace height="0.5rem" key = 'first'/>];
    const tem = this.state.timeslots/this.state.timeUnitHeight;
    for( var i = 0 ; i < num*tem ; ++i ){
      if ( i%tem === 0 )
        xx.push(this.timeUnit(i,'lightgrey'));
      else
        xx.push(this.timeUnit(i,'white'));
    }
    xx.push(this.timeUnit(i,'lightgrey'));
    xx.push(<BetweenSpace height={60} key='key'/>)
    return xx;
  }
  renderTimeEven = (num) => {
    var xx = [];
    for( var i = 0 ; i < num+1 ; i+=2 ){
        xx.push(<div key = {i} style={{height:(2*this.state.timeslots*(i!==num)), width:'1.5rem', color:'#cec2cb'}}>{i}</div>);
    } 
    return xx;
  }
  renderTimeOdd = (num) => {
    var xx = [<div key = {0} style={{height:(this.state.timeslots), width:'1.5rem', color:'#cec2cb'}}></div>];
    for( var i = 1 ; i < num+1 ; i+=2 ){
        xx.push(<div key = {i} style={{height:(2*this.state.timeslots*(i!==num-1)), width:'1.5rem', color:'#cec2cb'}}>{i}</div>);
    } 
    return xx;
  }
  displayNowTime = () => {
    var NowTime = this.state.today;
    var xx = this.state.selectedDateEvent.start;
    if (xx.getFullYear()!==NowTime.getFullYear()||xx.getMonth()!==NowTime.getMonth()||xx.getDate()!==NowTime.getDate())
      return;
    var todayBegin = this.state.todayEvent.start;
    var time = NowTime.getTime() - todayBegin.getTime();
    var top = time/(1000*60*60*24)*this.state.timeslots*this.state.clockTime;
    return (
      <div style={{padding:'0.5rem 0px', position:'absolute', top:top+'px'}}>
        <List>
          <div style={{backgroundColor:'lightgreen', height:'1px', width:'480px', display:'flex'}}/>
        </List>
      </div>
    )
  }
  displayEvents = () => {
    var CheckFunctionGenerator = (event) => {return(
      (x)=>{return timeIntervalCoverOrNot(x,event)}
    )}
    const mapFunction = (event)=>{
      return(
        <div style={{padding:'0.5rem 0px', position:'absolute', top:event.top+'px', left:event.column*component_width+1+'px'}} key={event.id}>
          <List>
            <div style={{backgroundColor:'lightgreen', height:event.height+'px',
                         width:component_width-8+'px', display:'flex', opacity:0.5, 
                         borderRadius:'10px', overflowX:'scroll',padding:'3px',cursor:'pointer'}}
                 id = {event.id}
                 onClick={(e)=>{console.log(e.target.id); this.props.handleEventChange(e.target.id)}}>{event.title}</div>
          </List>
        </div>
      )
    }
    var _ = require('lodash');
    var events = _.cloneDeep(this.props.events.filter(CheckFunctionGenerator(this.state.selectedDateEvent)))
    var events_groups = [[]];
    for( var i = 0 ; i < events.length ; ++i){
      if (events[i].start.getTime()<this.state.selectedDateEvent.start.getTime())
        events[i].start=this.state.selectedDateEvent.start;
      var StartTime = events[i].start.getTime() - this.state.selectedDateEvent.start.getTime();
      if (events[i].end.getTime()>this.state.selectedDateEvent.end.getTime())
        events[i].end=this.state.selectedDateEvent.end;
      var Duration = events[i].end.getTime() - events[i].start.getTime();
      var top = StartTime/(1000*60*60*24)*this.state.timeslots*this.state.clockTime;
      var height = Duration/(1000*60*60*24)*this.state.timeslots*this.state.clockTime;

      var checkFunction = CheckFunctionGenerator(events[i]);
      for( var j = 0 ; j < events_groups.length ; ++j){
        if(!events_groups[j].some(checkFunction)){
          events_groups[j].push(events[i]);
          events[i].column=j;
          events[i].top = top;
          events[i].height = height;
          break;
        }
        else if (j === events_groups.length-1){
          events_groups[events_groups.length]=[events[i]];
          events[i].column=j+1;
          events[i].top = top;
          events[i].height = height;
          break;
        }
      }
      var component_width = 480/events_groups.length;
      if (component_width > 120) component_width = 120;
      var events_components = events.map(mapFunction)
    }
    return events_components;
  }

  render(){
    return (
      <div style={{backgroundColor:'#fff4fb', width:'600px', height:'80vh',borderRadius:'50px', overflowX:'scroll'}}>
        <div style={{padding:'12px 0px', width:'600px', display: 'flex', justifyContent: 'center',color:'grey'}}>
          <Picker selectedDate={this.state.selectedDateEvent.start} handleDateChange={this.props.handleDateChange} days='1'/>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', position:'relative'}}>
          <List component="nav" aria-label="Mailbox folders">
            {this.renderTimeEven(this.state.clockTime)}
          </List>
          <List component="nav" style={useStyles.root} aria-label="Mailbox folders">
            {this.timeUnitGroup(this.state.clockTime)}
          </List>
          {this.displayNowTime()}
          <div style={{position:'absolute',width:'480px'}}>{this.displayEvents()}</div>
          <List component="nav" aria-label="Mailbox folders">
            {this.renderTimeOdd(this.state.clockTime)}
          </List>
        </div>
      </div>
    )
  }
}
export default DayScheduler