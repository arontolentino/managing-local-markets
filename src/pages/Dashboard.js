import React, { Component } from 'react';

import firebase from '../config/firebase';

import Nav from '../components/Nav';
import Header from '../components/Header';
import SubmitIcon from '../components/icons/SubmitIcon';
import ArrowIcon from '../components/icons/ArrowIcon';
// import NotificationOptionIcon from '../components/icons/NotificationOptionIcon';
// import FolderOptionIcon from '../components/icons/FolderOptionIcon';

import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen, faBell } from '@fortawesome/free-solid-svg-icons';

class Dashboard extends Component {
	render() {
		return (
			<div className="dash">
				<Header />
				<div className="page wrapper">
					<div className="dashIntro">
						<h2>Welcome Back, {this.props.firstName}...</h2>
						<p>
							Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
							nonumy eirmod tempor
						</p>
					</div>

					<div className="dashSubmit">
						<Link to="/camera">
							<SubmitIcon />
						</Link>

						<h3>Submit a new ad photo</h3>
					</div>

					<ul className="optionsContainer">
						<li className="option">
							<div className="optionTitle">
								<FontAwesomeIcon icon={faFolderOpen} />
								<h3>View/Review My Submissions</h3>
							</div>

							<ArrowIcon />
						</li>
						<li className="option">
							<div className="optionTitle">
								<FontAwesomeIcon icon={faBell} />
								<h3>You Have 3 Notifications</h3>
							</div>

							<ArrowIcon />
						</li>
					</ul>
				</div>

				<Nav />
			</div>
		);
	}
}

export default Dashboard;
