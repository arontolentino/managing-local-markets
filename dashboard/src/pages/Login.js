import React, { Component } from 'react';

import firebase from '../config/firebase';

import Header from '../components/Header';

class Login extends Component {
	state = {};

	onLogin = e => {
		e.preventDefault();

		const { email, password } = this.state;

		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(() => {
				this.setState({});
				this.props.history.push('/submissions');
				console.log('User is now signed in!');
			})
			.catch(error => {
				console.log(error);
			});
	};

	onInputValueChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	render() {
		return (
			<div className="login">
				<Header />
				<main className="main">
					<div className="wrapper">
						<div className="intro">
							<h1>Managing Local Markets</h1>
							<h2>Sign In</h2>
							<p>Welcome to MLM. Please sign in to access your dashboard.</p>
						</div>
						<div className="auth">
							<form className="authForm">
								<input
									type="email"
									id="email"
									placeholder="Enter your email address"
									onChange={this.onInputValueChange}
								/>
								<input
									type="password"
									id="password"
									placeholder="Enter your password"
									onChange={this.onInputValueChange}
								/>
								<p className="authMessage">
									<a href="#/login">Forgot your password?</a>
								</p>

								<button className="authBtn" onClick={this.onLogin}>
									Sign In
								</button>
							</form>
						</div>
					</div>
				</main>
			</div>
		);
	}
}

export default Login;
