import React, { Component } from 'react';

class View extends Component{
    
        constructor(props){
            super(props);
            this.state = {
               data:{}
            };
        }
        componentDidMount(){
            
            fetch("http://localhost:8000/course/"+this.props.match.params.id)
                    .then((res)=>res.json())
                    .then((res)=>{
                    
                    console.log(res);
                    this.setState({data:res});
                    
            });
        }
	render(){
             if(!this.state.data) return <h2>Loading...</h2>;
		return(
			<div>
                <ul class="list-group">
                <li class="list-group-item">ID: {this.state.data.id}</li>
                <li class="list-group-item">Course Name: {this.state.data.course_name}</li>
                <li class="list-group-item">Course Desc: {this.state.data.course_desc}</li>
                <li class="list-group-item">created Date: {this.state.data.created_at}</li>
                </ul>
            </div>
        );
	}
}

export default View