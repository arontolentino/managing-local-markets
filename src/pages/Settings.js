import React, { Component } from 'react';
import Nav from '../components/Nav';

import Header from './../components/Header';

class Settings extends Component {
	state = {};
	render() {
		return (
			<div className="settings">
				<Header />
				<div className="page wrapper">
					<h1>Settings</h1>
				</div>
				<Nav />
			</div>
		);
	}
}

export default Settings;
