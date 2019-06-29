import React, {Component} from "react";
import TextField from '../../components/TextFields'
import TimePicker from '../../components/timePickers'
import SaveButton from '../../components/saveButton'
import Password from '../../components/password'
import EditIcon from '../../components/editIcon'
import Avatar from '../../components/Avatar'
import Group from '../../components/group'
import { Query, Mutation } from 'react-apollo'
import {SINGLE_EVENT_QUERY, CURRENT_USER} from '../../graphql/queries'
import{UPDATE_USER_MUTATION, CREATE_EVENT_MUTATION, UPDATE_EVENT_MUTATION, DELETE_EVENT_MUTATION} from '../../graphql/mutations';
import user from '../user'

class  Toolbar extends Component {
    constructor(props){
        super(props);
        
        this.state={
            startTime:new Date(),
            endTime:new Date(),
            checkTime: new Date()
        }
    }

    setNewStartTime = (time) => {
        console.log(time);
        this.setState({startTime:time})
    }

    setNewEndTime = (time) => {
        this.setState({endTime:time})
    }

    handleSubmit = e => {
        
        e.preventDefault()

        let tem = document.getElementById('profile');
        let name = document.getElementById('textFieldUserName').value;
        let email = document.getElementById('textFieldUserEmail').value;
        let password = document.getElementById('InputUserPassword').value;
    
        if (!name && !email && !password) return
    
        this.updateUser({
          variables: {
            name: name,
            email: email,
            password: password
          }
        })

        tem.scrollBy(0,-1000);
        if (tem.style.pointerEvents==='auto')
            tem.style.pointerEvents = 'none'
    }
    addNewEvent = e =>{
        e.preventDefault()

        let groupID = this.props.groupID;
        let title = document.getElementById('textFieldTitle').value;
        let body = document.getElementById('textFieldExplanation').value;
        let start = this.state.startTime
        let end = this.state.endTime

        if(!groupID || !title || !start || !end || !this.isTimeCorrect()) return
        console.log(this.createEvent);
        this.createEvent({
            variables: {
                groupID: groupID,
                title: title,
                body: body,
                start: start,
                end: end
            }
        })

        this.setState({startTime:new Date(), endTime: new Date()})
    }
    editEvent = e => {
        e.preventDefault()

        let eventID = this.props.eventID;
        let title = document.getElementById('textFieldTitle').value;
        let body = document.getElementById('textFieldExplanation').value;
        let start = this.state.startTime
        let end = this.state.endTime

        if(!eventID || !title || !start || !end || !this.isTimeCorrect()) return

        this.updateEvent({
            variables: {
                eventID:eventID,
                title: title,
                body: body,
                start: start,
                end: end
            }
        })

        this.setState({startTime:new Date(), endTime: new Date()})
    }
    cancelEvent = e => {
        e.preventDefault();
        let eventID = this.props.eventID;
        let groupID = this.props.groupID;

        if(!eventID || !groupID) return

        this.deleteEvent({
            variables:{
                eventID: eventID,
                groupID: groupID
            }
        })
    }
    editProfile = () => {
        var tem = document.getElementById('profile');
        if (tem.style.pointerEvents==='none'){
            tem.style.pointerEvents = 'auto'
            tem.scrollBy(0,1);
        }
        else if (tem.style.pointerEvents==='auto'){
            tem.scrollBy(0,-1000);
            tem.style.pointerEvents='none';
        }

    }


    isTimeCorrect = () => {
        let start = this.state.startTime;
        let end = this.state.endTime;
        console.log(start)
        console.log(end);
        console.log(new Date());
        if ( start.getTime()-end.getTime() > 0 )
           return false;
        return true;
    }
  /*  saveProfile = () => {
        var name = document.getElementById('textFieldUserName').value;
        var email = document.getElementById('textFieldUserEmail').value;
        var password = document.getElementById('InputUserPassword').value;
        console.log({name,email,password});
    }*/


