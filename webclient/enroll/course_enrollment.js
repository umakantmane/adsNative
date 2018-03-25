import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


class CouserEnrollment extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            getData:{},
            errors:{},
            isChecked:true,
            redirectToCurd:false
        };
        
        this.setCourseName = this.setCourseName.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }
    
    setCourseName(e){ 
        this.setState({course_name:e.target.value});
    }
    
    setEnrollment(e){
        this.setState({
            isChecked: !this.state.isChecked,
        });
    }

    handleFormSubmit(e){
        e.preventDefault();
        
        if(this.validateForm()) {
            
           fetch('http://localhost:8000/enrollment?user_id=' + localStorage.getItem('user_id'), {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'authorization':'Token '+localStorage.getItem('access_token')
                    },
                    body: JSON.stringify({
                        course: this.props.match.params.id
                    })
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    let errors = {};
                    if(responseJson.hasOwnProperty('non_field_errors')){

                         errors['course_name'] = responseJson.non_field_errors[0];
                        this.setState({errors:errors})

                    } else if(!responseJson.hasOwnProperty('id')){
                        
                        for(var i in responseJson){
                            errors[i] = responseJson[i][0];
                        }
                        this.setState({errors:errors})
                    }else{

                      
                      this.setState({redirectoCrud:true}); 
                    } 
                    
                })
                .catch((error) => {
                    console.error(error);
                });
            
        }else console.log("bad")
    }
    
    validateForm(){
        let errors = {};
        let flag = true;
        if(!this.state.isChecked){
            errors['checkbox'] = "Please mark checkbox";
            flag = false;
        }
       
        this.setState({errors:errors});
        return flag;
    }
    
    componentDidMount(){
        fetch('http://localhost:8000/course/'+this.props.match.params.id)
          .then(res => res.json())
          .then(res => {
              console.log(res); 
              this.setState(res);
        });
    }
    handleChangeData(field,e){
        let fields = this.state.getData;
        fields[field] = e.target.value;
        this.setState(getData:fields);
    }
    
   render() {
        
        if(this.state.redirectToCurd) return <Redirect to='/course_enroll' />
        if(!this.state.getData) return <h2>Loading...</h2>
      return (
         <div>
            <form>
                <div class="form-group">
                    <label for="email">Course Name:</label>
                    <input type="text" class="form-control" id="name"  placeholder="Enter name" name="name" value={this.state.course_name} disabled/>
                    <span style={{color:"#c53737"}}>{this.state.errors['course_name']}</span>
                </div>
                <div class="form-group">
                    <label for="email">Course Desc:</label>
                    <textarea class="form-control" id="name" placeholder="Enter name" name="name" value={this.state.course_name} disabled/>
                </div>
                <div class="checkbox">
                    <label><input type="checkbox" checked={this.state.isChecked} onChange={this.setEnrollment.bind(this)} value={this.state.isEnroll}/></label>
                    <span style={{color:"#c53737"}}>{this.state.errors['checkbox']}</span>
                </div>

                <button onClick={this.handleFormSubmit} class="btn btn-warning">Enroll</button>
                </form>
         </div>
      );
   }
}
export default CouserEnrollment;