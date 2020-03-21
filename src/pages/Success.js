import React, { Component } from 'react';

import firebase from '../config/firebase';

import Nav from '../components/Nav';
import Header from '../components/Header';
import SubmitIcon from '../components/icons/SubmitIcon';
import ArrowIcon from '../components/icons/ArrowIcon';
// import NotificationOptionIcon from '../components/icons/NotificationOptionIcon';
// import FolderOptionIcon from '../components/icons/FolderOptionIcon';

import Spinner from 'react-spinkit';

import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCloudUploadAlt,
	faFolderOpen,
	faBell
} from '@fortawesome/free-solid-svg-icons';

class Success extends Component {
	render() {
		return (
			<div className="success">
				<Header>Photo Ad Submission</Header>
				<div className="page wrapper">
					<div className="successMessage">
						<h2>Thank You</h2>
						<FontAwesomeIcon icon={faCloudUploadAlt} />
						<p>Upload Successful!</p>
					</div>

					<ul className="optionsContainer">
						<li className="option">
							<div className="optionTitle">
								<FontAwesomeIcon icon={faFolderOpen} />
								<h3>Submit Another Photo</h3>
							</div>

							<ArrowIcon />
						</li>
						<li className="option">
							<div className="optionTitle">
								<FontAwesomeIcon icon={faBell} />
								<h3>See My Submissions</h3>
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

export default Success;
