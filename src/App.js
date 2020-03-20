import React, { Component } from 'react';
import './App.css';

import firebase from './config/firebase';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Submit from './pages/Submit';
import Success from './pages/Success';
import Submissions from './pages/Submissions';
import Edit from './pages/Edit';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import ImageCapture from './pages/ImageCapture';
import Splash from './pages/Splash';

class App extends Component {
	state = {
		user: null,

		userDetails: {}
	};

	componentDidMount() {
		this.initApp();
	}

	initApp = () => {
		const auth = firebase.auth();

		// Firebase Auth listener
		auth.onAuthStateChanged(user => {
			if (user) {
				this.setState({ user: user.uid }, () => {
					this.getUserDetails();
				});
			}
		});
	};

	getUserDetails = () => {
		const db = firebase.firestore();

		console.log(this.state.user);

		db.collection('users')
			.doc(this.state.user)
			.get()
			.then(doc => {
				console.log(doc.data());
				console.log('Got user details');

				this.setState({ userDetails: doc.data() });
			});
	};

	render() {
		return (
			<div className="App">
				<Router>
					<Route path="/" exact component={Splash} />

					<Route path="/login" exact component={Login} />
					<Route
						path="/register"
						exact
						render={() => <Register user={this.state.user} />}
					/>

					<Route
						path="/dashboard"
						exact
						render={() => (
							<Dashboard firstName={this.state.userDetails.firstName} />
						)}
					/>

					<Route path="/submit" exact component={Submit} />
					<Route path="/submit/success" exact component={Success} />

					<Route path="/camera" exact component={ImageCapture} />

					<Route path="/submissions" exact component={Submissions} />
					<Route path="/submissions/edit/:id" exact component={Edit} />

					<Route path="/notifications" exact component={Notifications} />

					<Route path="/settings" exact component={Settings} />
				</Router>
			</div>
		);
	}
}

export default App;
