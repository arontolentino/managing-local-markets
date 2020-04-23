import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

import { filter } from 'lodash';
import { CSVLink } from 'react-csv';

import firebase from '../config/firebase';
import moment from 'moment';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';

class Table extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedSubmission: {},
			submissions: [],
			banks: [],
			columns: [
				{
					dataField: 'submissionID',
					text: 'ID',
					classes: 'tableColumn',
					sort: true,
					sortCaret: (order, column) => {
						return <FontAwesomeIcon icon={faSort} className="sort" />;
					},
					headerStyle: { width: '50px' },
				},
				{
					dataField: 'thumbnailURL',
					text: 'Image',
					formatter: this.imageFormatter,
					headerStyle: { width: '120px' },
				},
				{
					dataField: 'name',
					text: 'User',
					sort: true,
					sortCaret: (order, column) => {
						return <FontAwesomeIcon icon={faSort} className="sort" />;
					},
				},
				{
					dataField: 'financialInstitution',
					text: 'Institute',
					sort: true,
					sortCaret: (order, column) => {
						return <FontAwesomeIcon icon={faSort} className="sort" />;
					},
				},
				{
					dataField: 'product',
					text: 'Product',
					sort: true,
					sortCaret: (order, column) => {
						return <FontAwesomeIcon icon={faSort} className="sort" />;
					},
				},
				{
					dataField: 'medium',
					text: 'Medium',
					sort: true,
					sortCaret: (order, column) => {
						return <FontAwesomeIcon icon={faSort} className="sort" />;
					},
				},
				{
					dataField: 'region',
					text: 'Regional',
					sort: true,
					sortCaret: (order, column) => {
						return <FontAwesomeIcon icon={faSort} className="sort" />;
					},
				},
				{
					dataField: 'market',
					text: 'Market',
					sort: true,
					sortCaret: (order, column) => {
						return <FontAwesomeIcon icon={faSort} className="sort" />;
					},
				},
				{
					dataField: 'transit',
					text: 'Transit',
					sort: true,
					sortCaret: (order, column) => {
						return <FontAwesomeIcon icon={faSort} className="sort" />;
					},
					headerStyle: { width: '80px' },
				},
				{
					dataField: 'date.seconds',
					text: 'Date',
					formatter: this.dateFormatter,
					sort: true,
					sortCaret: (order, column) => {
						return <FontAwesomeIcon icon={faSort} className="sort" />;
					},
				},
				{
					dataField: 'status',
					text: 'Status',
					formatter: this.statusFormatter,
					sort: true,
					sortCaret: (order, column) => {
						return <FontAwesomeIcon icon={faSort} className="sort" />;
					},
					headerStyle: { width: '100px' },
				},
			],
			selectOptions: {
				financialInstitutions: [],
				medium: [],
				products: [],
				regions: [],
				markets: [],
				transits: [],
				status: [],
			},
			filters: {
				region: '',
				market: '',
				transit: '',
				financialInstitution: '',
				product: '',
				medium: '',
				status: '',
			},
			filteredFilters: {
				regions: null,
				markets: null,
				transits: null,
			},
			filteredSubmissions: null,
		};
	}

	componentDidMount() {
		// Get submissions
		const db = firebase.firestore();

		db.collection('submissions')
			.orderBy('submissionID', 'desc')
			.onSnapshot((querySnapshot) => {
				var submissions = [];
				querySnapshot.forEach(function (doc) {
					submissions.push(doc.data());
				});
				this.setState({ submissions });
			});

		db.collection('configurations')
			.doc('selectOptions')
			.get()
			.then((doc) => {
				const selectOptions = doc.data();

				this.setState({ selectOptions });
			});

		db.collection('banks')
			.get()
			.then((querySnapshot) => {
				var banks = [];
				querySnapshot.forEach(function (doc) {
					banks.push(doc.data());
				});
				this.setState({ banks });
			});
	}

	onApproveAd = (e) => {
		e.preventDefault();

		const db = firebase.firestore();

		db.collection('submissions')
			.doc(this.state.selectedSubmission.submissionID.toString())
			.set({
				...this.state.selectedSubmission,
				status: 'Approved',
				adminComment: '',
			})
			.then(() => {
				this.props.triggerToast(
					`Successfully approved ad submission #${this.state.selectedSubmission.submissionID}`
				);
			});
	};

	onUpdateAd = (e) => {
		e.preventDefault();

		const db = firebase.firestore();

		let status, toast;

		if (this.state.selectedSubmission.adminComment) {
			status = 'Action Required';
			toast =
				'Added admin note and set submission status to "Action Required".';
		} else {
			status = 'Awaiting';
			toast = `Successfully updated the ad #${this.state.selectedSubmission.submissionID}.`;
		}

		db.collection('submissions')
			.doc(this.state.selectedSubmission.submissionID.toString())
			.set({
				...this.state.selectedSubmission,
				status: status,
			})
			.then(() => {
				this.props.triggerToast(toast);
			});
	};

	onExpandInputChange = (e) => {
		this.setState({
			selectedSubmission: {
				...this.state.selectedSubmission,
				[e.target.id]: e.target.value,
			},
		});
	};

	onSelectChange = (e) => {
		const filter = e.target.id;
		const value = e.target.value;

		if (filter === 'region' && value !== '') {
			const banks = this.state.banks.filter((bank) => bank.region === value);

			let markets = [];
			banks.forEach((bank) => markets.push(bank.market));
			markets = [...new Set(markets)];

			let transits = [];
			banks.forEach((bank) => transits.push(bank.transit));
			transits = [...new Set(transits)];
			transits.sort((a, b) => a - b);

			this.setState({
				filteredFilters: {
					markets,
					transits,
				},
			});
		} else if (filter === 'market' && value !== '') {
			const banks = this.state.banks.filter((bank) => bank.market === value);

			let transits = [];
			banks.forEach((bank) => transits.push(bank.transit));
			transits = [...new Set(transits)];
			transits.sort((a, b) => a - b);

			this.setState({
				filteredFilters: {
					...this.state.filteredFilters,
					transits,
				},
			});
		} else if (
			filter === 'market' &&
			value === '' &&
			this.state.filters.region !== ''
		) {
			const banks = this.state.banks.filter(
				(bank) => bank.region === this.state.filters.region
			);

			let transits = [];
			banks.forEach((bank) => transits.push(bank.transit));
			transits = [...new Set(transits)];
			transits.sort((a, b) => a - b);

			this.setState({
				filteredFilters: {
					...this.state.filteredFilters,
					transits,
				},
			});
		} else if (
			filter === 'market' &&
			value === '' &&
			this.state.filters.region === ''
		) {
			this.setState({
				filteredFilters: {
					transits: null,
				},
			});
		} else if (filter === 'region' && value === '') {
			// Revert back to unfiltered filters
			this.setState({
				filteredFilters: {
					markets: null,
					transits: null,
				},
			});
		}

		this.setState(
			{
				filters: { ...this.state.filters, [e.target.id]: e.target.value },
			},
			() => {
				if (filter === 'region') {
					this.setState(
						{
							filters: {
								...this.state.filters,
								market: '',
								transit: '',
							},
						},
						() => {
							this.filterSubmissions();
						}
					);
				} else if (filter === 'market') {
					this.setState(
						{
							filters: {
								...this.state.filters,
								transit: '',
							},
						},
						() => {
							this.filterSubmissions();
						}
					);
				}
				this.filterSubmissions();
			}
		);
	};

	statusFormatter = (cell, row) => {
		if (cell === 'Action Required') {
			return <p style={{ color: '#D10000', fontWeight: '600' }}>{cell}</p>;
		} else if (cell === 'Approved') {
			return <p style={{ color: '#00A70D', fontWeight: '600' }}>{cell}</p>;
		} else {
			return <p>{cell}</p>;
		}
	};

	imageFormatter = (cell, row) => {
		return <img className="tableImg" src={cell} alt="" />;
	};

	actionFormatter = (cell, row) => {
		return (
			<button
				onClick={() => {
					this.props.onSubmissionSelect(row);
				}}
			>
				View/Edit
			</button>
		);
	};

	filterSubmissions = () => {
		const submissions = [...this.state.submissions];

		const filters = this.state.filters;
		let processedFilters = {};

		for (let key in filters) {
			if (filters[key] !== '') {
				processedFilters[key] = filters[key];
			}
		}
		const filteredSubmissions = filter(submissions, processedFilters);

		this.setState({ filteredSubmissions });
	};

	resetFilters = () => {
		this.setState({ filteredSubmissions: null });
		this.setState({ filters: {} });
	};

	dateFormatter = (cell, row) => {
		return <p>{moment(new Date(cell * 1000)).format('YYYY-MM-DD h:mm a')}</p>;
	};

	// CSV export headers
	headers = [
		{ label: 'ID', key: 'submissionID' },
		{ label: 'User', key: 'fullName' },
		{ label: 'Institute', key: 'financialInstitution' },
		{ label: 'Product', key: 'product' },
		{ label: 'Medium', key: 'medium' },
		{ label: 'Region', key: 'region' },
		{ label: 'Market', key: 'market' },
		{ label: 'Transit', key: 'transit' },
		{
			label: 'Date',
			key: 'date.seconds',
		},
		{ label: 'Status', key: 'status' },
	];

	expandRow = {
		onlyOneExpanding: true,
		renderer: (row) => {
			return (
				<div className="expand">
					<div className="expandHeader">
						<h3>Updating Ad</h3>
					</div>

					<div className="expandContent">
						<div className="expandImageContainer">
							<img src={row.photoURL} alt=""></img>
						</div>

						<div className="expandForm">
							<form>
								<div class="expandInput">
									<h4>Status:</h4>

									<p>{row.status}</p>
								</div>

								<div class="expandInput">
									<h4>Region:</h4>
									<select
										id="region"
										defaultValue={row.region}
										className="expandSelect"
										onChange={this.onExpandInputChange}
									>
										<option value=""></option>
										{this.state.selectOptions.regions.map((option) => (
											<option value={option} key={option}>
												{option}
											</option>
										))}
									</select>
								</div>

								<div class="expandInput">
									<h4>Market:</h4>
									<select
										id="market"
										defaultValue={row.market}
										className="expandSelect"
										onChange={this.onExpandInputChange}
									>
										<option value=""></option>
										{this.state.selectOptions.markets.map((option) => (
											<option value={option} key={option}>
												{option}
											</option>
										))}
									</select>
								</div>

								<div class="expandInput">
									<h4>Transit:</h4>
									<select
										id="transit"
										defaultValue={row.transit}
										className="expandSelect"
										onChange={this.onExpandInputChange}
									>
										<option value=""></option>
										{this.state.selectOptions.transits.map((option) => (
											<option value={option} key={option}>
												{option}
											</option>
										))}
									</select>
								</div>

								<div class="expandInput">
									<h4>Institution:</h4>
									<select
										id="financialInstitution"
										defaultValue={row.financialInstitution}
										className="expandSelect"
										onChange={this.onExpandInputChange}
									>
										<option value=""></option>
										{this.state.selectOptions.financialInstitutions.map(
											(option) => (
												<option value={option} key={option}>
													{option}
												</option>
											)
										)}
									</select>
								</div>

								<div class="expandInput">
									<h4>Product:</h4>
									<select
										id="product"
										defaultValue={row.product}
										className="expandSelect"
										onChange={this.onExpandInputChange}
									>
										<option value=""></option>
										{this.state.selectOptions.products.map((option) => (
											<option value={option} key={option}>
												{option}
											</option>
										))}
									</select>
								</div>

								<div class="expandInput">
									<h4>Medium:</h4>
									<select
										id="medium"
										defaultValue={row.medium}
										className="expandSelect"
										onChange={this.onExpandInputChange}
									>
										<option value=""></option>
										{this.state.selectOptions.medium.map((option) => (
											<option value={option} key={option}>
												{option}
											</option>
										))}
									</select>
								</div>

								<div class="expandInput textArea">
									<h4>Comment:</h4>
									<textarea
										name="comment"
										id="comment"
										className="expandTextArea"
										defaultValue={row.comment}
										onChange={this.onExpandInputChange}
									></textarea>
								</div>

								<div class="expandInput textArea">
									<h4>Admin Note:</h4>
									<div class="adminNote">
										<textarea
											name="adminComment"
											id="adminComment"
											className="expandTextArea"
											defaultValue={row.adminComment}
											onChange={this.onExpandInputChange}
										></textarea>
										<p>
											Adding an admin note will automatically update the
											submission status to “Action Required”.
										</p>
									</div>
								</div>

								<div className="expandBtns">
									<button className="updateBtn" onClick={this.onUpdateAd}>
										Update Ad
									</button>
									<button className="approveBtn" onClick={this.onApproveAd}>
										Approve Ad
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			);
		},
		showExpandColumn: true,
		expandColumnPosition: 'right',
		onExpand: (row, isExpand, rowIndex, e) => {
			setTimeout(() => {
				this.setState({ selectedSubmission: row });
			}, 50);
		},
		expandHeaderColumnRenderer: ({ isAnyExpands }) => {
			if (isAnyExpands) {
				return <b>Actions</b>;
			}
			return <b>Actions</b>;
		},
		expandColumnRenderer: ({ expanded }) => {
			if (expanded) {
				return <b style={{ color: 'rgb(209, 0, 0)' }}>Close</b>;
			}
			return <b>View</b>;
		},
	};

	render() {
		return (
			<div>
				<div className="filtersContainer">
					<div className="tableFilters">
						<div className="tableFilter">
							<h4>Region:</h4>
							<select
								className="filterSelect"
								id="region"
								onChange={this.onSelectChange}
							>
								<option value="">All</option>
								{this.state.selectOptions.regions.map((region) => (
									<option value={region}>{region}</option>
								))}
							</select>
						</div>
						<div className="tableFilter">
							<h4>Market:</h4>
							<select
								className="filterSelect"
								id="market"
								onChange={this.onSelectChange}
								value={this.state.filters.market}
							>
								<option value="">All</option>
								{this.state.filteredFilters.markets
									? this.state.filteredFilters.markets.map((market) => (
											<option value={market}>{market}</option>
									  ))
									: this.state.selectOptions.markets.map((market) => (
											<option value={market}>{market}</option>
									  ))}
							</select>
						</div>
						<div className="tableFilter">
							<h4>Transit:</h4>
							<select
								className="filterSelect"
								id="transit"
								onChange={this.onSelectChange}
								value={this.state.filters.transit}
							>
								<option value="">All</option>
								{this.state.filteredFilters.transits
									? this.state.filteredFilters.transits.map((transit) => (
											<option value={transit}>{transit}</option>
									  ))
									: this.state.selectOptions.transits.map((transit) => (
											<option value={transit}>{transit}</option>
									  ))}
							</select>
						</div>
						<div className="tableFilter">
							<h4>Institution:</h4>
							<select
								className="filterSelect"
								id="financialInstitution"
								onChange={this.onSelectChange}
							>
								<option value="">All</option>
								{this.state.selectOptions.financialInstitutions.map(
									(financialInstitution) => (
										<option value={financialInstitution}>
											{financialInstitution}
										</option>
									)
								)}
							</select>
						</div>
						<div className="tableFilter">
							<h4>Product:</h4>
							<select
								className="filterSelect"
								id="product"
								onChange={this.onSelectChange}
							>
								<option value="">All</option>
								{this.state.selectOptions.products.map((product) => (
									<option value={product}>{product}</option>
								))}
							</select>
						</div>
						<div className="tableFilter">
							<h4>Medium:</h4>
							<select
								className="filterSelect"
								id="medium"
								onChange={this.onSelectChange}
							>
								<option value="">All</option>
								{this.state.selectOptions.medium.map((medium) => (
									<option value={medium}>{medium}</option>
								))}
							</select>
						</div>
						<div className="tableFilter">
							<h4>Status:</h4>
							<select
								className="filterSelect"
								id="status"
								onChange={this.onSelectChange}
							>
								<option value="">All</option>
								{this.state.selectOptions.status.map((option) => (
									<option value={option}>{option}</option>
								))}
							</select>
						</div>
					</div>
					<div className="filterButtons">
						{/* <button className="filterBtn" onClick={this.filterSubmissions}>
									Filter
								</button> */}
						<button className="filterBtn" onClick={this.resetFilters}>
							Reset
						</button>
					</div>
				</div>

				<div className="tableExport">
					<CSVLink
						data={this.state.submissions}
						headers={this.headers}
						filename={'MLM-submissions.csv'}
					>
						Export to CSV
					</CSVLink>
				</div>

				<BootstrapTable
					keyField="submissionID"
					data={
						this.state.filteredSubmissions !== null
							? this.state.filteredSubmissions
							: this.state.submissions
					}
					columns={this.state.columns}
					bordered={false}
					expandRow={this.expandRow}
				/>
			</div>
		);
	}
}

export default Table;
