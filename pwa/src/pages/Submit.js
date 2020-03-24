import React, { Component } from 'react';

// import firebase from '../config/firebase';

import { Link, withRouter } from 'react-router-dom';

import SubmitIcon from '../components/icons/SubmitIcon';

import Spinner from 'react-spinkit';

import Nav from '../components/Nav';
import Header from '../components/Header';
// import SubmitIcon from '../components/icons/SubmitIcon';
// import ArrowIcon from '../components/icons/ArrowIcon';
// import NotificationOptionIcon from '../components/icons/NotificationOptionIcon';
// import FolderOptionIcon from '../components/icons/FolderOptionIcon';

import firebase from '../config/firebase';

class Submit extends Component {
	state = {
		isUploading: false,
		date: new Date(),
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

	onSubmit = e => {
		e.preventDefault();

		this.setState({ isUploading: true });

		const storage = firebase.storage();
		const submitImage = storage
			.ref('submissions')
			.child(`${this.props.userDetails.uid}-${this.state.date.getTime()}`);

		submitImage.put(this.props.photoFile).then(snapshot => {
			console.log(snapshot);

			submitImage.getDownloadURL().then(url => {
				this.setState(
					{
						photoURL: url
					},
					() => {
						this.addSubmission(url);
					}
				);
			});
		});
	};

	addSubmission = () => {
		const db = firebase.firestore();

		db.collection('submissions')
			.add({
				// User Details
				uid: this.props.userDetails.uid,
				firstName: this.props.userDetails.firstName,
				lastName: this.props.userDetails.lastName,
				transit: this.props.userDetails.transit,
				market: this.props.userDetails.market,
				region: this.props.userDetails.region,

				// Submission Details
				date: this.state.date,
				photoURL: this.state.photoURL,
				medium: this.state.medium,
				product: this.state.product,
				comment: this.state.comment,
				financialInstitution: this.state.financialInstitution
			})
			.then(() => {
				console.log('Added submission!');
				this.setState({ isUploading: false });
				this.props.history.push('/dashboard/submit/success');
			})
			.catch(error => {
				console.log(error);
			});
	};

	render() {
		return (
			<div className="submit">
				<Header>Photo Ad Submission</Header>

				{this.state.isUploading === true ? (
					<div className="spinner">
						<Spinner name="three-bounce" color="#006ac3" />
					</div>
				) : (
					<div className="page wrapper">
						<form className="submitForm">
							{this.props.photoBase64 ? (
								<div className="photoPreview">
									<img src={this.props.photoBase64} alt="" />
								</div>
							) : (
								<div className="dashSubmit">
									<label for="photoUpload">
										<SubmitIcon />
									</label>

									<h3>Submit a new ad photo</h3>
									<input
										type="file"
										id="photoUpload"
										onchange="previewFile()"
										onChange={e => this.props.onPhotoUpload(e)}
									/>
								</div>
							)}

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
								<option value="Canadian Western Bank">
									Canadian Western Bank
								</option>
								<option value="CIBC">CIBC</option>
								<option value="Coastal Capital">Coastal Capital</option>
								<option value="HSBC">HSBC</option>
								<option value="Manulife">Manulife</option>
								<option value="Meridian">Meridian</option>
								<option value="National Bank">National Bank</option>
								<option value="PC Financial">PC Financial</option>
								<option value="Scotiabank">Scotiabank</option>
								<option value="TD Canada Trust">TD Canada Trust</option>
								<option value="Tangerine">Tangerine</option>
								<option value="Vancity">Vancity</option>
								<option value="Other">Other</option>
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
								<option value="Creditor Insurance">Creditor Insurance</option>
								<option value="Home Equity Financing">
									Home Equity Financing
								</option>
								<option value="Loans & Lines of Credit">
									Loans & Lines of Credit
								</option>
								<option value="Non-Registered Savings">
									Non-Registered Savings
								</option>
								<option value="Registered Savings">Registered Savings</option>
								<option value="Self-Directed Investing">
									Self-Directed Investing
								</option>
								<option value="Other">Other</option>
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
								<option value="Print">Print</option>
								<option value="Public Transportation">
									Public Transportation
								</option>
								<option value="Signage">Signage</option>
								<option value="TV">TV</option>
								<option value="Other">Other</option>
							</select>

							<textarea
								className="comment"
								id="comment"
								placeholder="Add Comment..."
								onChange={this.onValueChange}
							/>
							<div className="submitBtns">
								<button className="cancelBtn">Cancel</button>
								<button className="submitBtn" onClick={this.onSubmit}>
									Submit Ad
								</button>
							</div>
						</form>
					</div>
				)}

				<Nav />
			</div>
		);
	}
}

export default withRouter(Submit);
