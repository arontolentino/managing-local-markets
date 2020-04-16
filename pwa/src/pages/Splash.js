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
							<RBCLogo className="splashLogo" />
							<h1>Managing Local Markets</h1>
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
					<div className="authFooter">
						<p>All rights reserved © RBC 2020</p>
					</div>
				</div>
			</div>
		);
	}
}

export default Splash;
