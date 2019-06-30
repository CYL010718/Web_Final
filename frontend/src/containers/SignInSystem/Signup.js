import React, { Component } from 'react'
import { Mutation } from "react-apollo";
import { NavLink, Switch, Route,Redirect} from "react-router-dom";
//import { hashHistory } from "react-router";

import CURRENT_USER from '../../graphql/currentUser'
import SIGNUP from '../../graphql/signup';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


class SignUp extends Component{
  state = {
      name: '',
      email: '',
      password: '',
      Redirect:<div/>
  }
  handleSubmit = e =>{
    e.preventDefault();
    this.signup({
      variables: {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password 
      }
    }).then(data => {
      this.setState(state => ({
        Redirect: <Route exact path = "/SignUp" component = {() => <Redirect to = "/"/>}/>
      }))
    })
    this.setState(state => ({
        name: '',
        email: '',
        password: ''
    }))
    // hashHistory.push("/")
  }
  render(){
    console.log('hi');
    return (
      <Mutation mutation={SIGNUP}>
        {(signup, { data, loading, error }) => {
          this.signup = signup;
          if (error) {
            //hashHistory.push("/login");
            console.log("login error")
          }
  
          return (
            <div style = {{display: 'flex', justifyContent: 'space-around', alignItems: 'center',height:'100%'}}>
            <div style = {{height:'100%', width: '50%',backgroundColor: 'black', display:'flex',alignItems: 'center'}}>
                <img src = {require(`../../img/time-stone.jpg`)} style = {{width:'100%'}}  alt="tem2"/>
            </div>
            {this.state.Redirect}
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div>
                <div style = {{display:'flex', justifyContent:'center'}}>
                    <Avatar style = {{backgroundColor: 'rgb(200,0,0)'}}>
                    <LockOutlinedIcon />
                  </Avatar>
                </div>
                <div style = {{display:'flex', justifyContent:'center'}}>
                  <Typography component="h1" variant="h5">
                    Sign Up
                  </Typography>
                </div>
                <form onSubmit = {this.handleSubmit}>
                   <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    onChange = { e => {
                        this.setState({
                            name: e.target.value
                        })
                    }}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange = { e => {
                        this.setState({
                            email: e.target.value
                        })
                    }}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange = { e => {
                        this.setState({
                            password: e.target.value
                        })
                    }}/>
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Sign Up
                  </Button>
                </form>
              </div>
             
            </Container> 
            </div> 
          );
        }}
      </Mutation>
    );
  }
 
};


export default SignUp;
