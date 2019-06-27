import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(0),
  },
}));

export default function FloatingActionButtons(props) {
  const classes = useStyles();

  return (
    <div onClick={props.editProfile}>
      <IconButton aria-label="Delete" className={classes.margin} size="small">
          <EditIcon fontSize="inherit" />
      </IconButton>
    </div>
  );
}