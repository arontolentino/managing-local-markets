import React, { Component } from 'react';

import Nav from '../components/Nav';
import Header from '../components/Header';
import ArrowIcon from '../components/icons/ArrowIcon';

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
						<h2>Thank You</h2>
						<FontAwesomeIcon icon={faCloudUploadAlt} />
						<p>Submission Updated!</p>
					</div>

					<ul className="optionsContainer">
						<li className="option">
							<Link
								to={`/submissions/${this.props.match.params.id}/edit`}
								className="optionTitle"
							>
								<FontAwesomeIcon icon={faFolderOpen} />
								<h3>View Updated Submission</h3>
							</Link>

							<ArrowIcon />
						</li>
						<li className="option">
							<Link to="/submissions" className="optionTitle">
								<FontAwesomeIcon icon={faBell} />
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
