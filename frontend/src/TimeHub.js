import React, { Component } from "react";
import { NavLink, Switch, Route} from "react-router-dom";

import SignIn from './containers/SignInSystem/Signin';
import SignUp from './containers/SignInSystem/Signup';
import Calendar from './containers/Calendar';
class TimeHub extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <Switch>
                <Route exact path = '/' component = {SignIn}/>
                <Route path = '/SignUp' component = {SignUp}/>
                <Route path = '/main' component = {Calendar}/>
            </Switch> 
           
        )
    }
}

export default TimeHub