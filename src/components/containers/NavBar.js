import React, { Component }                            from 'react'
import { Link }                                        from 'react-router-dom'
import { connect }                                     from 'react-redux'
import actions                                         from '../../actions'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { LinkContainer }                               from 'react-router-bootstrap'


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
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link className="navbar-brand" to="/">TimeCard</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        {
                            this.props.user.id != '' ?  
                            <Nav>
                                <NavDropdown eventKey={1} title="Project Options" id="basic-nav-dropdown">
                                    <LinkContainer to="/projects">
                                        <MenuItem eventKey={1.1}>Projects</MenuItem>
                                    </LinkContainer>
                                    <LinkContainer to="/new-project">
                                        <MenuItem eventKey={1.2} href="/new-project">New Project</MenuItem>
                                    </LinkContainer>
                                </NavDropdown>
                            </Nav> : null
                        }
                        {
                            this.props.user.id == '' ?
                            <Nav pullRight>
                                <LinkContainer to="/signin">
                                    <NavItem eventKey={1}>Sign In</NavItem>
                                </LinkContainer>
                                <LinkContainer to="/signup">
                                    <NavItem eventKey={2}>Sign Up</NavItem>
                                </LinkContainer>
                            </Nav> :  <Nav pullRight>
                                <NavItem eventKey={1} onClick={this.logout.bind(this)} >Logout</NavItem>
                            </Nav>
                        }
                    </Navbar.Collapse>
                </Navbar>
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