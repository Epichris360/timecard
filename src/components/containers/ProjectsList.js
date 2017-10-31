import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'

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
            console.log('data',data)
            this.setState({projects:data, loading:false})
        })
        .catch(err => {
            console.log('err',err.message)
        })
    }
    render(){
        return(
            <div>
                My Projects:
                <hr/>
                {
                    this.state.loading ? <h1>Loading.....</h1> :
                    <div>
                        {
                            this.state.projects.map( (p,i) => {
                                return(
                                    <div key={i} className="card" style={{width: '340px', padding:'10px', border:'1px solid black'}}>
                                        <img className="card-img-top" src={`http://via.placeholder.com/318x180?text=${p.name.split(' ').join('+')}`} alt="Card image cap"/>
                                        <div className="card-block">
                                            <h4 className="card-title">Card title</h4>
                                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                            <a href="#" className="btn btn-primary">Go somewhere</a>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                }
                <br/>
                
                
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
        getProjects: (params) => dispatch(actions.getProjects(params))
    }
}

export default connect(mapStateToProps, dispatchToProps)(ProjectsList)