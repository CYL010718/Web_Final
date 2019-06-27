import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DateTimePicker 
} from '@material-ui/pickers';

const useStyles = makeStyles({
  grid: {
    width: '47%',
  },
});

export default function MaterialUIPickers(props) {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(props.time);

  const classes = useStyles();

  function handleDateChange(date) {
    setSelectedDate(date);
    props.settime(date)
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container className={classes.grid} justify="space-around">
        <DateTimePicker
            id={"timePicker"+props.id}
            label={props.label}
            inputVariant="outlined"
            value={props.time}
            onChange={handleDateChange}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}