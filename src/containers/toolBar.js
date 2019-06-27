import React, {Component} from "react";
import TextField from '../components/TextFields'
import TimePicker from '../components/timePickers'
import SaveButton from '../components/saveButton'
import Avatar from '../components/Avatar'
import user from '../user'

class  Toolbar extends Component {

    addNewEvent = () =>{
        var title = document.getElementById('textFieldTitle').value;
        var body = document.getElementById('textFieldExplanation').value;
        var start = document.getElementById('timePickerStartTime').value;
        var end = document.getElementById('timePickerEndTime').value;
        console.log({title , body, start, end});
    }

    render(){
        return (
            <div style={{width:'400px', height:'100%', position:'absolute', right:'0', top:'0',backgroundColor:'#f3e8e7', 
                        display: 'flex', flexDirection: 'row-reverse', justifyContent:'flex-start'}}>
                <div style={{width:'50px', height:'100%',backgroundColor:'#344661', 
                            display: 'flex', flexDirection: 'row-reverse', justifyContent:'flex-start'}}></div>
                <div style={{width:'350px', height:'100%', overflowX:'hidden', overflowY:'hidden'}}>
                    <div style={{width:'100%', height:'20%',padding:'5px 5px 0 5px', overflowY:'scroll'}}>
                        <div style={{width:'340px', height:'100%', backgroundColor:'#f3dddf', display:'flex'}}>
                            <div style={{height:'100%', width:'25%'}}>
                                <Avatar radius={70} margin={10} name={user.name[0]}/>
                            </div>
                            <div style={{height:'100%', width:'65%', pointerEvents:'none'}}>
                                <TextField label='Name' row='1' id='UserName' defaultValue={user.name}/>
                                <TextField label='Email' row='1' id='UserEmail' defaultValue={user.email}/>
                            </div>
                            <div style={{height:'100%', width:'10%', pointerEvents:'none'}}>
                                
                            </div>
                        </div>
                    </div>
                    <div style={{width:'100%', height:'40%',padding:'5px 5px 0 5px', overflowY:'scroll'}}>
                        <div style={{width:'340px', height:'100%', backgroundColor:'#dbe9d0'}}>

                        </div>
                    </div>
                    <div style={{width:'100%', height:'40%',padding:'5px 5px 0 5px', overflowY:'scroll'}}>
                        <div style={{width:'340px', height:'100%', backgroundColor:'#dfe3e6'}}> 
                            <TextField row='1' placeholder='Title' id='Title'/>
                            <div style={{display:'flex', justifyContent:'space-around'}}>
                                <TimePicker label='start time' id='StartTime'/>
                                <TimePicker label='end time' id='EndTime'/>
                            </div>
                            <TextField row='3' label='' placeholder='brief explanation' id='Explanation'/>
                            <SaveButton addNewEvent = {this.addNewEvent}/>
                        </div>                  
                    </div>
                </div>
            </div>
        )
    }
}

export default Toolbar;
