import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';

import './App.css';

import firebase from './config/firebase';

import { Route } from 'react-router-dom';

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
		userDetails: {},
		photoFile: null,
		photoBase64: null
	};

	componentDidMount() {
		this.initApp();
	}

	onPhotoUpload = e => {
		const reader = new FileReader();
		const file = e.target.files[0];

		reader.onloadend = () => {
			this.setState(
				{
					photoFile: file,
					photoBase64: reader.result
				},
				() => {
					this.props.history.push('/dashboard/submit');
				}
			);
		};

		reader.readAsDataURL(file);
	};

	initApp = () => {
		const auth = firebase.auth();

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

		db.collection('users')
			.doc(this.state.user)
			.get()
			.then(doc => {
				this.setState({ userDetails: doc.data() });
			});
	};

	render() {
		return (
			<div className="App">
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
						<Dashboard
							firstName={this.state.userDetails.firstName}
							onPhotoUpload={this.onPhotoUpload}
						/>
					)}
				/>

				<Route
					path="/dashboard/submit"
					exact
					render={() => (
						<Submit
							photoBase64={this.state.photoBase64}
							userDetails={this.state.userDetails}
						/>
					)}
				/>
				<Route path="/dashboard/submit/success" exact component={Success} />

				<Route path="/camera" exact component={ImageCapture} />

				<Route path="/submissions" exact component={Submissions} />
				<Route path="/submissions/edit/:id" exact component={Edit} />

				<Route path="/notifications" exact component={Notifications} />

				<Route path="/settings" exact component={Settings} />
			</div>
		);
	}
}

export default withRouter(App);
