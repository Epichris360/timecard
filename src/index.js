import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import store from './stores'
import { Provider } from 'react-redux'
import { Switch, BrowserRouter as Router, Route  } from 'react-router-dom'
import { MainPage, CreateProject, NavBar, SignIn, SignUp } from './components/containers'

const app = (
	<Provider store={store.configure(null)}>
		<Router>
			<div >
				<NavBar />
				<div className="container">
					<Switch>
						<Route exact path='/' component={MainPage} />
						<Route path="/new-project" component={CreateProject} />
						<Route path="/signin" component={SignIn} />
						<Route path="/signup" component={SignUp}/>
					</Switch>
				</div>
			</div>
		</Router>
	</Provider>
)


ReactDOM.render(app, document.getElementById('root'))