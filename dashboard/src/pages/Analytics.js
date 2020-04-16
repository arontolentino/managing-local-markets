import React, { useState, useEffect } from 'react';

import Header from '../components/Header';
import Nav from '../components/Nav';
import PivotTable from '../components/PivotTable';

import firebase from '../config/firebase';

const Analytics = ({ userEmail }) => {
	const [submissions, setSubmissions] = useState([]);

	useEffect(() => {
		const db = firebase.firestore();

		db.collection('submissions')
			.orderBy('submissionID', 'desc')
			.onSnapshot((querySnapshot) => {
				var submissions = [];
				querySnapshot.forEach(function (doc) {
					submissions.push(doc.data());
				});
				setSubmissions({ submissions });
				console.log(submissions);
			});
	}, []);

	return (
		<div className="submissions">
			<Header userEmail={userEmail} signOut={true}>
				<Nav />
			</Header>

			<main className="main">
				<div className="wrapper">
					<PivotTable data={submissions} />
				</div>
			</main>
		</div>
	);
};

export default Analytics;
