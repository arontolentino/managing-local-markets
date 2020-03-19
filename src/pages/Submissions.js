import React, { Component } from 'react';
import Nav from '../components/Nav';

import Header from './../components/Header';

class Submissions extends Component {
	state = {};
	render() {
		return (
			<div className="submissions">
				<Header />
				<div className="page wrapper">
					<h1>Submissions</h1>
				</div>
				<Nav />
			</div>
		);
	}
}

export default Submissions;
