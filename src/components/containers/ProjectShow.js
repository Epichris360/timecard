import React, { Component } from 'react'
import { connect }          from  'react-redux'

class ProjectShow extends Component{
    constructor(props){
        super(props)
        this.state = {
            projectOrig:null, projectChange:null, loading: true
        }
    }
    componentDidMount(){
        //will have to change if srr
        const project = this.props.projects.filter(p => p.slug == this.props.match.params.slug)[0]
        this.setState({projectOrig:project, projectChange:project, loading:false})
    }
    render(){
        return(
            <div>
                {
                    this.state.loading ? <h1>Loading...</h1> :
                    <div>
                        <h1>{this.state.projectOrig.name}</h1>
                        <hr/>
                        <p>
                            {this.state.projectOrig.description}
                        </p>
                        <h4>Tasks:</h4>
                    </div>
                }
            </div>
        )
    } 
}

const mapStateToProps = state => {
    const { projects } = state
    return{
        projects
    }
}

const dispatchToProps = dispatch => {
    return{

    }
}

export default connect(mapStateToProps, dispatchToProps)(ProjectShow)