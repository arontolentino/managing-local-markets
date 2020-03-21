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
				comment: this.state.comment
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
