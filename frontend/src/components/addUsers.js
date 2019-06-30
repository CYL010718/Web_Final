import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

import { Mutation } from 'react-apollo'
import {GROUP_ADDUSER__MUTATION} from '../graphql/mutations'
import { datePickerDefaultProps } from '@material-ui/pickers/constants/prop-types';

const useStyles = makeStyles({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 140,
    Margin:'10px 0'
  },
  input: {
    marginLeft: 10,
    flex: 1,
  },
  iconButton: {
    padding: 5,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 0,
  },
});

export default function CustomizedInputBase(props) {
  const classes = useStyles();

  var handleAddButtonClick = () =>{
    var tem = document.getElementById('AddUserInputArea').value;
    //console.log(tem)
  }

  return (
    <Paper className={classes.root}>
      <Mutation mutation = {GROUP_ADDUSER__MUTATION}>
        {groupAddUser => {
          return(
            <div>
            <InputBase
            id = 'AddUserInputArea'
            className={classes.input}
            placeholder="Add User"
          />
          <IconButton color="primary" className={classes.iconButton} aria-label="Directions" onClick = {() => {
            var tem = document.getElementById('AddUserInputArea').value;
            //console.log(tem)
            groupAddUser({
              variables:{
                id: props.groupID,
                email:tem
              }
            })
          }}>
          <AddIcon />
          </IconButton>
          </div>
          )
        }}
         </Mutation>
        
      </Paper>
  );
}