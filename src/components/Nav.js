import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCamera,
	faFolderOpen,
	faBell,
	faCog
} from '@fortawesome/free-solid-svg-icons';

class Nav extends Component {
	state = {};
	render() {
		return (
			<div className="nav">
				<div className="wrapper">
					<nav>
						<ul className="navList">
							<NavLink
								to="/dashboard"
								className="navItem"
								activeClassName="navActive"
							>
								<FontAwesomeIcon icon={faCamera} />
								Take Photo
							</NavLink>
							<NavLink
								to="/submissions"
								className="navItem"
								activeClassName="navActive"
							>
								<FontAwesomeIcon icon={faFolderOpen} />
								Submissions
							</NavLink>
							<NavLink
								to="/notifications"
								className="navItem"
								activeClassName="navActive"
							>
								<FontAwesomeIcon icon={faBell} />
								Notifications
							</NavLink>
							<NavLink
								to="/settings"
								className="navItem"
								activeClassName="navActive"
							>
								<FontAwesomeIcon icon={faCog} />
								Settings
							</NavLink>
						</ul>
					</nav>
				</div>
			</div>
		);
	}
}

export default Nav;
