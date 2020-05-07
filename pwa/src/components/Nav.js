import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';
import firebase from '../config/firebase';

import CameraIcon from './icons/CameraIcon';
import SubmissionsIcon from './icons/SubmissionsIcon';
import NotificationsIcon from './icons/NotificationsIcon';

import GearIcon from './icons/GearIcon';

class Nav extends Component {
	state = {
		user: null,
		notifications: null,
	};

	componentDidMount() {
		this.initApp();
	}

	auth = firebase.auth();
	db = firebase.firestore();

	initApp = () => {
		this.auth.onAuthStateChanged((user) => {
			if (user) {
				this.setState({ user: user.uid }, () => {
					this.getSubmissions();
				});
			}
		});
	};

	getSubmissions = () => {
		console.log('Get submissions');
		console.log(this.state.user);
		this.db
			.collection('submissions')
			.where('userID', '==', this.state.user)
			.where('status', '==', 'Action Required')
			.orderBy('submissionID', 'desc')
			.onSnapshot((querySnapshot) => {
				const submissions = [];

				querySnapshot.forEach(function (doc) {
					submissions.push(doc.data());
				});

				if (submissions.length !== 0) {
					this.setState({
						notifications: submissions.length,
					});
				}
			});
	};

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
								{this.state.notifications ? (
									<div className="notificationCount">
										{this.state.notifications}
									</div>
								) : null}
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
