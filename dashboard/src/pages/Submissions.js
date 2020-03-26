import React, { Component } from 'react';

import firebase from '../components/config/firebase';

import Header from '../components/Header';
import Table from '../components/Table';

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
				<Header />
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
