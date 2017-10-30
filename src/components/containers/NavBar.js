import React, { Component } from 'react'
import { Link }             from 'react-router-dom'

class NavBar extends Component{
    render(){
        return(
            <div>
                <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <Link to="/" className="navbar-brand">TimeCard</Link>

                        </div>
                        <ul className="nav navbar-nav">
                            <li><Link to="/sigin">Sign In</Link></li>
                            <li><Link to="/signup">Sign Up</Link></li>

                        </ul>
                    </div>
                </nav>


            </div>
        )
    }
}

export default NavBar