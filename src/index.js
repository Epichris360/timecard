import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import store from './stores'
import { Provider } from 'react-redux'
import { Switch, BrowserRouter as Router, Route  } from 'react-router-dom'
import { MainPage, CreateProject, NavBar } from './components/containers'

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
	This is the entry point of the React app with Redux
	already implemented. The Intro component is the 
	visual content and most likely, you will want 
	to remove it and replace with your own visual content.
* * * * * * * * * * * * * * * * * * * * * * * * * * * *
*/


const app = (
	<Provider store={store.configure(null)}>
			<div >
				<NavBar />
				<div className="container">
					<Switch>
						<Route exact path='/' component={MainPage} />
						<Route path="/new-project" component={CreateProject} />
						<Route path="/signin" component={MainPage} />
						<Route path="/signup" component={MainPage}/>
					</Switch>
				</div>
			</div>
	</Provider>
)


ReactDOM.render(app, document.getElementById('root'))