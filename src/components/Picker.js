import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import IconButton from '@material-ui/core/IconButton';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

class Pickers extends React.Component {
  // The first commit of Material-UI
  handleClick = (num) => {
    const date = this.props.selectedDate;
    const dateTime = date.getTime();
    const newDate = new Date(dateTime+num*1000*60*60*24);
    this.props.handleDateChange(newDate);
  }
  handleLeftClick = () => { this.handleClick(-1) }
  handleRightClick = () => { this.handleClick(1) }
  render(){
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div  style={{display: 'flex' ,justifyContent: 'space-evenly'}}>
                <div style={{color:'inherit',display: 'flex', alignItems: 'center'}}>
                    <IconButton aria-label="ChevronLeftIcon" size="small" color="inherit" onClick={this.handleLeftClick}>
                        <ChevronLeftIcon fontSize="inherit" />
                    </IconButton>
                </div>
                <KeyboardDatePicker
                margin="normal"
                id="mui-pickers-date"
                label=""
                value={this.props.selectedDate}
                onChange={this.props.handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                />
                <div style={{color:'inherit',display: 'flex', alignItems: 'center'}}>
                    <IconButton aria-label="ChevronLeftIcon" size="small" color="inherit" onClick={this.handleRightClick}>
                        <ChevronRightIcon fontSize="inherit" />
                    </IconButton>
                </div>
            </div>
        </MuiPickersUtilsProvider>
    )
  }
}
export default Pickers