import React, { Component } from 'react';
import {Switch, Route, Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import params from './../config/config';

class Index extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            deleteError:false,
            isAuth:localStorage.getItem('access_token'),
        
        };
    }
    clickFunction(id){
        
        if(confirm("Are you sure do delete this record!")) {   
            fetch(params.apiUrl + '/course/' + id, {method: "DELETE"})
                    .then(res=>{
                       this.componentDidMount();
            })
            .catch(error=>{
                console.log("error", error);
            });
        }
    };
    componentDidMount(){
        fetch(params.apiUrl + '/course')
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
            <Link to={'/create_course'} class='btn btn-success btn-sm' >Create</Link><p></p>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Course Name</th>
                        <th>Course Desc</th>
                        <th>Create Date</th>
                        <th>ACtion</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.getData.map(function(object, i){
                    
                    return <tr>
                        <td>{object.id}</td>
                        <td>{object.course_name}</td>
                        <td>{object.course_desc}</td>
                        <td>{object.created_at}</td>
                        <td>
                        <span><Link to={'/course_update/'+object.id} class="btn btn-warning btn-xs">UPDATE&nbsp;</Link></span>&nbsp;
                        <span><Link to={'/course_view/'+object.id} class="btn btn-info btn-xs">VIEW&nbsp;</Link></span>&nbsp;
                        <span id={object.id} onClick={this.clickFunction.bind(this, object.id)} class="btn btn-danger btn-xs">DELETE&nbsp;</span>
                        </td>
                    </tr>   
                }, this)}
                    
                           
                </tbody>
            </table>
        </div>           
        )
    }
}



export default Index




