import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import store from './stores'
import { Provider } from 'react-redux'
import { Switch, BrowserRouter as Router, Route  } from 'react-router-dom'
import { MainPage, CreateProject, NavBar, 
		SignIn, SignUp, ProjectsList, ProjectShow, Loader } from './components/containers'

const app = (
	<Provider store={store.configure(null)}>
		<Router>
			<div >
				<NavBar />
				<div>
					<Switch>
						<Route exact path='/' 	     component={MainPage} />
						<Route path="/new-project"   component={CreateProject} />
						<Route path="/projects"      component={ProjectsList} />
						<Route path="/signin"        component={SignIn} />
						<Route path="/signup"        component={SignUp}/>
						<Route path="/project/:slug" component={ProjectShow} />
					</Switch>
				</div>
			</div>
		</Router>
	</Provider>
)


ReactDOM.render(app, document.getElementById('root'))