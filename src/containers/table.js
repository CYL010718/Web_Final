import React, {Component, useDebugValue} from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const Month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct','Nov','Dec'];
let DaysofMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

const StyledTableCell = withStyles(theme => ({
  head: {
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
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
            DayNum: DaysofMonth[thisMonth]+firstDay+lastVisibleDate
        }
    }
   /* presetDate = () =>{
        let now = new Date();
        let thisMonth = now.getMonth;
        let lastMonth = thisMonth-1;
        let nextMonth = thisMonth+1;
        let firstDay = new Date(now.getFullYear,now.getMonth,1).getDay(); // 一號的星期
        let lastDay = new Date(now.getFullYear, now.getMonth,DaysofMonth[thisMonth]) // 最後一天的星期
        let firstVisibleDate = (DaysofMonth[lastMonth]-firstDay+1)%(DaysofMonth[lastMonth]);
        let LastVisibleDate = 6-lastDay;
    }*/
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
    render(){
        const createRow = (key,first,max) => {   
            return(
                <StyledTableRow key={key}>
                    <StyledTableCell style = {{height:'5em', textAlign:'center',verticalAlign:'text-top'}} >{first > max ? first-max : first}</StyledTableCell>
                    <StyledTableCell style = {{height:'5em', textAlign:'center',verticalAlign:'text-top'}}>{first+1 > max ? first+1-max : first+1}</StyledTableCell>
                    <StyledTableCell style = {{height:'5em', textAlign:'center',verticalAlign:'text-top'}}>{first+2 > max ? first+2-max : first+2}</StyledTableCell>
                    <StyledTableCell style = {{height:'5em', textAlign:'center',verticalAlign:'text-top'}}>{first+3 > max ? first+3-max : first+3}</StyledTableCell>
                    <StyledTableCell style = {{height:'5em', textAlign:'center',verticalAlign:'text-top'}}>{first+4 > max ? first+4-max : first+4}</StyledTableCell>
                    <StyledTableCell style = {{height:'5em', textAlign:'center',verticalAlign:'text-top'}}>{first+5 > max ? first+5-max : first+5}</StyledTableCell>
                    <StyledTableCell style = {{height:'5em', textAlign:'center',verticalAlign:'text-top'}}>{first+6 > max ? first+6-max : first+6}</StyledTableCell>
                </StyledTableRow>
            )
        }
        let dayCell = [];
       // let max = DaysofMonth(lastMonth);
        console.log(this.state.DayNum);
        for(let i = 0;i < this.state.DayNum/7; i++){
            dayCell.push(createRow(i,this.state.firstVisibleDate+7*i > DaysofMonth[this.state.lastMonth] ? this.state.firstVisibleDate+7*i-DaysofMonth[this.state.lastMonth] : this.state.firstVisibleDate+7*i , i === 0 ?DaysofMonth[this.state.lastMonth] :DaysofMonth[this.state.thisMonth]))
        }
        
        return (
           
            <Paper style = {{align: 'center' ,width: '100%',marginTop: 'theme.spacing(3)',overflowX: 'auto',}}>
              <div style = {{display: 'flex', justifyContent: 'space-between'}}>
                  <button onClick = {this.handleBack}> back</button>
                  <h3>{Month[this.state.thisMonth]} {this.state.thisYear}</h3>
                  <button onClick = {this.handleNext}> next</button>
              </div>
              
              <Table style = {{backgroundColor:'rgba(150,0,0,0.1)',minWidth: '700'}}>
                <TableHead style = {{backgroundColor:'rgba(250,22,22,0.5)'}}>
                  <TableRow style = {{backgroundColor:'rgba(150,0,0,0.1)'}}>
                    <StyledTableCell>Sunday</StyledTableCell>
                    <StyledTableCell >Monday</StyledTableCell>
                    <StyledTableCell >Tuesday</StyledTableCell>
                    <StyledTableCell >Wednesday</StyledTableCell>
                    <StyledTableCell >Thursday</StyledTableCell>
                    <StyledTableCell >Friday</StyledTableCell>
                    <StyledTableCell >Saturday</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dayCell}
                </TableBody>
              </Table>
            </Paper>
          );
    }
  
}

export default  CalTable
