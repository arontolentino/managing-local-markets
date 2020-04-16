import React, { Component } from 'react';

import Nav from '../components/Nav';
import Header from '../components/Header';
import ArrowIcon from '../components/icons/ArrowIcon';
import UploadIcon from '../components/icons/UploadIcon';
import SubmissionsIcon from '../components/icons/SubmissionsIcon';
import CameraIcon from '../components/icons/CameraIcon';

import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCloudUploadAlt,
	faFolderOpen,
	faBell
} from '@fortawesome/free-solid-svg-icons';

class EditSuccess extends Component {
	render() {
		return (
			<div className="success">
				<Header>Photo Ad Submission</Header>
				<div className="page wrapper">
					<div className="successMessage">
						<UploadIcon />
						<h2>Thank You</h2>
						<p>Submission Updated!</p>
					</div>

					<ul className="optionsContainer">
						<li className="option">
							<Link
								to={`/submissions/${this.props.match.params.id}/edit`}
								className="optionTitle"
							>
								<CameraIcon color="#006AC3" className="optionLogo" />
								<h3>View Updated Submission</h3>
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

export default EditSuccess;
