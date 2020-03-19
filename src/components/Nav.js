import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';

import CameraIcon from './icons/CameraIcon';
import FolderIcon from './icons/FolderIcon';
import BellIcon from './icons/BellIcon';
import GearIcon from './icons/GearIcon';

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
								<CameraIcon />
								Take Photo
							</NavLink>
							<NavLink
								to="/submissions"
								className="navItem"
								activeClassName="navActive"
							>
								<FolderIcon />
								My Submissions
							</NavLink>
							<NavLink
								to="/notifications"
								className="navItem"
								activeClassName="navActive"
							>
								<BellIcon />
								Notifications
							</NavLink>
							<NavLink
								to="/settings"
								className="navItem"
								activeClassName="navActive"
							>
								<GearIcon />
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
