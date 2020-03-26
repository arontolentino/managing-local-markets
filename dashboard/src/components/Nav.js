import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';

class Nav extends Component {
	state = {};
	render() {
		return (
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
		);
	}
}

export default Nav;
