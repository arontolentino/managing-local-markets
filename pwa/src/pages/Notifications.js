import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import Nav from '../components/Nav';
import Header from '../components/Header';
import SecondaryHeader from '../components/SecondaryHeader';
import ArrowIcon from '../components/icons/ArrowIcon';

import Spinner from 'react-spinkit';
import firebase from '../config/firebase';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faClock,
	faEdit,
	faBell,
	faExclamationCircle,
	faCheckCircle
} from '@fortawesome/free-solid-svg-icons';

class Notifications extends Component {
	state = {
		user: null,
		submissions: null
	};

	static getDerivedStateFromProps(props, state) {
		if (props.user !== state.user) {
			return {
				user: props.user
			};
		}
		return null;
	}

	componentDidMount() {
		this.getSubmissions();
	}

	componentDidUpdate(prevProps) {
		if (this.props.user !== prevProps.user) {
			this.getSubmissions();
		}
	}

	getSubmissions = () => {
		const db = firebase.firestore();

		db.collection('submissions')
			.where('userID', '==', this.state.user)
			.where('status', '==', 'Action Required')
			.orderBy('submissionID', 'desc')
			.onSnapshot(querySnapshot => {
				const submissions = [];

				querySnapshot.forEach(function(doc) {
					submissions.push(doc.data());
				});

				if (submissions.length !== 0) {
					this.setState({
						submissions
					});
				}
			});
	};

	render() {
		return (
			<div className="submissions">
				<Header>Managing Local Markets</Header>
				<SecondaryHeader>
					<FontAwesomeIcon icon={faBell} />
					<h2>Notifications</h2>
				</SecondaryHeader>

				{!this.state.submissions ? (
					<div className="spinner">
						<Spinner name="three-bounce" color="#006ac3" />
					</div>
				) : (
					<div className="page wrapper">
						<ul className="submissionList">
							{this.state.submissions.map(submission => (
								<li className="submission" key={submission.submissionID}>
									<div className="submissionContainer">
										<div className="submissionContent">
											<div className="submissionIcons">
												{submission.status === 'Awaiting' ? (
													<FontAwesomeIcon
														icon={faClock}
														style={{ color: '#9B9B9B' }}
													/>
												) : submission.status === 'Action Required' ? (
													<FontAwesomeIcon
														icon={faExclamationCircle}
														style={{ color: '#D10000' }}
													/>
												) : (
													<FontAwesomeIcon
														icon={faCheckCircle}
														style={{ color: '#00A70D' }}
													/>
												)}

												<Link
													to={`/submissions/${submission.submissionID}/edit`}
												>
													<FontAwesomeIcon
														icon={faEdit}
														style={{ color: '#9B9B9B' }}
													/>
												</Link>
											</div>
											<div className="submissionDetails">
												<img src={submission.thumbnailURL} alt="" />
												<div className="submissionTitle">
													<p>
														{moment(
															new Date(submission.date.seconds * 1000)
														).format('YYYY-MM-DD | h:mm a')}
													</p>
													<ul>
														<li>
															<h3>{submission.financialInstitution}</h3>
														</li>
														<li>
															<h3>{submission.product}</h3>
														</li>
														<li>
															<h3>{submission.medium}</h3>
														</li>
													</ul>
												</div>
											</div>
										</div>

										<Link to={`/submissions/${submission.submissionID}/edit`}>
											<ArrowIcon />
										</Link>
									</div>
									{submission.adminComment !== undefined ? (
										<div className="submissionComment">
											<p>{submission.adminComment}</p>
										</div>
									) : null}
								</li>
							))}
						</ul>
					</div>
				)}

				<Nav />
			</div>
		);
	}
}

export default Notifications;
