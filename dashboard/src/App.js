import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Submissions from './pages/Submissions';

import './App.css';

class App extends Component {
	state = {};
	render() {
		return (
			<div className="App">
				<Router>
					<Route path="/submissions" exact component={Submissions} />
				</Router>
			</div>
		);
	}
}

export default App;
