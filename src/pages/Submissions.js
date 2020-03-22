import React, { Component } from 'react';

import firebase from '../config/firebase';

import Nav from '../components/Nav';
import Header from './../components/Header';
import ArrowIcon from '../components/icons/ArrowIcon';

import Spinner from 'react-spinkit';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faEdit } from '@fortawesome/free-solid-svg-icons';

class Submissions extends Component {
	state = {
		submissions: null
	};

	componentDidMount() {
		console.log(this.props.user);
		this.getSubmissions();
	}

	getSubmissions = () => {
		const db = firebase.firestore();

		db.collection('submissions')
			.where('uid', '==', this.props.user)
			.onSnapshot(querySnapshot => {
				const submissions = [];

				querySnapshot.forEach(function(doc) {
					submissions.push(doc.data());
				});

				if (submissions.length === 0) {
					console.error('No submissions found!');
				} else {
					this.setState({
						submissions
					});
				}
			});
	};

	render() {
		return (
			<div className="submissions">
				<Header>Marketing Local Markets</Header>

				{!this.state.submissions ? (
					<div className="spinner">
						<Spinner name="three-bounce" color="#006ac3" />
					</div>
				) : (
					<div className="page wrapper">
						<ul className="submissionList">
							{this.state.submissions.map(submission => (
								<li className="submission">
									<div className="submissionContent">
										<div className="submissionIcons">
											<FontAwesomeIcon icon={faClock} />
											<FontAwesomeIcon icon={faEdit} />
										</div>
										<div className="submissionDetails">
											<img src={submission.photoURL} alt="" />
											<div className="submissionTitle">
												<p>
													{moment(
														new Date(submission.date.seconds * 1000)
													).format('MMMM D, YYYY | h:mm a')}
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
									<ArrowIcon />
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

export default Submissions;
