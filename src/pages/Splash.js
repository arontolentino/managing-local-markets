import React, { Component } from 'react';
import RBCLogo from '../components/logos/RBCLogo';

import { Link } from 'react-router-dom';

class Splash extends Component {
	state = {};
	render() {
		return (
			<div className="splash">
				<div class="wrapper">
					<div class="authForm">
						<div class="authFormLogo">
							<RBCLogo />
							<h1>Marketing Local Markets</h1>
							<p>
								Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
								diam nonumy eirmod tempor.
							</p>
						</div>
						<form class="authForm">
							<Link to="/login" class="authBtn">
								Login
							</Link>
							<Link to="/register" class="authBtn authBtnSecondary">
								Register
							</Link>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default Splash;
