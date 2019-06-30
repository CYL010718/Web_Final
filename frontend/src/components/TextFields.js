import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));

export default function TextFields(props) {
  const classes = useStyles();

  return (
    <form className={classes.container} noValidate autoComplete="off" key = {props.defaultValue} >
      <TextField
        id={"textField"+props.id}
        label={props.label}
        style={{ margin: 8 }}
        placeholder={props.placeholder}
        multiline
        defaultValue={props.defaultValue || "" }
       // value = {props.value}
        rows={props.row}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}