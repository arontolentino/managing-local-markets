import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

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
					}
				},
				{
					dataField: 'thumbnailURL',
					text: 'Image',
					formatter: this.imageFormatter
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
					}
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
			]
		};
	}

	componentDidMount() {
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
	}

	imageFormatter = (cell, row) => {
		return <img class="tableImg" src={cell} alt="" />;
	};

	dateFormatter = (cell, row) => {
		console.log(cell);
		return <p>{moment(new Date(cell * 1000)).format('YYYY-MM-DD h:mm a')}</p>;
	};

	render() {
		return (
			<BootstrapTable
				keyField="id"
				data={this.state.submissions}
				columns={this.state.columns}
				bordered={false}
				hover
			/>
		);
	}
}

export default Table;
