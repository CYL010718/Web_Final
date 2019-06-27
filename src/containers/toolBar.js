import React, {Component} from "react";
import TextField from '../components/TextFields'
import TimePicker from '../components/timePickers'
import SaveButton from '../components/saveButton'
import Avatar from '../components/Avatar'
import user from '../user'
import EditIcon from '../components/editIcon'
import Password from '../components/password'

class  Toolbar extends Component {

    constructor(props){
        super(props);
        this.state={
            startTime:new Date(),
            endTime:new Date(),
        }
    }

    setNewStartTime = (time) => {
        this.setState({startTime:time})
    }

    setNewEndTime = (time) => {
        this.setState({endTime:time})
    }

    addNewEvent = () =>{
        if ( !this.isTimeCorrect())return;
        var title = document.getElementById('textFieldTitle').value;
        var body = document.getElementById('textFieldExplanation').value;
        var start = this.state.startTime;
        var end = this.state.endTime;
        console.log({title , body, start, end});
        document.getElementById('textFieldTitle').value='';
        document.getElementById('textFieldExplanation').value='';
        this.setState({startTime:new Date(), endTime: new Date()})
    }

    editProfile = () => {
        var tem = document.getElementById('profile');
        tem.scrollBy(0,1);
        if (tem.style.pointerEvents==='none')
            tem.style.pointerEvents = 'auto'
        else if (tem.style.pointerEvents==='auto'){
            tem.scrollBy(0,-1000);
        }

    }

    saveProfile = () => {
        var tem = document.getElementById('profile');
        var name = document.getElementById('textFieldUserName').value;
        var email = document.getElementById('textFieldUserEmail').value;
        var password = document.getElementById('InputUserPassword').value;
        console.log({name,email,password});
        tem.scrollBy(0,-1000);
        if (tem.style.pointerEvents==='auto')
            tem.style.pointerEvents = 'none'
    }

    isTimeCorrect = () => {
        var start = this.state.startTime;
        var end = this.state.endTime;
        if ( start.getTime()-end.getTime() > 0 )
           return false;
        return true;
    }

    render(){
        return (
            <div style={{width:'400px', height:'100%', position:'absolute', right:'0', top:'0',backgroundColor:'#f3e8e7', 
                        display: 'flex', flexDirection: 'row-reverse', justifyContent:'flex-start'}}>
                <div style={{width:'50px', height:'100%',backgroundColor:'#344661', 
                            display: 'flex', flexDirection: 'row-reverse', justifyContent:'flex-start'}}></div>
                <div style={{width:'350px', height:'100%', overflowX:'hidden', overflowY:'hidden'}}>
                    <div style={{width:'100%', height:'20%',padding:'5px 5px 0 5px', overflowY:'hidden'}}>
                        <div style={{width:'340px', height:'100%', display:'flex'}}>
                            <div style={{height:'100%', width:'25%', backgroundColor:'#f3dddf'}}>
                                <Avatar radius={70} margin={10} name={user.name[0]}/>
                            </div>
                            <div id = 'profile' style={{height:'100%', width:'65%', pointerEvents:'none', backgroundColor:'#f3dddf', overflowY:'scroll'}}>
                                <TextField label='Name' row='1' id='UserName' defaultValue={user.name}/>
                                <TextField label='Email' row='1' id='UserEmail' defaultValue={user.email}/>
                                <div style={{margin:'50px 0 0 0'}}>
                                    <Password defaultValue={user.password} />
                                </div>
                                <SaveButton handleClick = {this.saveProfile} iscorrect={()=>true}/>
                            </div>
                            <div style={{height:'100%', width:'10%', backgroundColor:'#f3dddf', position:'relative'}}>
                                <div style={{position:'absolute', top:'0', right:'0'}}>
                                    <EditIcon editProfile = {this.editProfile}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{width:'100%', height:'40%',padding:'5px 5px 0 5px', overflowY:'scroll'}}>
                        <div style={{width:'340px', height:'100%', backgroundColor:'#dbe9d0'}}>

                        </div>
                    </div>
                    <div style={{width:'100%', height:'39%',padding:'5px 5px 0 5px', overflowY:'scroll'}}>
                        <div style={{width:'340px', height:'100%', backgroundColor:'#dfe3e6', display: 'flex', justifyContent: 'space-around', flexDirection:'column'}}> 
                            <TextField row='1' placeholder='Title' id='Title'/>
                            <div style={{display:'flex', justifyContent:'space-around'}}>
                                <TimePicker label='start time' id='StartTime' time={this.state.startTime} settime={this.setNewStartTime}/>
                                <TimePicker label='end time' id='EndTime' time={this.state.endTime} settime={this.setNewEndTime}/>
                            </div>
                            <div>
                                <TextField row='5' label='' placeholder='brief explanation' id='Explanation'/>
                                <SaveButton handleClick = {this.addNewEvent} iscorrect={this.isTimeCorrect}/>           
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Toolbar;
