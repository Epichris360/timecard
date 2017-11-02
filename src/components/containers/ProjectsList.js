import React, { Component } from 'react'
import { connect }          from 'react-redux'
import actions              from '../../actions'
import { Link }             from 'react-router-dom'
import Loader               from './Loader'


class ProjectsList extends Component{
    constructor(props){
        super(props)
        this.state = {
            projects:[], loading: true
        }
    }
    componentDidMount(){
        this.props.getProjects({user_id: this.props.user.id})
        .then(data => {
            this.setState({ loading:false})
        })
        .catch(err => {
            console.log('err',err.message)
        })
    }
    render(){
        return(
            <div>
                <h1>My Projects:</h1>
                <hr/>
                {
                    this.state.loading ? <h1>Loading....</h1>  :
                    <div className="row">
                        {
                            this.props.projects.map( (p,i) => {
                                return(
                                    <div key={i} className="col-md-4 card" style={{width: '340px', padding:'10px', border:'1px solid black', margin:'10px'}}>
                                        <div style={{ width:318, height:180, backgroundColor:p.color }}>
                                            <h1 className="text-center" style={{color:'white',padding:40}}>{p.name}</h1>
                                        </div>
                                        <div className="card-block">
                                            <h4 className="card-title">{p.name}</h4>
                                            <p className="card-text">{p.description.substr(0,40) + '....'}</p>
                                            <Link to={`/project/${p.slug}`} className="btn btn-primary">Info</Link>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                }
                <br/>
                
                <button onClick={() => console.log('this.props.projects',this.props.projects)}>
                    this.props.projects
                </button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { user, projects } = state
    return{
        user, projects
    }
}

const dispatchToProps = dispatch => {
    return{
        getProjects: (params) => dispatch(actions.getProjects(params))
    }
}

export default connect(mapStateToProps, dispatchToProps)(ProjectsList)