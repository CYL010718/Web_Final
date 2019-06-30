import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { Mutation } from 'react-apollo'
import {CHANGE_MUTATION} from '../graphql/mutations'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    age: '',
    name: 'hai',
  });


  function handleChange(event) {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
    console.log('new manager id:'+event.target.value)
  }

  var renderUsers = () =>{
    console.log(props)
    return props.users.map(user => {
        if ( user.id !== props.manager.id) return(
            <MenuItem key={user.id} value={user.id}>{user.email}</MenuItem>
        )
    })
  }

  return (
    <div>

        <form className={classes.root} autoComplete="off">
          <Mutation mutation = {CHANGE_MUTATION}>
            {groupChangeManager => {
              return(
                <FormControl className={classes.formControl}>
                    <InputLabel shrink htmlFor="age-label-placeholder">
                    Manager: 
                    </InputLabel>
                    <Select
                    value={values.age}
                    onChange={event => {
                      setValues(oldValues => ({ ...oldValues,[event.target.name]: event.target.value,}));
                      console.log('new manager id:'+event.target.value)
                      groupChangeManager({
                        variables: {
                          id: props.groupID,
                          userID:event.target.value
                        }
                      })
                    }}
                    input={<OutlinedInput name="age" id="age-label-placeholder" />}
                    displayEmpty
                    name="age"
                    className={classes.selectEmpty}
                    >
                    <MenuItem value="" disabled>
                        <em>{props.manager.name}</em>
                    </MenuItem>
                    {renderUsers()}
                    </Select>
                </FormControl>
                      )
            }}
          </Mutation>
        
        </form>
    </div>
  );
}