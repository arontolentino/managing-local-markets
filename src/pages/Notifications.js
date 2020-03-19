import React, { Component } from 'react';
import Nav from '../components/Nav';

import Header from './../components/Header';

class Notifications extends Component {
	state = {};
	render() {
		return (
			<div className="notifications">
				<Header />
				<div className="page wrapper">
					<h1>Notifications</h1>
				</div>
				<Nav />
			</div>
		);
	}
}

export default Notifications;
