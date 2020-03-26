import React, { Component } from 'react';

import firebase from '../config/firebase';

import Header from '../components/Header';
import Table from '../components/Table';
import Nav from '../components/Nav';

class Submissions extends Component {
	state = {};

	componentDidMount() {
		const db = firebase.firestore();

		db.collection('configurations')
			.doc('selectOptions')
			.get()
			.then(doc => {
				console.log(doc.data());
				const selectOptions = doc.data();

				this.setState({ selectOptions });
			});
	}

	render() {
		return (
			<div className="submissions">
				<Header userEmail={this.props.userEmail} signOut={true}>
					<Nav />
				</Header>
				<main class="main">
					<div className="wrapper">
						<Table />
					</div>
				</main>
			</div>
		);
	}
}

export default Submissions;
