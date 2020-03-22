import React, { Component } from 'react';
import RBCLogo from '../components/logos/RBCLogo';

import { Link } from 'react-router-dom';

class Splash extends Component {
	state = {};
	render() {
		return (
			<div className="splash">
				<div className="wrapper">
					<div className="authForm">
						<div className="authFormLogo">
							<RBCLogo />
							<h1>Managing Local Markets</h1>
							<p>
								Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
								diam nonumy eirmod tempor.
							</p>
						</div>
						<form className="authForm">
							<Link to="/login" className="authBtn">
								Login
							</Link>
							<Link to="/register" className="authBtn authBtnSecondary">
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
