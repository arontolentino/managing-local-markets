import React, { Component } from 'react';

import firebase from '../config/firebase';

import Header from '../components/Header';
import Table from '../components/Table';
import Nav from '../components/Nav';

class Submissions extends Component {
	state = {
		toast: null,
	};

	componentDidMount() {
		const db = firebase.firestore();

		db.collection('configurations')
			.doc('selectOptions')
			.get()
			.then((doc) => {
				const selectOptions = doc.data();

				this.setState({ selectOptions });
			});
	}

	triggerToast = (toast) => {
		this.setState({ toast });

		setTimeout(() => {
			this.setState({ toast: null });
		}, 4000);
	};

	render() {
		return (
			<div className="submissions">
				<Header userEmail={this.props.userEmail} signOut={true}>
					<Nav />
				</Header>

				{this.state.toast ? (
					<div className="notification">
						<div className="wrapper">
							<div className="notificationContent">
								<p>{this.state.toast}</p>
							</div>
						</div>
					</div>
				) : null}

				<main className="main">
					<div className="wrapper">
						<Table
							onSubmissionSelect={this.onSubmissionSelect}
							triggerToast={this.triggerToast}
						/>
					</div>
				</main>
			</div>
		);
	}
}

export default Submissions;
