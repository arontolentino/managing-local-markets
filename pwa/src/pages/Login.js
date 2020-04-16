import React, { Component } from 'react';
import RBCLogo from '../components/logos/RBCLogo';

import firebase from '../config/firebase';

class Login extends Component {
	state = {
		error: null
	};

	// Log in existing user
	onLogin = e => {
		e.preventDefault();

		const { email, password } = this.state;

		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(() => {
				this.setState({});
				this.props.history.push('/dashboard');
				console.log('User is now signed in!');
			})
			.catch(error => {
				this.setState({ error: error.message });
			});
	};

	onInputValueChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	render() {
		return (
			<div className="auth">
				<div className="wrapper">
					<div className="authForm">
						<div className="authFormLogo">
							<RBCLogo className="authLogo" />
							<h1>Managing Local Markets</h1>
							<p>What’s happening in your neighbourhood?</p>
						</div>
						<form className="authForm">
							{this.state.error ? (
								<p className="authError">{this.state.error}</p>
							) : null}
							<input
								type="email"
								id="email"
								placeholder="Email Address"
								onChange={this.onInputValueChange}
							/>
							<input
								type="password"
								id="password"
								placeholder="Password"
								onChange={this.onInputValueChange}
							/>
							<button className="authBtn" onClick={this.onLogin}>
								Login
							</button>
							<p className="authMessage">
								<a href="#/login">Forgot your password?</a>
							</p>
						</form>
					</div>
					<div className="authFooter">
						<p>All rights reserved © RBC 2020</p>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;
