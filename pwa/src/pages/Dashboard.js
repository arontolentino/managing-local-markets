import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Nav from '../components/Nav';
import Header from '../components/Header';
import SubmitIcon from '../components/icons/SubmitIcon';
import SubmissionsIcon from '../components/icons/SubmissionsIcon';
import ArrowIcon from '../components/icons/ArrowIcon';

import Spinner from 'react-spinkit';
import firebase from '../config/firebase';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen, faBell } from '@fortawesome/free-solid-svg-icons';
import NotificationsIcon from '../components/icons/NotificationsIcon';

class Dashboard extends Component {
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
			<div className="dash">
				<Header>Managing Local Markets</Header>

				{!this.props.name ? (
					<div className="spinner">
						<Spinner name="three-bounce" color="#006ac3" />
					</div>
				) : (
					<div className="page wrapper">
						<div className="dashIntro">
							<h2>Welcome Back,</h2>
							<h2>{this.props.name}</h2>
						</div>

						<div className="dashSubmit">
							<label htmlFor="photoUpload">
								<SubmitIcon />
							</label>

							<h3>Submit a new ad photo</h3>
							<input
								type="file"
								id="photoUpload"
								onChange={(e) => this.props.onPhotoUpload(e)}
							/>
						</div>

						<ul className="optionsContainer">
							<li className="option">
								<Link to="/submissions" className="optionTitle">
									<SubmissionsIcon color="#006AC3" className="optionLogo" />
									<h3>View/Review My Submissions</h3>
								</Link>

								<ArrowIcon />
							</li>
							<li className="option">
								<Link to="/notifications" className="optionTitle">
									<NotificationsIcon
										color="#006AC3"
										bubbleColor="#006AC3"
										className="optionLogo"
									/>
									<h3>
										You Have{' '}
										{this.state.notifications ? this.state.notifications : 0}{' '}
										{this.state.notifications === 1
											? 'Notification'
											: 'Notifications'}
									</h3>
								</Link>

								<ArrowIcon />
							</li>
						</ul>
					</div>
				)}

				<Nav />
			</div>
		);
	}
}

export default Dashboard;
