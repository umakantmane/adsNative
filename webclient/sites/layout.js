import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link,Redirect } from 'react-router-dom';


class BaseLayout extends React.Component {
 
 constructor(props){
      super(props);
     this.state = {
     username:localStorage.getItem('username'),
     }
  }
  
  render(){
    return(
      <Router>
        <nav class="navbar navbar-inverse">
            <div class="container-fluid">
              <div class="navbar-header">
              <a class="navbar-brand" href="#">WebSiteName</a>
              </div>
              <ul class="nav navbar-nav navbar-right">

              {this.state.username ? <Logout data= {this.state.username} /> : <RegLogin />}

              </ul>
            </div>
          </nav>
      </Router>
    );
  }
};

class RegLogin extends React.Component {

    render(){
        return(
                <ul class="nav navbar-nav navbar-right">
                <li><Link to={'/home'}>Home</Link></li>
                <li><Link to={'/register'}><span class="glyphicon glyphicon-log-in"></span>Register</Link></li>
              <li><Link to={'/login'} ><span class="glyphicon glyphicon-log-in"></span>Login</Link></li>
              </ul>
        );
    }
};

class Logout extends React.Component {
    
    constructor(props){
        
        super(props);
        this.state = {
            logOutFlag:false
        };
        
    }
    logOutFunc(e){
        e.preventDefault();
        localStorage.removeItem('username');
        localStorage.removeItem('access_token');
        this.setState({logOutFlag:true});
    }
    render(){
        if(this.state.logOutFlag) return <Redirect to='/login' />
        return(
                <ul class="nav navbar-nav navbar-right">
                <li><Link to={'/user_enrollemt'}>user_enrollemt</Link></li>
                <li><Link to={'/course_enroll'}>Course Enroll</Link></li>
                <li><Link to={'/course_list'}>Course List</Link></li>
                <li><Link to={'/dashboard'} ><span class="glyphicon glyphicon-log-in"></span>Home</Link></li>
                <li><Link to={'/logout'} onClick={this.logOutFunc.bind(this) } ><span class="glyphicon glyphicon-log-in"></span>Logout({this.props.data})</Link></li>
              </ul>
        );
    }
};

export default BaseLayout;