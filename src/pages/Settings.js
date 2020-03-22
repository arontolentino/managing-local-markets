import React, { Component } from 'react';

import Header from './../components/Header';
import SecondaryHeader from '../components/SecondaryHeader';
import Nav from '../components/Nav';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

class Settings extends Component {
	state = {};

	render() {
		return (
			<div className="submissions">
				<Header>Managing Local Markets</Header>
				<SecondaryHeader>
					<FontAwesomeIcon icon={faCog} />
					<h2>MLM Settings & Info</h2>
				</SecondaryHeader>

				<div className="page wrapper"></div>
				<Nav />
			</div>
		);
	}
}

export default Settings;
