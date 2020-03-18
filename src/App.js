import React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Submit from './pages/Submit';
import Success from './pages/Success';
import Submissions from './pages/Submissions';
import Edit from './pages/Edit';
import Notifications from './pages/Notifications';

function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route to="/login" exact component={Login} />
					<Route to="/register" exact component={Register} />

					<Route to="/dashboard" exact component={Dashboard} />

					<Route to="/submit" exact component={Submit} />
					<Route to="/submit/success" exact component={Success} />

					<Route to="/submissions" exact component={Submissions} />
					<Route to="/submissions/edit/:id" exact component={Edit} />

					<Route to="/notifications" exact component={Notifications} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
