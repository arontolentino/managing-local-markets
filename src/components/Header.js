import React, { Component } from 'react';
import RBCLogo from './logos/RBCLogo';

class Header extends Component {
	state = {};
	render() {
		return (
			<header className="header">
				<div className="wrapper">
					<div className="headerlogo">
						<RBCLogo />
					</div>
					<div className="headerTitle">Marketing Local Markets</div>
				</div>
			</header>
		);
	}
}

export default Header;
