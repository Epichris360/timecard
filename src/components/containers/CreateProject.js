import React, { Component } from 'react'

class CreateProject extends Component{
    constructor(props){
        super(props)
        this.state = {
            name:'', description:''
        }
    }
    createProject(){
        const { name, description } = this.state
        if( name == '' && description == '' ){
            throw 'error!'
        }
        console.log( {name, description} )
    }
    render(){
        return(
            <div className="container">  
                <h1>Create a New Project to Track!</h1>
                <hr/>
                <label htmlFor="">Name of the Project:</label>
                <input type="text" className="form-control" 
                placeholder="Name goes here...." onChange={e => this.setState({ name: e.target.value })}/>
                <label htmlFor="">A Short Description?:</label>
                <textarea className="form-control" cols="30" rows="10" placeholder="A Description would be nice"
                 onChange={e => this.setState({description: e.target.value})} ></textarea>
                <br/>
                <button className="btn btn-success btn-lg pull-right"
                        onClick={ this.createProject.bind(this) }>
                    Submit!
                </button>
                <button onClick={() => console.log('state',this.state)}>
                    this.state 
                </button>
            </div>
        )
    }
}

export default CreateProject