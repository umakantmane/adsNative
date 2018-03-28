import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import params from './../config/config';

class Register extends Component{

	constructor(props){

		super(props);
            this.state = {
            	errors:{},
                redirectoCrud:false,
                isAuth:localStorage.getItem('access_token'),
            };
            this.setUsername = this.setUsername.bind(this);
            this.setPassword1 = this.setPassword1.bind(this);
            this.setPassword2 = this.setPassword2.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleFormValidation(){
            
        let fields = this.state;
        let isValid = true;
        let errors = {};
        
        if(fields.username === undefined || fields.username === ''){
            errors['username'] = "Username cannot be blank!";
            isValid = false;
        }
        if(fields.password_one === undefined || fields.password_one === ''){
            errors['password_one'] = "Password cannot be blank!";
            isValid = false;
        }
        if(fields.password_two === undefined || fields.password_two === ''){
            errors['password_two'] = "Re-Password cannot be blank!";
            isValid = false;
        }
        
        this.setState({errors:errors});
        return isValid;
   }
        
	setUsername(event){
            this.setState({username:event.target.value});
	}
	setPassword1(event){
            this.setState({password_one:event.target.value});
	}
	setPassword2(event){
            this.setState({password_two:event.target.value});
	}

	handleSubmit(event){

		 event.preventDefault();
            if(this.handleFormValidation()){

            	fetch(params.apiUrl + '/signup', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: this.state.username,
                        password_one: this.state.password_one,
                        password_two: this.state.password_two
                    })
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    if(!responseJson.hasOwnProperty('id') && responseJson.username != this.state.username){
                        let errors = {};
                        for(var i in responseJson){
                            errors[i] = responseJson[i][0];
                        }
                        if(responseJson.hasOwnProperty('non_field_errors')){
                        	errors['password_two']	= responseJson.non_field_errors;
                        }
                        this.setState({errors:errors})
                    }else {
                    	localStorage.setItem('userRegister', 'Registration done successfully!, please login')
                    	this.setState({redirectoCrud:true});
                	}
                })
                .catch((error) => {
                    console.error(error);
                });

            }	
	}	
	render(){

		if(this.state.isAuth) return <Redirect to='/dashboard'  />;
		if(this.state.redirectoCrud)
                return <Redirect to='/login'  />;
		return(
			
			<form >
				<div class="form-group">
                    <label for="name">UserName:</label>
                    <input type="text" value={this.state.username} onChange={this.setUsername} class="form-control" id="name" placeholder="Enter name" />
                  <span style={{color: "#c53737"}}>{this.state.errors["username"]}</span>
                </div>
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password"  value={this.state.password_one} onChange={this.setPassword1} class="form-control" id="email" placeholder="Enter password" />
                    <span style={{color: "#c53737"}}>{this.state.errors["password_one"]}</span>
                </div>
              	
              	<div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password"  value={this.state.password_two} onChange={this.setPassword2} class="form-control" id="email" placeholder="Enter password" />
                    <span style={{color: "#c53737"}}>{this.state.errors["password_two"]}</span>
                </div>

                <button onClick={this.handleSubmit} class="btn btn-success">Signup</button>
			</form>
		);
	}

}

export default Register