import React, { Component } from 'react';

import firebase from '../config/firebase';

import { withRouter } from 'react-router-dom';

import Header from '../components/Header';
import SecondaryHeader from '../components/SecondaryHeader';
import Nav from '../components/Nav';

import imageCompression from 'browser-image-compression';

import Spinner from 'react-spinkit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

class Edit extends Component {
	state = {
		submission: null,
		selectOptions: {
			financialInstitutions: [],
			medium: [],
			products: [],
			regions: [],
			markets: [],
			transits: []
		}
	};

	componentDidMount() {
		const db = firebase.firestore();

		db.collection('submissions')
			.doc(this.props.match.params.id)
			.get()
			.then(doc => {
				console.log('Document data:', doc.data());

				const submission = doc.data();

				this.setState({ submission });
			});

		db.collection('configurations')
			.doc('selectOptions')
			.get()
			.then(doc => {
				const selectOptions = doc.data();

				this.setState({ selectOptions });
			});
	}

	onUpdate = () => {
		const db = firebase.firestore();

		const submission = this.state.submission;

		db.collection('submissions')
			.doc(this.props.match.params.id)
			.set({ submission });
	};

	onValueChange = e => {
		this.setState({
			submission: {
				...this.state.submission,
				[e.target.id]: e.target.value
			}
		});
	};

	onPhotoUpload = e => {
		const reader = new FileReader();
		const file = e.target.files[0];

		reader.onloadend = () => {
			this.setState({
				photoFile: file,
				photoBase64: reader.result
			});
		};

		reader.readAsDataURL(file);
	};

	onUpdate = e => {
		e.preventDefault();

		// 1. Set state to uploading to trigger spinner
		this.setState({ isUploading: true });

		// 2. Compress image to thumbnail size and web size
		if (this.state.photoFile) {
			const photoFile = this.state.photoFile;

			imageCompression.getExifOrientation(photoFile).then(exif => {
				console.log(exif);

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
							`${this.props.userDetails.uid}-${new Date().getTime()}-thumbnail`
						);

					const webPhotoRef = storage
						.ref('submissions')
						.child(`${this.props.userDetails.uid}-${new Date().getTime()}-web`);

					// Upload thumbnail
					const uploadThumbnailPhoto = thumbnailPhotoRef.put(
						compressedImages[0]
					);

					// Upload web photo
					const uploadWebPhoto = webPhotoRef.put(compressedImages[1]);

					Promise.all([uploadThumbnailPhoto, uploadWebPhoto]).then(
						snapshots => {
							console.log('Second set of promises triggered');

							// 4. Get photo URLs
							const thumbnailPhotoURL = thumbnailPhotoRef.getDownloadURL();
							const webPhotoURL = webPhotoRef.getDownloadURL();

							Promise.all([thumbnailPhotoURL, webPhotoURL]).then(URLs => {
								this.updateSubmission(URLs[0], URLs[1]);
							});
						}
					);
				});
			});
		} else {
			this.updateSubmission();
		}
	};

	updateSubmission = (thumbnailPhotoURL, webPhotoURL) => {
		const db = firebase.firestore();

		let updatedSubmission = {};

		if (thumbnailPhotoURL || webPhotoURL) {
			updatedSubmission = {
				...this.state.submission,
				photoURL: webPhotoURL,
				thumbnailURL: thumbnailPhotoURL
			};
		} else {
			updatedSubmission = this.state.submission;
		}
		console.log(this.state.submission.submissionID);

		db.collection('submissions')
			.doc(this.state.submission.submissionID.toString())
			.set(updatedSubmission)
			.then(() => {
				console.log('Update submission!');
				this.props.history.push(
					`/submissions/${this.state.submission.submissionID}/edit/success`
				);
			})
			.catch(error => {
				console.log(error);
			});
	};

	render() {
		return (
			<div className="edit">
				<Header backBtn="true">Edit Submission</Header>

				{!this.state.submission ? (
					<div className="spinner">
						<Spinner name="three-bounce" color="#006ac3" />
					</div>
				) : (
					<div className="page wrapper">
						<form className="submitForm">
							<div className="photoPreview">
								<img
									src={
										this.state.photoBase64
											? this.state.photoBase64
											: this.state.submission.photoURL
									}
									alt=""
								/>
							</div>

							<label htmlFor="photoUpload">
								<p className="retakeBtn">Retake Photo</p>
							</label>
							<input
								type="file"
								id="photoUpload"
								onChange={e => this.onPhotoUpload(e)}
							/>

							<div className="formInput">
								{' '}
								<label htmlFor="product" className="selectLabel">
									Financial Institution:
								</label>
								<select
									className="select"
									id="financialInstitution"
									onChange={this.onValueChange}
									defaultValue={this.state.submission.financialInstitution}
								>
									<option value="" disabled>
										Tag Financial Institution
									</option>
									{this.state.selectOptions.financialInstitutions.map(
										option => (
											<option value={option} key={option}>
												{option}
											</option>
										)
									)}
								</select>
							</div>

							<div className="formInput">
								<label htmlFor="product" className="selectLabel">
									Product:
								</label>
								<select
									className="select"
									id="product"
									onChange={this.onValueChange}
									defaultValue={this.state.submission.product}
								>
									<option value="" disabled>
										Tag Product
									</option>
									{this.state.selectOptions.products.map(option => (
										<option value={option} key={option}>
											{option}
										</option>
									))}
								</select>
							</div>
							<div className="formInput">
								<label htmlFor="medium" className="selectLabel">
									Medium:
								</label>
								<select
									className="select"
									id="medium"
									onChange={this.onValueChange}
									defaultValue={this.state.submission.medium}
								>
									<option value="" disabled>
										Tag Medium
									</option>
									{this.state.selectOptions.medium.map(option => (
										<option value={option} key={option}>
											{option}
										</option>
									))}
								</select>
							</div>
							<div className="formInput">
								<label htmlFor="comment" className="selectLabel">
									Comment
								</label>
								<textarea
									className="comment"
									id="comment"
									placeholder="Add Comment..."
									onChange={this.onValueChange}
									defaultValue={this.state.submission.comment}
								/>
							</div>

							<div className="submitBtns">
								<p
									className="cancelBtn"
									onClick={() => this.props.history.goBack()}
								>
									Cancel
								</p>
								<button className="submitBtn" onClick={this.onUpdate}>
									Update Ad
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

export default withRouter(Edit);
