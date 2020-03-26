import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

import { filter } from 'lodash';
import { CSVLink } from 'react-csv';

import firebase from './config/firebase';
import moment from 'moment';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';

class Table extends Component {
	constructor(props) {
		super(props);
		this.state = {
			submissions: [],
			columns: [
				{
					dataField: 'submissionID',
					text: 'ID',
					classes: 'tableColumn',
					sort: true,
					sortCaret: (order, column) => {
						return <FontAwesomeIcon icon={faSort} className="sort" />;
					},
					headerStyle: { width: '50px' }
				},
				{
					dataField: 'thumbnailURL',
					text: 'Image',
					formatter: this.imageFormatter,
					headerStyle: { width: '120px' }
				},
				{
					dataField: 'fullName',
					text: 'User',
					sort: true,
					sortCaret: (order, column) => {
						return <FontAwesomeIcon icon={faSort} className="sort" />;
					}
				},
				{
					dataField: 'financialInstitution',
					text: 'Institute',
					sort: true,
					sortCaret: (order, column) => {
						return <FontAwesomeIcon icon={faSort} className="sort" />;
					}
				},
				{
					dataField: 'product',
					text: 'Product',
					sort: true,
					sortCaret: (order, column) => {
						return <FontAwesomeIcon icon={faSort} className="sort" />;
					}
				},
				{
					dataField: 'medium',
					text: 'Medium',
					sort: true,
					sortCaret: (order, column) => {
						return <FontAwesomeIcon icon={faSort} className="sort" />;
					}
				},
				{
					dataField: 'region',
					text: 'Regional',
					sort: true,
					sortCaret: (order, column) => {
						return <FontAwesomeIcon icon={faSort} className="sort" />;
					}
				},
				{
					dataField: 'market',
					text: 'Market',
					sort: true,
					sortCaret: (order, column) => {
						return <FontAwesomeIcon icon={faSort} className="sort" />;
					}
				},
				{
					dataField: 'transit',
					text: 'Transit',
					sort: true,
					sortCaret: (order, column) => {
						return <FontAwesomeIcon icon={faSort} className="sort" />;
					},
					headerStyle: { width: '80px' }
				},
				{
					dataField: 'date.seconds',
					text: 'Date',
					formatter: this.dateFormatter,
					sort: true,
					sortCaret: (order, column) => {
						return <FontAwesomeIcon icon={faSort} className="sort" />;
					}
				},
				{
					dataField: 'status',
					text: 'Status',
					sort: true,
					sortCaret: (order, column) => {
						return <FontAwesomeIcon icon={faSort} className="sort" />;
					}
				}
			],
			selectOptions: {
				financialInstitutions: [],
				medium: [],
				products: [],
				regions: [],
				markets: [],
				transits: []
			},
			filters: {},
			filteredSubmissions: null
		};
	}

	componentDidMount() {
		// Get submissions
		const db = firebase.firestore();

		db.collection('submissions')
			.orderBy('submissionID', 'desc')
			.onSnapshot(querySnapshot => {
				var submissions = [];
				querySnapshot.forEach(function(doc) {
					submissions.push(doc.data());
				});
				this.setState({ submissions });
			});

		db.collection('configurations')
			.doc('selectOptions')
			.get()
			.then(doc => {
				const selectOptions = doc.data();

				this.setState({ selectOptions });
			});
	}

	imageFormatter = (cell, row) => {
		return <img class="tableImg" src={cell} alt="" />;
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

	onSelectChange = e => {
		this.setState({
			filters: { ...this.state.filters, [e.target.id]: e.target.value }
		});
	};

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
			key: 'date.seconds'
		},
		{ label: 'Status', key: 'status' }
	];

	render() {
		return (
			<div>
				<div className="filtersContainer">
					<div className="tableFilters">
						<div className="tableFilter">
							<h4>Regional:</h4>
							<select
								className="filterSelect"
								id="region"
								onChange={this.onSelectChange}
							>
								<option value="" selected>
									All
								</option>
								{this.state.selectOptions.regions.map(region => (
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
							>
								<option value="" selected>
									All
								</option>
								{this.state.selectOptions.markets.map(market => (
									<option value={market}>{market}</option>
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
								<option value="" selected>
									All
								</option>
								{this.state.selectOptions.financialInstitutions.map(
									financialInstitution => (
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
								<option value="" selected>
									All
								</option>
								{this.state.selectOptions.products.map(product => (
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
								<option value="" selected>
									All
								</option>
								{this.state.selectOptions.medium.map(medium => (
									<option value={medium}>{medium}</option>
								))}
							</select>
						</div>
						<div className="tableFilter">
							<h4>Transit:</h4>
							<select
								className="filterSelect"
								id="transit"
								onChange={this.onSelectChange}
							>
								<option value="" selected>
									All
								</option>
								{this.state.selectOptions.transits.map(transit => (
									<option value={transit}>{transit}</option>
								))}
							</select>
						</div>
					</div>
					<div className="filterButtons">
						<button className="filterBtn" onClick={this.filterSubmissions}>
							Filter
						</button>
						<button className="filterBtn" onClick={this.resetFilters}>
							Reset
						</button>
					</div>
				</div>

				<div className="tableExport">
					<CSVLink data={this.state.submissions} headers={this.headers}>
						Export to CSV
					</CSVLink>
				</div>

				<BootstrapTable
					keyField="id"
					data={
						this.state.filteredSubmissions !== null
							? this.state.filteredSubmissions
							: this.state.submissions
					}
					columns={this.state.columns}
					bordered={false}
					hover
				/>
			</div>
		);
	}
}

export default Table;
