import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

class Table extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [
				{
					id: 323,
					name: 'test',
					img: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg'
				}
			],
			columns: [
				{
					dataField: 'id',
					text: 'ID'
				},
				{
					dataField: 'price',
					text: 'Image',
					formatter: this.imageFormatter
				},
				{
					dataField: 'user',
					text: 'User'
				},
				{
					dataField: 'financialInstitution',
					text: 'Institute'
				},
				{
					dataField: 'medium',
					text: 'Medium'
				},
				{
					dataField: 'regional',
					text: 'Regional'
				},
				{
					dataField: 'market',
					text: 'Market'
				},
				{
					dataField: 'transit',
					text: 'Transit'
				},
				{
					dataField: 'date',
					text: 'Created at'
				},
				{
					dataField: 'status',
					text: 'Status'
				},
				{
					dataField: 'Actions',
					text: ''
				}
			]
		};
	}

	imageFormatter = (cell, row) => {
		console.log(cell);
		console.log(row);
		return <img style={{ width: 50 }} src={row.img} alt="" />;
	};

	render() {
		return (
			<BootstrapTable
				keyField="id"
				data={this.state.products}
				columns={this.state.columns}
				headerClasses={'tableHeader'}
			/>
		);
	}
}

export default Table;
