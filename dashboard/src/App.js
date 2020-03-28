import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Submissions from './pages/Submissions';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Login from './pages/Login';

import firebase from './config/firebase';

class App extends Component {
	state = {
		user: null,
		userDetails: { email: '' }
	};

	componentDidMount() {
		this.initApp();
	}

	auth = firebase.auth();
	db = firebase.firestore();

	initApp = () => {
		this.auth.onAuthStateChanged(user => {
			if (user) {
				this.setState({ user: user.uid }, () => {
					this.getUserDetails();
				});
			}
		});
	};

	getUserDetails = () => {
		this.db
			.collection('users')
			.doc(this.state.user)
			.get()
			.then(doc => {
				this.setState({ userDetails: doc.data() });
			});
	};

	render() {
		return (
			<div className="App">
				<Router>
					<Route exact path="/">
						<Redirect to="/login" />
					</Route>

					<Route path="/login" exact component={Login} />
					<Route
						path="/submissions"
						exact
						render={() => (
							<Submissions userEmail={this.state.userDetails.email} />
						)}
					/>
				</Router>
			</div>
		);
	}
}

export default App;
