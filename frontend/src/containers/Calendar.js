import React, {Component} from "react";
import CalTable from "./CalendarContainers/table";
//import './App.css';
//import events from './events';
import Toolbar from './CalendarContainers/toolBar'
import { Query, Mutation } from 'react-apollo'
import {GROUP_EVENT_QUERY} from '../graphql/queries'

class Calendar extends Component {
  state = {
    groupID: '1',
    eventID: "1",
  }
  handleGroupChange = groupID =>{
    this.setState(state => ({
      groupID: groupID
    }))
  }
  handleEventChange = eventID =>{
    this.setState(state => ({
      eventID: eventID
    }))
  }
  render(){
    return (
      <div>
        <div className ="App" style={{width:'70%', height:'100%',padding:'0vh',display:'flex', justifyContent:'center'}}>
          <Query query = {GROUP_EVENT_QUERY} variables = {{id: this.state.groupID}}>
            {({loading,error,data,subscribeToMore})=>{
               
               if(loading) return null

               console.log(data.group.event);
               let events = data.group.event
               console.log(new Date(Date.parse(events[6].start)))
               for (let i = 0; i < events.length;i++){
                 events[i].start = new Date(Date.parse(events[i].start))
                 events[i].end = new Date(Date.parse(events[i].end))
                 
               }
               
               return  <CalTable  handleEventChange = {this.handleEventChange} events = {events}></CalTable>
               
              
            }}
          </Query>
        </div>
        <Toolbar groupID = {this.state.groupID} eventID = {this.state.eventID}/>
      </div>
    );
  }
  
}

export default Calendar;
