import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Spinner from 'react-spinkit';

import Nav from '../components/Nav';
import Header from '../components/Header';
import SubmitIcon from '../components/icons/SubmitIcon';

import firebase from '../config/firebase';
import imageCompression from 'browser-image-compression';

class Submit extends Component {
	state = {
		isUploading: false,
		date: new Date(),
		financialInstitution: null,
		product: null,
		medium: null,
		comment: null,
		counter: null
	};

	componentDidMount() {
		this.getCounter();

		this.doSomething.then(function(res) {
			console.log(res);
		});
	}

	getCounter = () => {
		const db = firebase.firestore();

		db.collection('counter').onSnapshot(querySnapshot => {
			querySnapshot.forEach(doc => {
				this.setState({ counter: doc.data().counter });
			});
		});
	};

	updateCounter = () => {
		const db = firebase.firestore();

		db.collection('counter')
			.doc('counter')
			.update({ counter: this.state.counter + 1 });
	};

	onValueChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	doSomething = new Promise((resolve, reject) => {
		setTimeout(function() {
			resolve('Success!'); // Yay! Everything went well!
		}, 250);
	});

	onSubmit = e => {
		e.preventDefault();

		// 1. Set state to uploading to trigger spinner
		this.setState({ isUploading: true });

		//

		// 2. Compress image to thumbnail size and web size
		const photoFile = this.props.photoFile;

		imageCompression.getExifOrientation(photoFile).then(exif => {

			const thumbnailPhoto = imageCompression(photoFile, {
				maxSizeMB: 0.1,
				maxWidthOrHeight: 1024,
				exifOrientation: exif
			});

			const webPhoto = imageCompression(photoFile, {
				maxSizeMB: 0.5,
				maxWidthOrHeight: 2048,
				exifOrientation: exif
			});

			Promise.all([thumbnailPhoto, webPhoto]).then(compressedImages => {
				console.log('First set of promises triggered');
				console.log(compressedImages);

				// 3. Upload compressed images to Firebase
				const storage = firebase.storage();

				const thumbnailPhotoRef = storage
					.ref('submissions')
					.child(
						`${
							this.props.userDetails.uid
						}-${this.state.date.getTime()}-thumbnail`
					);

				const webPhotoRef = storage
					.ref('submissions')
					.child(
						`${this.props.userDetails.uid}-${this.state.date.getTime()}-web`
					);

				// Upload thumbnail
				const uploadThumbnailPhoto = thumbnailPhotoRef.put(compressedImages[0]);

				// Upload web photo
				const uploadWebPhoto = webPhotoRef.put(compressedImages[1]);

				Promise.all([uploadThumbnailPhoto, uploadWebPhoto]).then(snapshots => {
					console.log('Second set of promises triggered');

					// 4. Get photo URLs
					const thumbnailPhotoURL = thumbnailPhotoRef.getDownloadURL();
					const webPhotoURL = webPhotoRef.getDownloadURL();

					Promise.all([thumbnailPhotoURL, webPhotoURL]).then(URLs => {
						this.addSubmission(URLs[0], URLs[1]);
					});
				});
			});
		});
	};

	addSubmission = (thumbnailPhotoURL, webPhotoURL) => {
		const db = firebase.firestore();

		db.collection('submissions')
			.doc(this.state.counter.toString())
			.set({
				// User Details
				userID: this.props.userDetails.uid,
				fullName: this.props.userDetails.fullName,
				firstName: this.props.userDetails.firstName,
				lastName: this.props.userDetails.lastName,
				transit: this.props.userDetails.transit,
				market: this.props.userDetails.market,
				region: this.props.userDetails.region,

				// Submission Details
				submissionID: this.state.counter,
				date: this.state.date,
				photoURL: webPhotoURL,
				thumbnailURL: thumbnailPhotoURL,
				medium: this.state.medium,
				product: this.state.product,
				comment: this.state.comment,
				financialInstitution: this.state.financialInstitution,
				status: 'Awaiting'
			})
			.then(() => {
				console.log('Added submission!');
				this.updateCounter();
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
