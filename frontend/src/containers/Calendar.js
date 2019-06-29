import React, {Component} from "react";
import CalTable from "./CalendarContainers/table";
//import './App.css';
//import events from './events';
import Toolbar from './CalendarContainers/toolBar'
import { Query, Mutation } from 'react-apollo'
import {GROUP_EVENT_QUERY, GROUP_QUERY} from '../graphql/queries'
import {EVENT_SUBSCRIPTION, GROUP_SUBSCRIPTION} from '../graphql/subscriptions'

let eventUnsubscribe = null
let groupUnsubscribe = null
class Calendar extends Component {
  constructor(props){
    super(props)
    this.state ={
      groupID: "1",
      eventID: "",
      eventChange: false
    }
  }
  handleGroupChange = groupID =>{
    this.setState(state => ({
      groupID: groupID
    }))
  }
  handleEventChange = eventID =>{
    this.setState(state => ({
      eventID: eventID,
      eventChange: true
    }))
  }
  resetEventChange = () => {
    this.setState(state => ({
      eventChange: false
    }))
  }
  render(){
    return (
      <div>
        <div className ="App" style={{width:'70%', height:'100%',padding:'0vh',display:'flex', justifyContent:'center'}}>
          <Query query = {GROUP_EVENT_QUERY} variables = {{id: this.state.groupID}}>
            {({loading,error,data,subscribeToMore})=>{      
               if(loading) return null
               if(error) console.log("error");
          

               if(!eventUnsubscribe){
               
                 eventUnsubscribe = subscribeToMore({
                 document: EVENT_SUBSCRIPTION, 
                 updateQuery: (prev, { subscriptionData }) => {
                      
                      if(!subscriptionData.data){
                        //newData = prev
                        return prev
                      }
                      let newEvents = [];
                      const checkID = subscriptionData.data.event.data.id;
                      if(subscriptionData.data.event.mutation === 'UPDATED'){
                        let modifiedEvent = [...prev.group.event].findIndex(element => element.id === checkID);
                       
                        const newEvent = subscriptionData.data.event.data
                        
                         
                        if(modifiedEvent !== -1){
                            [...prev.group.event].splice(modifiedEvent,1,newEvent)
                            newEvents = [...prev.group.event]
                        }
                      }
                      else if(subscriptionData.data.event.mutation === 'CREATED'){
                        let checkEvent = [...prev.group.event].findIndex(element => element.id === checkID);
                        if(checkEvent === -1){
                          
                          const newEvent = subscriptionData.data.event.data
                          newEvents = [...prev.group.event, newEvent]
                        }   
                      }
                      else if(subscriptionData.data.event.mutation === 'DELETED'){
                        
                          newEvents = [...prev.group.event].filter(element => element.id !== checkID)
                      }
                      this.setState({eventID:""})
                     
                      const newGroup = Object.assign({}, prev.group, {event: newEvents})

                      
                      return (Object.assign({},prev,{group:newGroup}))
                  }
               })}
               
               let events = data.group.event
               for (let i = 0; i < events.length;i++){
                  events[i].start = new Date(Date.parse(events[i].start))
                  events[i].end = new Date(Date.parse(events[i].end))
                  
                }
               
               console.log(data)
               console.log(events);
               //return <div>{table}</div>
              return  <CalTable  handleEventChange = {this.handleEventChange} events = {events}></CalTable>
  
            }}
          </Query>
        </div>
        <Query query = {GROUP_QUERY}>
          {({loading, data, error,subscribeToMore}) => {
            if(loading) return null;
           // console.log(data);
            let groups = data.me.group;
            console.log('2');
      
            if(!groupUnsubscribe){
                 groupUnsubscribe = subscribeToMore({
                 document: GROUP_SUBSCRIPTION, 
                 updateQuery: (prev, { subscriptionData }) => {
                      console.log('1');
                      if(!subscriptionData.data){
                        return prev
                      }
                     /* console.log(prev)
                      console.log(subscriptionData);*/
                     
                      const checkID = subscriptionData.data.group.data.id;
                     // console.log(checkID);
                      if(subscriptionData.data.group.mutation === 'UPDATED'){
                        let modifiedGroup = prev.me.group.findIndex(element => element.id === checkID);
                        const newGroup = subscriptionData.data.group.data
                        if(modifiedGroup !== -1){
                            prev.me.group.splice(modifiedGroup,1,newGroup)
                        }
                      }
                      else if(subscriptionData.data.group.mutation === 'CREATED'){
                       
                        let checkGroup = prev.me.group.findIndex(element => element.id === checkID);
                        if(checkGroup === -1){
                          const newGroup = subscriptionData.data.group.data
                          prev.me.group.push(newGroup);
        
                          //console.log('hi')
                        }   
                      }
                      else if(subscriptionData.data.group.mutation === 'DELETED'){
                        
                        let deletedGroup = prev.me.group.findIndex(element => element.id === checkID);
                        /*this.setState({
                          eventID:""
                        }
                        )*/
                        if(deletedGroup !== -1 && (subscriptionData.data.group.userID === prev.me.id || subscriptionData.data.group.userID === null)) {
                          prev.me.group.splice(deletedGroup,1)
                        }
                        
                      }
                    /*  console.log({
                          ...prev
                        })*/
                      return {
                        ...prev,
                      }
                 }})
            }
            console.log(groups);
            return <Toolbar  defaultGroup = {this.props.defaultGroup}  groups = {groups} handleGroupChange =  {this.handleGroupChange}  handleDefaultGroupChange = {this.props.handleDefaultGroupChange} eventChange = {this.state.eventChange} groupID = {this.state.groupID} eventID = {this.state.eventID} resetEventChange = {this.resetEventChange}/>;
          }}

        </Query>
       
      </div>
    );
  }
  
}

export default Calendar;
