import React, { Component } from 'react'
import { connect }          from  'react-redux'
import { v4 }               from 'uuid'
import actions              from '../../actions'

class ProjectShow extends Component{
    constructor(props){
        super(props)
        this.state = {
            projectOrig:null, projectChange:null, loading: true, newTask:''
        }
    }
    componentDidMount(){
        //will have to change if srr
        const project = this.props.projects.filter(p => p.slug == this.props.match.params.slug)[0]
        this.setState({projectOrig:project, projectChange:project, loading:false})
    }
    submitTask(){
        let { projectChange, projectOrig } = this.state
        projectChange.tasks.push({task_id: v4(), name:this.state.newTask, times:[]})
        this.props.updateProject(projectOrig, projectChange)
        .then(data => {
            this.setState({ newTask:'', projectChange })
        })
        .catch(err => {
            console.log('err',err.message)
        })
    }
    render(){
        return(
            <div>
                {
                    this.state.loading ? <h1>Loading...</h1> :
                    <div>
                        <h1>{this.state.projectChange.name}</h1>
                        <hr/>
                        <p>
                            {this.state.projectChange.description}
                        </p>
                        <h4>Submit a New Task:</h4>
                        <hr/>
                        <div className="input-group">
                            <input type="text" placeholder="Add a New Task Name..." className="form-control"
                                    style={{width:'500px'}}
                                    onChange={ e => this.setState({newTask: e.target.value}) }/>
                            <button className="btn btn-success" style={{marginLeft:'10px'}}
                                onClick={this.submitTask.bind(this)}>Add the Task</button>
                        </div>
                        <hr/>
                        <h4>Tasks:</h4>
                        <ul className="list-group">
                            {
                                this.state.projectChange.tasks.map( (t,i) => {
                                    return(
                                        <li className="list-group-item">{ t.name }<span class="badge">{ t.times.length }</span></li>
                                    )
                                })
                            }
                        </ul>
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
        updateProject: (orig, updated) => dispatch(actions.updateProject(orig, updated))
    }
}

export default connect(mapStateToProps, dispatchToProps)(ProjectShow)