import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';

import RBCLogo from './logos/RBCLogo';

import firebase from '../config/firebase';

class Header extends Component {
	state = {};

	onSignOut = () => {
		firebase
			.auth()
			.signOut()
			.then(() => {
				this.props.history.push('/login');
			})
			.catch(function(error) {
				console.log(error);
			});
	};

	render() {
		return (
			<header className="header">
				<div className="mainHeader">
					<div className="wrapper">
						<div className="headerTitle">
							<div className="headerLogo">
								<RBCLogo />
							</div>

							<h1>Managing Local Markets</h1>
						</div>

						{this.props.signOut === true ? (
							<div className="headerAuth">
								<p>
									Logged in as <strong>{this.props.userEmail}</strong>
								</p>

								<button className="signOut" onClick={this.onSignOut}>
									Sign Out
								</button>
							</div>
						) : null}
					</div>
				</div>

				{this.props.children}
			</header>
		);
	}
}

export default withRouter(Header);
