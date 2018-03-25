import React, { Component } from 'react';
import {Switch, Route, Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';


class Enrolle extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            deleteError:false,
            isAuth:localStorage.getItem('access_token'),
        
        };
    }
    componentDidMount(){
        fetch('http://localhost:8000/course')
            .then(res => res.json())
            .then(res => {                  
                this.setState({
                    getData:res
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
                      
                        <th>CourseName</th>
                        <th>Create Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.getData.map(function(object, i){
                    
                    return <tr>
                     
                        <td>{object.course_name}</td>
                        <td>{object.created_at}</td>
                        <td>
                        <span><Link to={'/course_enrollment/'+object.id} target="_blank" class="btn btn-warning btn-xs">Enroll for this course&nbsp;</Link></span>
                        </td>
                    </tr>   
                }, this)}
                    
                           
                </tbody>
            </table>
        </div>           
        )
    }
}



export default Enrolle




