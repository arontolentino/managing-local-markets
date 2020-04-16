import React, { Component } from 'react';
import RBCLogo from './logos/RBCLogo';
import BackIcon from './icons/BackIcon';

import { withRouter } from 'react-router-dom';

class Header extends Component {
	state = {};
	render() {
		return (
			<header className="header">
				<div className="wrapper">
					{!this.props.backBtn ? <RBCLogo className="headerLogo" /> : null}

					{this.props.backBtn ? (
						<div class="headerBack" onClick={this.props.history.goBack}>
							<BackIcon
								className="headerBackBtn"
								onClick={this.props.history.goBack}
							/>
						</div>
					) : null}
					<div className="headerTitle">{this.props.children}</div>
				</div>
			</header>
		);
	}
}

export default withRouter(Header);
