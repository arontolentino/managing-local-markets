import React, { Component } from 'react';

// import firebase from '../config/firebase';

import { Link } from 'react-router-dom';

import SubmitIcon from '../components/icons/SubmitIcon';

import Nav from '../components/Nav';
import Header from '../components/Header';
// import SubmitIcon from '../components/icons/SubmitIcon';
// import ArrowIcon from '../components/icons/ArrowIcon';
// import NotificationOptionIcon from '../components/icons/NotificationOptionIcon';
// import FolderOptionIcon from '../components/icons/FolderOptionIcon';

import FileBase64 from 'react-file-base64';

class Submit extends Component {
	state = {
		financialInstitution: null,
		product: null,
		medium: null,
		comment: null
	};

	onValueChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	render() {
		return (
			<div className="submit">
				<Header>Photo Ad Submission</Header>
				<div className="page wrapper">
					<form className="submitForm">
						<div className="photoPreview">
							<img src={this.props.photoBase64} alt="" />
						</div>
						<select
							className="select"
							id="financialInstitution"
							onChange={this.onValueChange}
						>
							<option value="" disabled selected>
								Tag Financial Institution
							</option>
							<option value="ATB">ATB</option>
							<option value="BMO">BMO</option>
						</select>
						<select
							className="select"
							id="product"
							onChange={this.onValueChange}
						>
							<option value="" disabled selected>
								Tag Product
							</option>
							<option value="Bank Accounts">Bank Accounts</option>
							<option value="Credit Cards">Credit Cards</option>
						</select>
						<select
							className="select"
							id="medium"
							onChange={this.onValueChange}
						>
							<option value="" disabled selected>
								Tag Medium
							</option>
							<option value="Billboards">Billboards</option>
							<option value="Online">Online</option>
						</select>

						<textarea
							className="comment"
							id="comment"
							placeholder="Add Comment..."
							onChange={this.onValueChange}
						/>
						<div className="submitBtns">
							<button className="cancelBtn">Cancel</button>
							<button className="submitBtn">Submit Ad</button>
						</div>
					</form>

					{/* <img src={this.state.photo.base64} alt="" /> */}
				</div>

				<Nav />
			</div>
		);
	}
}

export default Submit;