    render(){
        console.log(this.props.groups)
        return (
            <div style={{width:'400px', height:'100%', position:'absolute', right:'0', top:'0',backgroundColor:'#f3e8e7', 
                        display: 'flex', flexDirection: 'row-reverse', justifyContent:'flex-start'}}>
                <div style={{width:'50px', height:'100%',backgroundColor:'#344661', 
                            display: 'flex', flexDirection: 'row-reverse', justifyContent:'flex-start'}}></div>
                <div style={{width:'350px', height:'100%', overflowX:'hidden', overflowY:'hidden'}}>
                <div style={{width:'100%', height:'20%',padding:'5px 5px 0 5px', overflowY:'hidden'}}>
                        <div style={{width:'340px', height:'100%', display:'flex'}}>
                            
                            <Query query = {CURRENT_USER}>
                                {({loading,data,error,subscribeToMore}) => {
                                    if(loading||!data) return null

                                   
                                    let {name,email,password} = data.me
                                    return(
                                        <Mutation mutation = {UPDATE_USER_MUTATION}>
                                            {(updateUser,{data}) => {
                                                console.log(data);
                                                this.updateUser = updateUser
                                                return (
                                                    <div style={{width:'340px', height:'100%', display:'flex'}}>
	                                                        <div style={{height:'100%', width:'25%', backgroundColor:'#f3dddf'}}>
	                                                            <Avatar radius={70} margin={10} name={name[0]}/>
	                                                        </div>
	                                                        <div id = 'profile' style={{height:'100%', width:'65%', pointerEvents:'none', backgroundColor:'#f3dddf', overflowY:'scroll'}}>
	                                                            <TextField label='Name' row='1' id='UserName' defaultValue={name} />
	                                                            <TextField label='Email' row='1' id='UserEmail' defaultValue={email} />
	                                                            <div style={{margin:'50px 0 0 0'}}>
	                                                                <Password defaultValue={password}/>
	                                                            </div>
	                                                            <SaveButton value = "save" handleClick = {this.handleSubmit} iscorrect={()=>true}/>
	                                                        </div>
	                                                        <div style={{height:'100%', width:'10%', backgroundColor:'#f3dddf', position:'relative'}}>
	                                                            <div style={{position:'absolute', top:'0', right:'0'}}>
	                                                                <EditIcon editProfile = {this.editProfile}/>
	                                                            </div>
                                                        </div>
    
                                                    </div>
                                                )
                                            }}
                                        </Mutation>
                                    )
                                }}
                            </Query>
                       
                        </div>
                    </div>
                    
                    <div style={{width:'100%', height:'40%',padding:'5px 5px 0 5px', overflowY:'scroll'}}>
                        <div style={{width:'340px', height:'100%', backgroundColor:'#dbe9d0'}}>
                            <Group defaultGroup = {this.props.defaultGroup} groups = {this.props.groups} handleGroupChange = {this.props.handleGroupChange} handleDefaultGroupChange = {this.props.handleDefaultGroupChange}/>
                        </div>
                    </div>
                    <div style={{width:'100%', height:'40%',padding:'5px 5px 0 5px', overflowY:'scroll'}}>
                        <div style={{width:'340px', height:'100%', backgroundColor:'#dfe3e6'}}> 
                            <Query query = {SINGLE_EVENT_QUERY} variables = {{id: this.props.eventID}}>
                            {({loading,data,error,subscribeToMore}) => {
                                
                                if(loading||!data) return null;
                                console.log(data)
                                if(data.event === null ){
                                  /*  if(this.state.startTime !== this.state.checkTime && this.state.endTime !== this.state.checkTime){
                                        this.setNewStartTime(new Date());
                                        this.setNewEndTime(new Date());
                                        this.setState({
                                            checkTime: new Date()
                                        })
                                    }*/
                                    return(
                                    <div>
                                        <TextField row='1' placeholder='Title' id='Title' defaultValue = {""}/>
                                            <div style={{display:'flex', justifyContent:'space-around'}}>
                                                <TimePicker label='start time' id='StartTime'  time = {this.state.startTime} settime={this.setNewStartTime}/>
                                                <TimePicker label='end time' id='EndTime' time = {this.state.endTime} settime={this.setNewEndTime}/>
                                            </div>
                                        <TextField row='7' label='' placeholder='brief explanation' id='Explanation' defaultValue = {""}/>
                                    </div>
                                )}

                                let {title,body,start,end} = data.event
                                start = new Date(Date.parse(start));
                                end = new Date(Date.parse(end));
                                if(this.props.eventChange === true){
                                    this.props.resetEventChange();
                                    this.setNewStartTime(start);
                                    this.setNewEndTime(end);
                                }
                                
                                console.log(start)
                                return(
                                    <div>
                                        <TextField row='1' placeholder='Title' id='Title' defaultValue = {title}/>
                                            <div style={{display:'flex', justifyContent:'space-around'}}>
                                                <TimePicker label='start time' id='StartTime'  time = {this.state.startTime} settime={this.setNewStartTime}/>
                                                <TimePicker label='end time' id='EndTime' time = {this.state.endTime} settime={this.setNewEndTime}/>
                                            </div>
                                        <TextField row='7' label='' placeholder='brief explanation' id='Explanation' defaultValue = {body}/>
                                    </div>
                                )

                            }}
                            </Query>
                                <div style = {{display:"flex", justifyContent:"space-between"}}>
                                    <Mutation mutation = {UPDATE_EVENT_MUTATION}>
                                        {updateEvent => {
                                            this.updateEvent = updateEvent;
                                            return  <SaveButton value = "save" handleClick = {this.editEvent} iscorrect={this.isTimeCorrect}/>
                                        }}
                                    </Mutation>
                                    <Mutation mutation = {CREATE_EVENT_MUTATION}>
                                        {createEvent => {
                                            this.createEvent = createEvent;
                                            return  <SaveButton value = "create" handleClick = {this.addNewEvent} iscorrect={this.isTimeCorrect}/>
                                        }}
                                    </Mutation>
                                    <Mutation mutation = {DELETE_EVENT_MUTATION}>
                                        {deleteEvent => {
                                            this.deleteEvent = deleteEvent;
                                            return(
                                                <SaveButton value = "delete" handleClick = {this.cancelEvent} />
                                            )
                                        }}
                                    </Mutation>
                                    
                                </div>
                        </div>                  
                    </div>
                </div>
            </div>
        )
    }
}

export default Toolbar;
