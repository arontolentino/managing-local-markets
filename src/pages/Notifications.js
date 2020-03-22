import React, { Component } from 'react';

import Header from './../components/Header';
import SecondaryHeader from '../components/SecondaryHeader';
import Nav from '../components/Nav';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

class Notifications extends Component {
	state = {};

	render() {
		return (
			<div className="submissions">
				<Header>Managing Local Markets</Header>
				<SecondaryHeader>
					<FontAwesomeIcon icon={faBell} />
					<h2>Notifications</h2>
				</SecondaryHeader>

				<div className="page wrapper"></div>
				<Nav />
			</div>
		);
	}
}

export default Notifications;
