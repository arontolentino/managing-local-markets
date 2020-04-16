import React, { Component } from 'react';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import TableRenderers from 'react-pivottable/TableRenderers';
import Plot from 'react-plotly.js';
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';

// create Plotly renderers via dependency injection
const PlotlyRenderers = createPlotlyRenderers(Plot);

// see documentation for supported input formats
const data = [
	['attribute', 'attribute2'],
	['value1', 'value2'],
];

class PivotTable extends Component {
	state = {};

	render() {
		console.log(this.props.data.submissions);

		if (this.props.data.submissions) {
			return (
				<PivotTableUI
					data={this.props.data.submissions}
					onChange={(s) => this.setState(s)}
					renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
					hiddenAttributes={[
						'photoURL',
						'submissionID',
						'thumbnailURL',
						'date',
						'comment',
						'userID',
					]}
					rows={['financialInstitution']}
					cols={['product']}
					{...this.state}
				/>
			);
		} else {
			return null;
		}
	}
}

export default PivotTable;
