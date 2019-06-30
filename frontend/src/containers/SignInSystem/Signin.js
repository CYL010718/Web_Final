import React, { Component } from 'react'
import { gql } from "apollo-boost";
import { Mutation, renderToStringWithData } from "react-apollo";
import { NavLink, Switch, Route,Redirect} from "react-router-dom";
//import { hashHistory } from "react-router";
import CURRENT_USER from '../../graphql/currentUser'
import LOGIN from '../../graphql/login'

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
import { styled, withStyles, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
//import { hashHistory } from "react-router";

class SignIn extends Component{
  state = {
    email: '',
    password: '',
    Redirect:<div/>
}
  handleSubmit = e =>{
    e.preventDefault();
    //console.log(this.state.email)
    this.login({
      variables: {
        email: this.state.email,
        password: this.state.password
      }
    }).then(data => {
        //console.log(localStorage.getItem("x-token"))
        this.setState(state => ({
          Redirect: <Route exact path = "/" component = {() => <Redirect to = "/main"/>}/>
        }))
        //hashHistory.push("/main")
       }
    );

    this.setState({
      email: '',
      password: ''
      }
    )
  }
  render(){
    //localStorage.removeItem('x-token')
    return (
      <Mutation
        mutation={LOGIN}
        refetchQueries={data => {
          localStorage.setItem("x-token", data.data.login.token);
          //console.log({ query: CURRENT_USER }.data);
          return [{ query: CURRENT_USER }];
        }}
        awaitRefetchQueries={true}
      >
        {(login, { data, loading, error }) => {
          this.login = login;
          //console.log(data)
          if (error) {
            /*this.setState(state => ({
              Redirect: <Route exact path = "/" component = {() => <Redirect to = "/"/>}/>
            }))*/
           // hashHistory.push("/");
            //console.log("login error")
          }
  
          return (
            <div style = {{display: 'flex', justifyContent: 'space-around', alignItems: 'center',height:'100%'}}>
            <div style = {{height:'100%', width: '50%',backgroundColor: 'black', display:'flex',alignItems: 'center'}}>
                <img src = {require(`../../img/ourCalendar.png`)} style = {{width:'100%'}}  alt="tem2"/>
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
                    Sign in
                  </Typography>
                </div>
                <form onSubmit = {this.handleSubmit}>
                  <TextField
                    value={this.state.email}
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
                    value={this.state.password}
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
                  <Button
                    //type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick = {this.handleSubmit}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item>
                      
                      <NavLink to = "/SignUp" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </NavLink>
                    </Grid>
                  </Grid>
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


export default SignIn;

/*

export default function SignIn() {
  

  return (
    <div>
              <h3>Login</h3>
              <form onSubmit= {this.handleSubmit}>
                <label>email:</label>
                <input
                  defaultValue="fong@test.com"
                  ref={node => {
                    emailInput = node;
                  }}
                />
                <label>password:</label>
                <input
                  type="password"
                  defaultValue="123456"
                  ref={node => {
                    passwordInput = node;
                  }}
                />
                <button type="submit">login</button>
              </form>
            </div>
  );
}*/