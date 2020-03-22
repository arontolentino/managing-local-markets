import React, { Component } from 'react';
import Nav from '../components/Nav';

import Header from './../components/Header';

import firebase from '../config/firebase';

class Settings extends Component {
	state = {};

	onLogOut = () => {
		console.log('Clicked Logout');
		firebase.auth().signOut();
		this.props.history.push('/');
	};

	render() {
		return (
			<div className="settings">
				<Header>Managing Local Markets</Header>
				<div className="page wrapper">
					<button onClick={this.onLogOut}>Sign out</button>
				</div>
				<Nav />
			</div>
		);
	}
}

export default Settings;
