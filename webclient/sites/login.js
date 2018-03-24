import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


class Login extends Component{

	constructor(props){

		super(props);
            this.state = {
            	errors:{},
                isRegister:localStorage.getItem('userRegister'),
                redirectTo:false,
                isAuth:localStorage.getItem('access_token'),
            };
            this.setUsername = this.setUsername.bind(this);
            this.setPassword = this.setPassword.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            localStorage.removeItem('userRegister');
	}
	setUsername(event){
		this.setState({username:event.target.value});
	}
	setPassword(event){
		this.setState({password:event.target.value});
	}
	handleFormValidation(){
            
        let fields = this.state;
        let isValid = true;
        let errors = {};
        
        if(fields.username === undefined || fields.username === ''){
            errors['username'] = "Username cannot be blank!";
            isValid = false;
        }
        if(fields.password === undefined || fields.password === ''){
            errors['password'] = "Password cannot be blank!";
            isValid = false;
        }
        
        this.setState({errors:errors});
        return isValid;
   }
	handleSubmit(event){

		 event.preventDefault();
            if(this.handleFormValidation()){

            	fetch('http://localhost:8000/signin', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: this.state.username,
                        password: this.state.password
                    })
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    if(responseJson.hasOwnProperty('access_token')){
                    	localStorage.setItem('access_token', responseJson.access_token);
                    	localStorage.setItem('username', responseJson.username);
                        localStorage.setItem('user_id', responseJson.user_id);
                    	this.setState({redirectTo:true});
                        
                    }else{

                    	let errors = {};
                    	var i;
                        for( i in responseJson){
                            errors[i] = responseJson[i][0];
                        }
                        if(responseJson.hasOwnProperty('non_field_errors')){
                        	errors['password']	= responseJson.non_field_errors;
                        }
                        this.setState({errors:errors})
                    	
                	}
                })
                .catch((error) => {
                    console.error(error);
                });

            }	
	}	

	render(){	

			if(this.state.redirectTo || this.state.isAuth) return <Redirect to='/dashboard'  />;
			var data = '';
			if(this.state.isRegister) {
				data =  <div class="alert alert-success">{this.state.isRegister}</div>;
			}
			return(
			
			<form >
				{data}
				<div class="form-group">
                    <label for="name">UserName:</label>
                    <input type="text" value={this.state.username} onChange={this.setUsername} class="form-control" id="name" placeholder="Enter name" />
                  <span style={{color: "#c53737"}}>{this.state.errors["username"]}</span>
                </div>
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password"  value={this.state.password} onChange={this.setPassword} class="form-control" id="email" placeholder="Enter password" />
                    <span style={{color: "#c53737"}}>{this.state.errors["password"]}</span>
                </div>

                <button onClick={this.handleSubmit} class="btn btn-success">Signin</button>
			</form>
		);
	}

}

export default Login