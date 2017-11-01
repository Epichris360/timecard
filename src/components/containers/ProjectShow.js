import React, { Component } from 'react'
import { connect }          from  'react-redux'
import { v4 }               from 'uuid'
import actions              from '../../actions'
import { Accordion, Panel } from 'react-bootstrap'

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
        //times: { times_id: v4(), start: new Date().toString(), end:'', name:'' }
        let { projectChange, projectOrig } = this.state
        projectChange.tasks.push( {task_id: v4(), name:this.state.newTask, times:[], totalTime:0} )
        this.props.updateProject(projectOrig, projectChange)
        .then(data => {
            this.setState({ newTask:'', projectChange, projectOrig: projectChange })
        })
        .catch(err => {
            console.log('err',err.message)
        })
    }
    start(t){
        const time = { time_id:v4(), start:new Date().toString(), end:'' }
        let { projectChange, projectOrig } = this.state
        const newProjectChange = projectChange.tasks.map( task => {
            return(
                task.id == t.id ? this.timeStart(t,time) : task
            )
        })
        this.props.updateProject(projectOrig, newProjectChange)
        .then(data => {
            this.setState({projectChange: newProjectChange, projectOrig: newProjectChange})
        })
        .catch(err => {
            console.log('err',err.message)
        })
        
    }
    timeStart(t, time){
        t.times.push(time)
        return t
    }
    end(t){
        t.times[0].end = new Date().toString()
        let { projectChange, projectOrig } = this.state
        const total = Math.ceil( ( t.times[0].start.getTime() - t.times[0].end.getTime() ) / 60000 )
        t.totalTime = total
        const newProjectChange = projectChange.tasks.map( task => {
            return(
                task.id == t.id ? t : task
            )
        })
        this.props.updateProject(projectOrig, newProjectChange)
        .then(data => {
            this.setState({projectChange: newProjectChange, projectOrig: newProjectChange})
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
                        
                        <Accordion>
                            {
                                this.state.projectChange.tasks.map( (t,i) => {
                                    return(
                                        <Panel header={ `Task: ${t.name} | Total Time: ${t.totalTime}` } eventKey={i} key={i}>
                                            {
                                                t.times.length == 0 || t.times[0].start == '' ?
                                                    <button onClick={ this.start.bind(this, t) }
                                                    className="btn btn-success">Start</button> : 

                                                    <button onClick={ this.start.bind(this, t) }
                                                    className="btn btn-success">End</button>
                                            }
                                        </Panel>
                                    )
                                })
                            }
                        </Accordion>
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