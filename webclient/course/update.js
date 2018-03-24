import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


class UpdateCouser extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            getData:{},
            errors:{},
            redirectToCurd:false
        };
        
        this.setCourseName = this.setCourseName.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }
    
    setCourseName(e){ 
        this.setState({course_name:e.target.value});
    }
    
    handleFormSubmit(e){
        e.preventDefault();
        
        if(this.validateForm()) {
            
            fetch('http://localhost:8000/course/'+this.props.match.params.id+'/',{
            method:'PUT',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                course_name:this.state.course_name
            })
            })
                    .then((res)=>res.json())
                    .then((res) => {
                        
                        if(!res.hasOwnProperty('id')) {
                            let errors = {};
                            
                        for(var key in res){
                            errors[key] = res[key][0];
                        }
                        this.setState({errors:errors});
                        }
                        else {
                             this.setState({redirectToCurd:true});
                        }     
            }).catch((error)=>{
                console.log("error", error);
            });
            
        }else console.log("bad")
    }
    
    validateForm(){
        let errors = {};
        let flag = true;
        if(this.state.course_name == undefined || this.state.course_name == ''){
            errors['course_name'] = "course name cannot be blank!";
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
        
        if(this.state.redirectToCurd) return <Redirect to='/course_list' />
        if(!this.state.getData) return <h2>Loading...</h2>
      return (
         <div>
            <form>
                <div class="form-group">
                    <label for="email">UserName:</label>
                    <input type="text" class="form-control" id="name" onChange={this.setCourseName} placeholder="Enter name" name="name" value={this.state.course_name} />
                    <span style={{color:"#c53737"}}>{this.state.errors['course_name']}</span>
                </div>
                <button onClick={this.handleFormSubmit} class="btn btn-warning">Update</button>
                </form>
         </div>
      );
   }
}
export default UpdateCouser;