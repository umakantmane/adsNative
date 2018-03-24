import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link,Redirect } from 'react-router-dom';
import DashBoard from './sites/dashboard';
import Login from './sites/login';
import Register from './sites/register';
import Index from './course/index';
import UpdateCouser from './course/update';
import CreateCourse from './course/create';
import ViewCourse from './course/view';
import Enrolle from './enroll/enroll';
import CouserEnrollment from './enroll/course_enrollment';
import MyEnrollments from './enroll/my_enrollments';


class App extends React.Component {
 
 constructor(props){
      super(props);
     
     this.state = {
     username:localStorage.getItem('username'),
     }
  }
  
  render(){
    return(
      <Router>
        <div>
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

          <div class='container'>
            <Switch>
              <Route exact path='/course_enroll' component={Enrolle} />
              <Route exact path='/dashboard' component={DashBoard} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/course_list' component={Index} />
              <Route exact path='/course_view/:id' component={ViewCourse} />
              <Route exact path='/user_enrollemt' component={MyEnrollments} />
              <Route exact path='/create_course' component={CreateCourse} />
              <Route exact path='/course_update/:id' component={UpdateCouser} />
              <Route exact path='/course_enrollment/:id' component={CouserEnrollment} />
            </Switch>
          </div>
        </div>
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

export default App;