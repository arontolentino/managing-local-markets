import React, { Component } from 'react';
import RBCLogo from './logos/RBCLogo';

import { NavLink } from 'react-router-dom';

class Header extends Component {
	state = {};
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
						<div className="headerAuth"></div>
					</div>
				</div>

				<div className="secondaryHeader">
					<div className="wrapper">
						<nav className="nav">
							<ul className="navList">
								<li>
									<NavLink
										to="/submissions"
										activeClassName="navActive"
										className="navItem"
									>
										Submissions
									</NavLink>
								</li>
								<li>
									<NavLink
										to="/"
										exact
										className="navItem"
										activeClassName="navActive"
									>
										Groups
									</NavLink>
								</li>
								<li>
									<NavLink
										to="/"
										exact
										className="navItem"
										activeClassName="navActive"
									>
										users
									</NavLink>
								</li>
								<li>
									<NavLink
										to="/"
										exact
										className="navItem"
										activeClassName="navActive"
									>
										Notifications
									</NavLink>
								</li>
							</ul>
						</nav>
					</div>
				</div>
			</header>
		);
	}
}

export default Header;
