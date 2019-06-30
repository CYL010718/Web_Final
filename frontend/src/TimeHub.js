import React, { Component } from "react";
import { NavLink, Switch, Route} from "react-router-dom";

import SignIn from './containers/SignInSystem/Signin';
import SignUp from './containers/SignInSystem/Signup';
import Calendar from './containers/Calendar';
import { Query } from 'react-apollo'
import {USER_DEFAULT_GROUP} from './graphql/queries'
class TimeHub extends Component{
    constructor(props){
        super(props)
        this.state = {
            defaultGroup: '1'
        }
    }

    render(){
        return(

            <Switch>
                <Route exact path = '/' component = {SignIn}/>
                <Route path = '/SignUp' component = {SignUp}/>
                <Query query = {USER_DEFAULT_GROUP}>
                {({loading,data,error}) => {
                    if(loading) return null
                    if(error) console.log("error")
                    console.log(data)
                    let defaultGroup = data.me.defaultGroup.id;
                    return(
                            <Route path = '/main' render = {() => <Calendar defaultGroup ={defaultGroup} handleDefaultGroupChange = {this.handleDefaultGroupChange}/>}/>
                            )
                        }}
        
                    </Query>
            </Switch> 
              
            
           
        )
    }
}

export default TimeHub