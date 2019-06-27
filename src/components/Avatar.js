import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

export default function ImageAvatars(props) {
    console.log(props.radius)
  const useStyles = makeStyles({
    avatar: {
      margin: props.margin,
      width: props.radius+0,
      height: props.radius+0,
    },
  });
  const classes = useStyles();

  return (
    <Grid container justify="center" alignItems="center">
      <Avatar className={classes.avatar}>{props.name}</Avatar>
    </Grid>
  );
}