import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import params from './../config/config';

class CreateCourse extends Component{
	constructor(props){
            super(props);
            this.state = {
                errors:{},
                redirectoCrud:false
            };
            this.setCourseName = this.setCourseName.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
	}
	setCourseName(event){
            this.setState({course_name:event.target.value});
	}
    setCourseDesc(event){
     this.setState({course_desc:event.target.value});   
    }
	   
    handleFormValidation(){
        
        let fields = this.state;
        let isValid = true;
        let errors = {};
        
        if(fields.course_name === undefined || fields.course_name === ''){
            errors['course_name'] = "Username cannot be blank!";
            isValid = false;
        }
        if(fields.course_desc === undefined || fields.course_desc === ''){
            errors['course_desc'] = "Course desc cannot be blank!";
            isValid = false;
        }
       
        this.setState({errors:errors});
        return isValid;
    }
    
	handleSubmit(event){
             event.preventDefault();
            if(this.handleFormValidation()){

                fetch(params.apiUrl + '/course', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        course_name: this.state.course_name,
                        course_desc: this.state.course_desc
                    })
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    if(!responseJson.hasOwnProperty('id')){
                        let errors = {};
                        for(var i in responseJson){
                            errors[i] = responseJson[i][0];
                        }
                        this.setState({errors:errors})
                    }else 
                    this.setState({redirectoCrud:true});
                })
                .catch((error) => {
                    console.error(error);
                });
            }
	}
	render(){

		if(this.state.redirectoCrud)
          return <Redirect to='/course_list'  />;
		return (
                        
         <div>
            <form >
                <div class="form-group ">
                    <label for="name">CourseName:</label>
                    <input type="text" value={this.state.course_name} onChange={this.setCourseName} class="form-control" id="name" placeholder="Enter name" />
                     <span style={{color: "#c53737"}}>{this.state.errors["course_name"]}</span>
                </div>
                <div class="form-group">
                    <label for="email">Course Desc:</label>
                    <textarea class="form-control" id="name" onChange={this.setCourseDesc.bind(this)} placeholder="Enter name" name="name" value={this.state.course_desc} />
                    <span style={{color: "#c53737"}}>{this.state.errors["course_desc"]}</span>
                </div>              	
                <button onClick={this.handleSubmit} class="btn btn-success">Submit</button>
                </form>
         </div>
      );

	}
}


export default CreateCourse