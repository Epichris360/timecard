import React, { Component } from 'react'
import { connect }          from 'react-redux'
import actions              from '../../actions'
import Loader               from './Loader'

class CreateProject extends Component{
    constructor(props){
        super(props)
        this.state = {
            name:'', description:'', color:'#80a7e5', submitted:false
        }
    }
    createProject(){
        const { name, description, color } = this.state
        if( name == '' && description == '' ){
            throw 'error!'
        }

        this.props.createProject({name, description, color,user_id: this.props.user.id, 
                slug:name.split(' ').join('+'),tasks:[],projectTime:0})
        .then(data => {
            this.setState({submitted:true})
            this.props.history.push('/projects')
            return
        })
        .catch(err => {
            console.log('err',err.message)
        })
    }
    render(){
        return(
            <div className="container" style={{paddingBottom:'20px'}}>
                <h1>Create a New Project to Track!</h1>
                <hr/>
                <label htmlFor="">Name of the Project:</label>
                <input type="text" className="form-control" 
                placeholder="Name goes here...." onChange={e => this.setState({ name: e.target.value })}/>
                <label htmlFor="">A Short Description?:</label>
                <textarea className="form-control" cols="30" rows="10" placeholder="A Description would be nice"
                 onChange={e => this.setState({description: e.target.value})} ></textarea>
                <br/>
                <h4>Pick a Color for Your Projects Color:</h4>
                <input type="color"  onChange={e => this.setState({color: e.target.value})}/>
                <hr />
                    <div style={{ width:318, height:180, backgroundColor:this.state.color }}>
                        <h1 className="text-center" style={{ color:'white' ,padding:40}}>{this.state.name}</h1>
                    </div>
                <hr />
                {
                    this.state.submitted ? <Loader /> :
                    <button className="btn btn-success btn-lg pull-right"
                        onClick={ this.createProject.bind(this) }>
                        Submit!
                    </button>
                }
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