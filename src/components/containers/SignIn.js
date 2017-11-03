import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'
import Loader from './Loader'

class SignIn extends Component{
    constructor(props){
        super(props)
        this.state = {
            username:'',
            password:'',
            error: false,
            errorMessage:'',
            submitted: false
        }
    }
    loginUser(){
        const { username, password } = this.state
        this.setState({submitted:true})
        this.props.signIn({username:username,password:password})
        .then(response => {
            this.props.history.push('/')
            return
        })
        .catch(err => {
            this.setState({error: true, submitted:false, errorMessage: err.message})
            return
        })
    }
    render(){
        return(
            <div className="row">
                <div  >
                
                    {
                        this.state.submitted ? <Loader /> :
                        <div  className="col-xs-8 col-sm-8 col-md-8" >
                            {
                                this.state.error ? 
                                <div className="alert alert-danger">
                                    <strong>Danger!</strong> {this.state.errorMessage}
                                </div> : null
                            }
                            <h1 className="topmargin-sm nobottommargin">Sign In!</h1>
                            <hr/>
                            <input className="form-control" 
                                type="text" 
                                placeholder="username" 
                                onChange={ e => this.setState({username:e.target.value }) }
                            />
                            <br />
                            <input className="form-control" 
                                type="password" 
                                placeholder="password" 
                                onChange={ e => this.setState({password: e.target.value}) }
                            />
                            <br />
                            <button 
                                className="btn btn-lg btn-success"
                                onClick={ this.loginUser.bind(this) }
                            >Submit</button>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

const dispatchToProps = dispatch => {
    return{
        signIn: (credentials) => dispatch(actions.loginUser(credentials)),
        currentUser: () => dispatch(actions.currentUser()),
        allUsers: () => dispatch(actions.fetchUsers(null))
    }
}

export default connect(null,dispatchToProps)(SignIn)