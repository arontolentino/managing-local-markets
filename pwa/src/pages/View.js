import React, { Component } from 'react';

import Header from '../components/Header';
import SecondaryHeader from '../components/SecondaryHeader';
import Nav from '../components/Nav';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

class View extends Component {
	state = {};

	render() {
		return (
			<div className="submissions">
				<Header>Managing Local Markets</Header>

				<div className="page wrapper"></div>
				<Nav />
			</div>
		);
	}
}

export default View;
