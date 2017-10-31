import React, { Component } from 'react'
import { Link }             from 'react-router-dom'
import { connect }          from 'react-redux'
import actions              from '../../actions'


class NavBar extends Component{
    constructor(props){
        super(props)
    }
    logout(){
        this.props.logout()
        this.props.history.push('/')
    }
    render(){
        return(
            <div>
                <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <li><Link className="navbar-brand" to="/">TimeCard</Link></li>
                        </div>
                        <ul className="nav navbar-nav">
                            {
                            this.props.user.id != ''  ? 
                                <ul className="nav navbar-nav navbar-right">
                                    <li><Link to="" onClick={this.logout.bind(this)} >Logout</Link></li>
                                    <li><Link to="/projects">Projects</Link></li>
                                    <li><Link to="/new-project">New Project</Link></li>
                                </ul> : 
                                <ul className="nav navbar-nav navbar-right">
                                    <li><Link to="/signin">Sign In</Link></li>
                                    <li><Link to="/signup">Sign Up</Link></li>
                                </ul>
                            }
                        </ul>
                    </div>
                </nav>

                


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
        logout: () => dispatch(actions.logoutUser())
    }
}

export default connect(mapStateToProps,dispatchToProps)(NavBar)