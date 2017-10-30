import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'

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
        this.props.createProject({name, description, user_id: this.props.user.id})
        .then(data => {
            console.log('data',data)
            this.props.history.push('/')
            return
        })
        .catch(err => {
            console.log('err',err.message)
        })
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
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { user } = state
    return{
        user
    }
}

const dispatchToProps = dispatch => {
    return{
        createProject: params => dispatch(actions.createProject(params))
    }
}


export default connect(mapStateToProps,dispatchToProps)(CreateProject)