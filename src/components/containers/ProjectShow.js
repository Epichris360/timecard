import React, { Component } from 'react'
import { connect }          from  'react-redux'
import { v4 }               from 'uuid'
import actions              from '../../actions'
import { Accordion, Panel } from 'react-bootstrap'
import Loader               from './Loader'

class ProjectShow extends Component{
    constructor(props){
        super(props)
        this.state = {
            projectOrig:null, projectChange:null, loading: true, newTask:'', blockName:''
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
    start(t, time){
        //completly re work this!
        console.log('t, time',t,time)
        let { projectChange, projectOrig } = this.state
        /*const newTimes = projectChange.times.map( time => {
            console.log('')
            return(
                time.time_id == t.time_id ? this.timesNew(t,time) : time
            )
        })
        projectChange.times = newTimes*/
        
        /*this.props.updateProject(projectOrig, newProjectChange)
        .then(data => {
            console.log('data',data)
            this.setState({projectChange: newProjectChange, projectOrig: newProjectChange})
        })
        .catch(err => {
            console.log('err',err.message)
        })*/
    }
    timesNew(t, time){
        
    }
    end(t){
        /*t.times[0].end = new Date()
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
        })*/
        
    }
    deleteTasks(){
        let { projectChange, projectOrig } = this.state
        //loop and set tasks array to []
        projectChange.tasks = []
        console.log('projectChange',projectChange)
        this.props.updateProject(projectOrig, projectChange)
        .then(data => {
            console.log('done!')
            this.setState({projectChange: projectChange, projectOrig: projectChange})
        })
        .catch(err => {
            console.log('err',err.message)
        })
    }
    createTaskBlock(t){
        const time = { time_id:v4(),name:this.state.blockName , start:'', end:'' }
        let { projectChange, projectOrig } = this.state
        const newProjectChange = projectChange.tasks.map( task => {
            return(
                task.id == t.id ? this.timeStart(t,time) : task
            )
        })
        projectChange.tasks = newProjectChange
        this.props.updateProject(projectOrig, newProjectChange)
        .then(data => {
            this.setState({projectChange: projectChange, projectOrig: projectChange, blockName:''})
        })
        .catch(err => {
            console.log('err',err.message)
        })
    }
    timeStart(t, time){
        t.times.push(time)
        return t
    }
    render(){
        return(
            <div>
                {
                    this.state.loading ? <h1>Loading....</h1> :
                    <div>
                        <h1>{this.state.projectChange.name}</h1>
                        <hr/>
                        <p>
                            {this.state.projectChange.description}
                        </p>
                        
                        <hr/>
                        <h4>Submit a New Task:</h4>
                        <div className="input-group">
                            <input type="text" placeholder="Add a New Task Name..." className="form-control"
                                    style={{width:'500px'}}
                                    onChange={ e => this.setState({newTask: e.target.value}) } value={this.state.newTask}/>
                            <button className="btn btn-success" style={{marginLeft:'10px', width:'300px' }}
                                onClick={this.submitTask.bind(this)}>Add the Task</button>
                        </div>
                        <hr/>
                        <h4>Tasks:</h4>
                        
                        <Accordion>
                            {
                                this.state.projectChange.tasks.map( (t,i) => {
                                    return(
                                        <Panel header={ `Task: ${t.name} | Total Time: ${t.totalTime}` } eventKey={i} key={i}>
                                            <div className="input-group">
                                                <input type="text" placeholder="Name this block of Time!" value={this.state.blockName}
                                                    className="form-control" style={{width:'450px'}} onChange={e=>this.setState({blockName:e.target.value})}  />
                                                <button className="btn btn-success" style={{marginLeft:'10px',width:'300px'}} onClick={ this.createTaskBlock.bind(this,t) }>Create!</button>
                                            </div>
                                            <br/>
                                            <ul className="list-group">
                                                {
                                                    t.times.map( (time,i) => {
                                                        return(
                                                            <li className="list-group-item" key={i}>
                                                                <span>{time.name}</span>
                                                                {
                                                                    time.start == '' ? 
                                                                    <button onClick={ this.start.bind(this ,t ,time) }
                                                                        style={{width:'150px'}}
                                                                        className="btn btn-success btn-xs pull-right">Start
                                                                    </button> : 
                                                                    <button onClick={ this.end.bind(this ,t ,time) }
                                                                        style={{width:'150px'}}
                                                                        className="btn btn-success btn-xs pull-right">End
                                                                    </button>
                                                                }
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </Panel>
                                    )
                                })
                            }
                        </Accordion>
                        {/*
                            <button onClick={this.deleteTasks.bind(this)}>
                                delete tasks
                            </button>*/
                        }
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