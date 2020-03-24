import React, { Component } from 'react';

import Header from '../components/Header';
import Table from '../components/Table';

class Submissions extends Component {
	render() {
		return (
			<div className="submissions">
				<Header />
				<main class="main">
					<div className="wrapper">
						<Table />
					</div>
				</main>
			</div>
		);
	}
}

export default Submissions;
