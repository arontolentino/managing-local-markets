import React, { Component } from 'react';

import firebase from '../config/firebase';

import Header from '../components/Header';
import Table from '../components/Table';
import Nav from '../components/Nav';

class Submissions extends Component {
	state = {
		modal: false,
		selectedSubmission: ''
	};

	componentDidMount() {
		const db = firebase.firestore();

		db.collection('configurations')
			.doc('selectOptions')
			.get()
			.then(doc => {
				const selectOptions = doc.data();

				this.setState({ selectOptions });
			});
	}

	toggleModal = () => {
		this.setState({ modal: !this.state.modal });
	};

	onSubmissionSelect = submissionID => {
		this.setState({ modal: true, selectedSubmission: submissionID });
	};

	render() {
		return (
			<div className="submissions">
				<Header userEmail={this.props.userEmail} signOut={true}>
					<Nav />
				</Header>

				<main className="main">
					<div className="wrapper">
						<Table onSubmissionSelect={this.onSubmissionSelect} />
					</div>
				</main>
			</div>
		);
	}
}

export default Submissions;
