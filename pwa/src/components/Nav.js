import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import CameraIcon from './icons/CameraIcon';
import SubmissionsIcon from './icons/SubmissionsIcon';
import NotificationsIcon from './icons/NotificationsIcon';
import MoreIcon from './icons/MoreIcon';
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
								<CameraIcon className="navIcon" color="#fff" />
								Take Photo
							</NavLink>
							<NavLink
								to="/submissions"
								className="navItem"
								activeClassName="navActive"
							>
								<SubmissionsIcon className="navIcon" color="#fff" />
								Submissions
							</NavLink>
							<NavLink
								to="/notifications"
								className="navItem"
								activeClassName="navActive"
							>
								<NotificationsIcon
									className="navIcon"
									color="#fff"
									bubbleColor="#F93F26"
								/>
								Notifications
							</NavLink>
							<NavLink
								to="/settings"
								className="navItem"
								activeClassName="navActive"
							>
								<GearIcon className="navIcon" color="#fff"></GearIcon>
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
