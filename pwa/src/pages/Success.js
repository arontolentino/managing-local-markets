import React, { Component } from 'react';

import Nav from '../components/Nav';
import Header from '../components/Header';
import ArrowIcon from '../components/icons/ArrowIcon';

import { Link } from 'react-router-dom';

import SubmissionsIcon from '../components/icons/SubmissionsIcon';
import CameraIcon from '../components/icons/CameraIcon';
import UploadIcon from '../components/icons/UploadIcon';

class Success extends Component {
	render() {
		return (
			<div className="success">
				<Header>Ad Submitted</Header>
				<div className="page wrapper">
					<div className="successMessage">
						<UploadIcon />
						<h2>Thank You</h2>
						<p>Upload Successful!</p>
					</div>

					<ul className="optionsContainer">
						<li className="option">
							<Link to="/dashboard/submit" className="optionTitle">
								<CameraIcon color="#006AC3" className="optionLogo" />
								<h3>Submit Another Photo</h3>
							</Link>

							<ArrowIcon />
						</li>
						<li className="option">
							<Link to="/submissions" className="optionTitle">
								<SubmissionsIcon color="#006AC3" className="optionLogo" />
								<h3>See My Submissions</h3>
							</Link>

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
