import React from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 20,
  },
}));

export default function IconLabelButtons(props) {
  const classes = useStyles();
  const [color, setcolor] = React.useState({color:'default' });
  var mouseover = () => {
      var tem = props.iscorrect();
      if( !tem) setcolor({color:'secondary'})
  }
  var mouseout = () => {
      setcolor({color:'default'})
  }
  return (
    <div style={{display:'flex', flexDirection:'row-reverse'}}>
        <Button variant="contained" size="small" className={classes.button} 
                onClick = {props.handleClick} color={color.color} 
                onMouseOver = {mouseover} onMouseOut = {mouseout}>
          <SaveIcon className={clsx(classes.leftIcon, classes.iconSmall)} />
          Save
        </Button>
    </div>
  );
}