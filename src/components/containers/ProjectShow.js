import React, { Component } from 'react'
import { connect }          from  'react-redux'
import { v4 }               from 'uuid'
import actions              from '../../actions'
import { Accordion, Panel } from 'react-bootstrap'
import Loader               from './Loader'
import DangerAlert          from './DangerAlert'

let totalTimeTemp = 0
let tempTaskTime  = 0

class ProjectShow extends Component{
    constructor(props){
        super(props)
        this.state = {
            projectOrig:null, projectChange:null, loading: true, newTask:'', 
            blockName:'', error:false, errorMessage:''
        }
    }
    componentDidMount(){
        //will have to change if srr
        const project = this.props.projects.filter(p => p.slug == this.props.match.params.slug)[0]
        this.setState({projectOrig:project, projectChange:project, loading:false})
    }
    submitTask(){
        let { projectChange, projectOrig } = this.state
        projectChange.tasks.push( {task_id: v4(), name:this.state.newTask, times:[], totalTime:0} )
        this.props.updateProject(projectOrig, projectChange)
        .then(data => {
            this.setState({ newTask:'', projectChange, projectOrig: projectChange })
        })
        .catch(err => {
            //console.log('err',err.message)
            this.setState({error:true, errorMessage: err.message})
        })
    }
    updateBlockTime(task, time,which){
        //which can be start or end
        let { projectChange, projectOrig } = this.state
        const newTasks = projectChange.tasks.map( tk => {
            return(
                tk.task_id == task.task_id ? this.timesArray(task, time, which) : task
            )
        })
        projectChange.tasks = newTasks
        projectChange.projectTime = projectChange.projectTime + totalTimeTemp
        totalTimeTemp = 0
        this.props.updateProject(projectOrig, projectChange)
        .then(data => {
            this.setState({projectChange: projectChange, projectOrig: projectChange})
        })
        .catch(err => {
            //console.log('err',err.message)
            this.setState({error:true, errorMessage: err.message})
        })
    }
    timesArray(task, time, which){
        let newTimes = task.times.map( tm => {
            return (
                time.time_id == tm.time_id ? this.updateTime(time, which) : tm
            )
        })
        task.times = newTimes
        task.totalTime = task.totalTime + totalTimeTemp
        return task
    }
    updateTime(time,which){
        if(which == 'start'){
            time.start = new Date()
        }else if(which == 'end'){
            time.end = new Date()
            totalTimeTemp = this.calcTime(time.start, time.end)
        }
        return time
    }
    calcTime(start, end){
        var diff = Math.abs(new Date(end) - new Date(start))
        var minutes = Math.floor((diff/1000)/60);
        return minutes 
    }
    deleteTasks(){
        let { projectChange, projectOrig } = this.state
        projectChange.tasks = []
        projectChange.projectTime = 0
        this.props.updateProject(projectOrig, projectChange)
        .then(data => {
            this.setState({projectChange: projectChange, projectOrig: projectChange})
        })
        .catch(err => {
            //console.log('err',err.message)
            this.setState({error:true, errorMessage: err.message})
        })
    }
    createTaskBlock(t){
        const time = { time_id:v4(),name:this.state.blockName , start:'', end:'', disabled:false }
        let { projectChange, projectOrig } = this.state
        const newTasks = projectChange.tasks.map( task => {
            return(
                task.id == t.id ? this.timeStart(t,time) : task
            )
        })
        projectChange.tasks = newTasks
        this.props.updateProject(projectOrig, projectChange)
        .then(data => {
            this.setState({projectChange: projectChange, projectOrig: projectChange, blockName:''})
        })
        .catch(err => {
            //console.log('err',err.message)
            this.setState({error:true, errorMessage: err.message})
        })
    }
    timeStart(t, time){
        t.times.push(time)
        return t
    }
    /*disableTask(task){
        //disable a task and delete its time from the total time of the project
        //if enabled, add this back
        //design a nice front page.
        let { projectChange, projectOrig } = this.state
        let newTasks = projectChange.tasks.map( t => {
            return(
                t.task_id == task.task_id ? findTaskDisable(t) : t 
            )
        })
        projectChange.tasks = newTasks
        projectChange.projectTime = projectChange.projectTime - tempTaskTime
    }*/
    findTaskDisable(t){
        t.disabled = true
        tempTaskTime = t.totalTime
        return t
    }
    disablingSubTask(t, time){
        const durationOfSubTask = this.calcTime(time.start, time.end)
        const { projectChange, projectOrig } = this.state

        let tasksIndex = projectChange.tasks.map( task => task.task_id ).indexOf( t.task_id )
        let subtaskIndex =  projectChange.tasks[tasksIndex].times.map( subtask => subtask.time_id ).indexOf(time.time_id)
        
        projectChange.tasks[tasksIndex].times[subtaskIndex] = this.disableSubTask(time, true)
        projectChange.projectTime = projectChange.projectTime - durationOfSubTask

        this.props.updateProject(projectOrig, projectChange)
        .then(data => {
            this.setState({projectChange: projectChange, projectOrig: projectChange})
        })
        .catch(err => {
            //console.log('err',err.message)
            this.setState({error:true, errorMessage: err.message})
        })   
    }
    enableSubTask(t,time){
        const durationOfSubTask = this.calcTime(time.start, time.end)
        const { projectChange, projectOrig } = this.state

        let tasksIndex = projectChange.tasks.map( task => task.task_id ).indexOf( t.task_id )
        let subtaskIndex =  projectChange.tasks[tasksIndex].times.map( subtask => subtask.time_id ).indexOf(time.time_id)
        
        projectChange.tasks[tasksIndex].times[subtaskIndex] = this.disableSubTask(time, false)
        projectChange.projectTime = projectChange.projectTime + durationOfSubTask

        this.props.updateProject(projectOrig, projectChange)
        .then(data => {
            this.setState({projectChange: projectChange, projectOrig: projectChange})
        })
        .catch(err => {
            //console.log('err',err.message)
            this.setState({error:true, errorMessage: err.message})
        })   
    }
    disableSubTask(tm, which){
        if( which == true ){
            tm.disabled = true
            return tm
        }else{
            tm.disabled = false
            return tm
        }
    }
    render(){
        return(
            <div className="container" >
                <div className="container">
                    {
                        this.state.loading ? <Loader /> :
                        <div>
                            <div className="row">
                                <DangerAlert error={this.state.error} errorMessage={this.state.errorMessage} />
                                <div className="col-md-6 col-sm-6 col-xs-12">
                                    <h1>{this.state.projectChange.name}</h1>
                                </div>
                                <div className="col-md-6 col-sm-6 col-xs-12" >
                                    <h5 style={{float:'right'}} >
                                        Project Time: { Math.floor(this.state.projectChange.projectTime / 60) } Hours 
                                        and {this.state.projectChange.projectTime % 60} minutes
                                    </h5>
                                </div>
                            </div>
                            
                            <hr/>
                            <p>
                                {this.state.projectChange.description}
                            </p>
                            
                            <hr/>
                            <div className="row">
                                <div className="col-md-12 col-sm-12 col-xs-12">
                                    <h4>Submit a New Task:</h4>
                                    <input type="text" placeholder="Add a New Task Name..." 
                                            className="form-control"
                                            onChange={ e => this.setState({newTask: e.target.value}) } value={this.state.newTask}/>
                                    <br />
                                    <button className="btn btn-success col-md-4 col-sm-4 col-xs-4"
                                        onClick={this.submitTask.bind(this)}>Add the Task</button>
                                </div>
                            </div>
                            <hr/>
                            <h4>Tasks:</h4>
                            
                            <Accordion>
                                {
                                    this.state.projectChange.tasks.map( (t,i) => {
                                        return(
                                            <Panel header={ `Task: ${t.name} | Total Time: ${t.totalTime}` } eventKey={i} key={i}>
                                                <div className="row">
                                                    <div className="col-md-12 col-sm-12 col-xs-12">
                                                        <div className="col-md-6 col-sm-6">
                                                            <input type="text" placeholder="Name this block of Time!" value={this.state.blockName}
                                                                className="form-control"  onChange={e=>this.setState({blockName:e.target.value})}  />
                                                        </div>
                                                        <button className="btn btn-success col-md-4 col-sm-4 col-xs-12" onClick={ this.createTaskBlock.bind(this,t) }>Create!</button>
                                                    </div>
                                                </div>
                                                <br/>
                                                {
                                                    t.times != [] ? <span>Blocks of Time:</span> : null
                                                }
                                                <ul className="row list-group">
                                                    {
                                                        t.times.map( (time,i) => {
                                                            return(
                                                                <li className="list-group-item col-xs-12" key={i}>
                                                                    <span>{time.name}</span>
                                                                    {
                                                                        time.start == '' ? 
                                                                        <button onClick={ this.updateBlockTime.bind(this ,t ,time, 'start') }
                                                                            style={{width:'150px'}}
                                                                            className="btn btn-success btn-xs pull-right">Start
                                                                        </button> : time.end == '' ?
                                                                        <button onClick={ this.updateBlockTime.bind(this ,t ,time, 'end') }
                                                                            style={{width:'150px'}}
                                                                            className="btn btn-success btn-xs pull-right">End
                                                                        </button> : !time.disabled ?
                                                                        <button onClick={ this.disablingSubTask.bind(this, t, time) } 
                                                                            style={{width:'150px'}}
                                                                            className="btn btn-danger btn-xs pull-right" >
                                                                            Remove?
                                                                        </button> : 
                                                                        <button className="btn btn-danger btn-xs pull-right"
                                                                                onClick={ this.enableSubTask.bind(this, t, time) } >
                                                                            Enable?
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