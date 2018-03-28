import React, { Component } from 'react';
import {Switch, Route, Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import params from './../config/config';

class MyEnrollments extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            deleteError:false,
            isAuth:localStorage.getItem('access_token'),
        
        };
    }
    clickFunction(id){
        
        if(confirm("Are you sure do delete this record!")) {   
            fetch(params.apiUrl + '/student_enroll_delete/' + id, {method: "DELETE"})
                    .then(res=>{
                       this.componentDidMount();
            })
            .catch(error=>{
                console.log("error", error);
            });
        }
    };
    componentDidMount(){
        fetch(params.apiUrl + '/studentenroll/'+localStorage.getItem('user_id'))
            .then(res => res.json())
            .then(res => {
            console.log(res.data);                  
                this.setState({
                    getData:res.data
                });
        });
    }
    render(){

        if(!this.state.isAuth) return <Redirect to='/login'  />;
        if(!this.state.getData) return <h2>Loading...</h2>
        return(
                
        <div>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Course Name</th>
                        <th>ACtion</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.getData.map(function(object, i){
                    
                    return <tr>
                        <td>{object.id}</td>
                        <td>{object.course_name}</td>
                        <td>
                        <span id={object.id} onClick={this.clickFunction.bind(this, object.id)} class="btn btn-danger btn-xs">Cancel Enrollment&nbsp;</span>
                        </td>
                    </tr>   
                }, this)}
                    
                           
                </tbody>
            </table>
        </div>           
        )
    }
}



export default MyEnrollments




