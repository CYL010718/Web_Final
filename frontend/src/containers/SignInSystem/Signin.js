/*import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap'

import {
  POSTS_QUERY,
  CREATE_POST_MUTATION,
  POSTS_SUBSCRIPTION
} from '../../graphql'
import Post from '../../components/Post/Post'
import classes from './App.module.css'

let unsubscribe = null

class App extends Component {
  state = {
    formTitle: '',
    formBody: '',
    formAuthor: 1
  }

  handleonClick = e => {
    const id = e.target.firstChild.innerHTML;
    const element = document.getElementById(id);
    if(element.style.display === 'block')  {
      element.style.display = 'none'
    }
    else if(element.style.display === 'none'){
      element.style.display = 'block'
    }
  }

  handleFormSubmit = e => {
    e.preventDefault()

    const { formTitle, formBody, formAuthor } = this.state

    if (!formTitle || !formBody || !formAuthor) return

    this.createPost({
      variables: {
        title: formTitle,
        body: formBody,
        published: true,
        authorId: formAuthor
      }
    })

    this.setState({
      formTitle: '',
      formBody: '',
    })
  }

  render() {
    
    return (
      <Container>
        <Row>
          <Col>
            <h1 className={classes.title}>Modern GraphQL Tutorial</h1>
          </Col>
        </Row>
        <Row>
          <Col xs="6" className={classes.form}>
              <Mutation mutation={CREATE_POST_MUTATION}>
                {createPost => {
                  this.createPost = createPost
                  return (
                    <Form onSubmit={this.handleFormSubmit}>
                      <FormGroup row>
                        <Label for = 'author' sm = {2}>
                          Author
                        </Label>
                        <Col sm = {10}>
                          <Input type = 'select' onChange={e => this.setState({ formAuthor: e.target.value })}> 
                            <Query query={POSTS_QUERY}>
                                {({ loading, error, data, subscribeToMore }) => {
                                  if (loading){
                                    console.log('loading!')
                                    return null
                                  }
                                  if (error) {
                                    console.log('error!')
                                    return null
                                  }
                                  const users = data.users.map((user, id) => (
                                    <option value = {id+1} key = {id}>{user.name}</option>
                                  ))
                                  return users
                                }}
                            </Query>
                          </Input>     
                        </Col>  
                      </FormGroup>
                      <FormGroup row>
                        <Label for="title" sm={2}>
                          Title
                        </Label>
                        <Col sm={10}>
                          <Input
                            name="title"
                            value={this.state.formTitle}
                            id="title"
                            placeholder="Post title..."
                            onChange={e =>
                              this.setState({ formTitle: e.target.value })
                            }
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup>
                        <Label for="body">Body</Label>
                        <Input
                          type="textarea"
                          name="body"
                          value={this.state.formBody}
                          id="body"
                          placeholder="Post body..."
                          onChange={e =>
                            this.setState({ formBody: e.target.value })
                          }
                        />
                      </FormGroup>
                      <Button type="submit" color="primary">
                        Post!
                      </Button>
                    </Form>
                  )
                }}
              </Mutation>
          </Col>
          <Col xs="6">
            <Query query={POSTS_QUERY}>
              {({ loading, error, data, subscribeToMore }) => {
                if (loading) return <p>Loading...</p>
                if (error) return <p>Error :(((</p>

                const posts = data.users.map((user, id) => (
                  <div style={{ border: '1px solid', margin: '30px auto', width: '410px' }} key = {id}>
                    <button  onClick = {this.handleonClick} style = {{backgroundColor:'rgba(255,200,200,0.5)' ,width:'100%', display: 'flex', justifyContent:'space-between', alignItems:'center'}}>
                      <span style = {{fontWeight: 'bold'}}>{user.name}</span> 
                      <span style = {{fontWeight: 'bold'}}>number of posts: {user.posts.length}</span>
                    </button>
                    <div style = {{display: 'none'}} id = {user.name}>
                      {user.posts.map((post,id) => (
                        <Post data={post} key={id} />
                      ))}
                    </div>
                  </div>
               ))
                
                if (!unsubscribe)
                  unsubscribe = subscribeToMore({
                    document: POSTS_SUBSCRIPTION,
                    updateQuery: (prev, { subscriptionData }) => {
                      
                      if (!subscriptionData.data) return prev
                      const newUser = subscriptionData.data.post.data.author
                      const replaceNum = newUser.id-1;
                      prev.users.splice(replaceNum, 1, newUser)
                      return {
                        ...prev,
                        users: prev.users
                      }
                    }
                  })

                return <div>{posts}</div>
              }}
            </Query>
          </Col>
        </Row>
      </Container>
    )
  }
}


export default App*/
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
    console.log(this.state.email)
    this.login({
      variables: {
        email: this.state.email,
        password: this.state.password
      }
    }).then(data => {
        console.log(localStorage.getItem("x-token"))
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

    return (
      <Mutation
        mutation={LOGIN}
        refetchQueries={data => {
          localStorage.setItem("x-token", data.data.login.token);
          console.log({ query: CURRENT_USER }.data);
          return [{ query: CURRENT_USER }];
        }}
        awaitRefetchQueries={true}
      >
        {(login, { data, loading, error }) => {
          this.login = login;
          console.log(data)
          if (error) {
            /*this.setState(state => ({
              Redirect: <Route exact path = "/" component = {() => <Redirect to = "/"/>}/>
            }))*/
           // hashHistory.push("/");
            console.log("login error")
          }
  
          return (
            <div style = {{display: 'flex', justifyContent: 'space-around', alignItems: 'center',height:'100%'}}>
            <div style = {{height:'100%', width: '50%',backgroundColor: 'black', display:'flex',alignItems: 'center'}}>
                <img src = {require(`../../img/pornhubLogo.jpeg`)} style = {{width:'100%'}} alt="tem2"/>
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
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
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
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
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