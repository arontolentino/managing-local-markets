import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import Header from '../components/Header';
import SecondaryHeader from '../components/SecondaryHeader';
import Nav from '../components/Nav';
import ArrowIcon from '../components/icons/ArrowIcon';

import firebase from '../config/firebase';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import GearIcon from '../components/icons/GearIcon';
import InfoIcon from '../components/icons/InfoIcon';

class Settings extends Component {
	state = {};

	onSignOut = () => {
		firebase
			.auth()
			.signOut()
			.then(() => {
				this.props.history.push('/');
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	render() {
		return (
			<div className="submissions">
				<Header>Settings and Info</Header>

				<div className="page wrapper">
					<div className="settingsList">
						<div className="settingsTitle">
							<GearIcon className="settingsLogo" color="#006AC3" />
							<h3>Setting</h3>
						</div>
						<ul className="optionsContainer">
							<li className="option">
								<a href="#" className="optionTitle">
									<h3>Wi-Fi Only</h3>
								</a>

								<label class="switch">
									<input
										type="checkbox"
										onChange={(e) => this.props.onWifiToggle(e)}
										defaultChecked={this.props.wifi}
									/>
									<span class="slider round"></span>
								</label>
							</li>
							<li className="option">
								<a href="#" className="optionTitle">
									<h3>My Profile</h3>
								</a>

								<ArrowIcon />
							</li>
						</ul>
					</div>
					<div className="settingsList">
						<div className="settingsTitle">
							<InfoIcon className="settingsLogo" color="#006AC3" />
							<h3>Information</h3>
						</div>
						<ul className="optionsContainer">
							<li className="option">
								<a href="#" className="optionTitle">
									<h3>About MLM</h3>
								</a>

								<ArrowIcon />
							</li>
							<li className="option">
								<a href="#" className="optionTitle">
									<h3>FAQs</h3>
								</a>

								<ArrowIcon />
							</li>
						</ul>
					</div>
					<div className="settingsList">
						<button className="signOut" onClick={this.onSignOut}>
							Logout
						</button>
					</div>
				</div>
				<Nav />
			</div>
		);
	}
}

export default Settings;
