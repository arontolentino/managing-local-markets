import React, { Component } from 'react';
import RBCLogo from '../components/logos/RBCLogo';

import firebase from '../config/firebase';

class Login extends Component {
	state = {};

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
			<div className="auth">
				<div className="wrapper">
					<div className="authForm">
						<div className="authFormLogo">
							<RBCLogo />
							<h1>Marketing Local Markets</h1>
							{/* <p>
								Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
								diam nonumy eirmod tempor.
							</p> */}
						</div>
						<form className="authForm">
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
				</div>
			</div>
		);
	}
}

export default Login;
