import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import Header from '../components/Header';
import SecondaryHeader from '../components/SecondaryHeader';
import Nav from '../components/Nav';
import ArrowIcon from '../components/icons/ArrowIcon';

import firebase from '../config/firebase';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

class Settings extends Component {
	state = {};

	onSignOut = () => {
		firebase
			.auth()
			.signOut()
			.then(() => {
				this.props.history.push('/');
			})
			.catch(function(error) {
				console.log(error);
			});
	};

	render() {
		return (
			<div className="submissions">
				<Header>Managing Local Markets</Header>
				<SecondaryHeader>
					<FontAwesomeIcon icon={faCog} />
					<h2>MLM Settings & Info</h2>
				</SecondaryHeader>

				<div className="page wrapper">
					<div className="settingsList">
						<h3 className="settingsTitle">Setting</h3>
						<ul className="optionsContainer">
							<li className="option">
								<Link to="/submissions" className="optionTitle">
									<h3>Wifi only</h3>
								</Link>

								<ArrowIcon />
							</li>
							<li className="option">
								<Link to="/notifications" className="optionTitle">
									<h3>Profile</h3>
								</Link>

								<ArrowIcon />
							</li>
						</ul>
					</div>
					<div className="settingsList">
						<h3 className="settingsTitle">Information</h3>
						<ul className="optionsContainer">
							<li className="option">
								<Link to="/submissions" className="optionTitle">
									<h3>About MLM</h3>
								</Link>

								<ArrowIcon />
							</li>
							<li className="option">
								<Link to="/notifications" className="optionTitle">
									<h3>FAQs</h3>
								</Link>

								<ArrowIcon />
							</li>
						</ul>
					</div>
					<div className="settingsList">
						<button className="signOut" onClick={this.onSignOut}>
							Sign Out
						</button>
						<p className="copyright">All rights reserved @ RBC 2020</p>
					</div>
				</div>
				<Nav />
			</div>
		);
	}
}

export default Settings;
