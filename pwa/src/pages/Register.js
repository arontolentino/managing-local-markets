import React, { Component } from 'react';
import RBCLogo from '../components/logos/RBCLogo';

import { withRouter } from 'react-router-dom';

import firebase from '../config/firebase';

class Register extends Component {
	state = {
		user: null,
		name: null,
		email: null,
		password: null,
		market: null,
		region: null,
	};

	// VARIABLES
	db = firebase.firestore();
	auth = firebase.auth();

	// INPUT EVENT LISTENER
	onInputValueChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value,
		});
	};

	// REGISTER USER
	onRegister = (e) => {
		e.preventDefault();

		// 1. Check if transit details are available
		this.db
			.collection('banks')
			.where('transit', '==', parseInt(this.state.transit))
			.get()
			.then((querySnapshot) => {
				if (querySnapshot.empty) {
					console.error('Entered transit number does not exist!!');
				} else {
					querySnapshot.forEach((doc) => {
						this.setState(
							{
								market: doc.data().market,
								region: doc.data().region,
							},
							() => {
								this.registerUser();
							}
						);
					});
				}
			});
	};

	// 2. Register user through Firebase Auth
	registerUser = () => {
		this.auth
			.createUserWithEmailAndPassword(this.state.email, this.state.password)
			.then((user) => {
				this.setState(
					{
						user: user.user.uid,
					},
					() => {
						this.addUserDetails(user.user.uid);
					}
				);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	// 3. Add additional user details after registration
	addUserDetails = (uid) => {
		this.db
			.collection('users')
			.doc(uid)
			.set({
				uid: this.state.user,
				name: this.state.name,
				email: this.state.email,
				transit: this.state.transit,
				market: this.state.market,
				region: this.state.region,
			})
			.then(() => {
				console.log('Added user details!');
				this.props.history.push('/dashboard');
			})
			.catch((error) => {
				console.log(error);
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
							{/* <p>
								Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
								diam nonumy eirmod tempor.
							</p> */}
						</div>
						<form className="authForm">
							<input
								type="text"
								id="transit"
								placeholder="Transit #"
								onChange={this.onInputValueChange}
							/>
							<input
								type="text"
								id="name"
								placeholder="Name"
								onChange={this.onInputValueChange}
							/>

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
							<button className="authBtn" onClick={this.onRegister}>
								Register
							</button>
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

export default withRouter(Register);
