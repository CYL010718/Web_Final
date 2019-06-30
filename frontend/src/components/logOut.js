import DeleteIcon from '@material-ui/icons/PowerSettingsNew';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { Route,Redirect} from "react-router-dom";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(0),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));



export default function ButtonSizes(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    Redirect: <div/>
  });
  const handleonClick = () => {
    localStorage.removeItem('x-token')
    setState({Redirect: <Route exact path = "/main" component = {() => <Redirect to = "/"/>}/>})
  }
  
  return (
    <div>
      <div>
        <IconButton aria-label="Delete" className={classes.margin} onClick = {handleonClick}>
          <DeleteIcon />
        </IconButton>
      </div>
      {state.Redirect}
    </div>
  );
}