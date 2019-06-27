import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(3),
  },
}));

export default function FloatingActionButtons(props) {
  const classes = useStyles();

  return (
    <div onClick={props.editProfile}>
      <Fab color="primary" aria-label="Edit" className={classes.fab}>
        <EditIcon />
      </Fab>
    </div>
  );
}