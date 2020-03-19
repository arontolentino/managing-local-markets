import React, { Component } from 'react';
import RBCLogo from '../components/logos/RBCLogo';

class Register extends Component {
	state = {};
	render() {
		return (
			<div className="auth">
				<div class="wrapper">
					<div class="authForm">
						<div class="authFormLogo">
							<RBCLogo />
							<h1>Marketing Local Markets</h1>
							{/* <p>
								Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
								diam nonumy eirmod tempor.
							</p> */}
						</div>
						<form class="authForm">
							<input type="text" id="firstName" placeholder="First Name" />
							<input type="text" id="lastName" placeholder="Last Name" />
							<input type="email" id="email" placeholder="Email Address" />
							<input type="password" id="password" placeholder="Password" />
							<button className="authBtn">Register</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default Register;
