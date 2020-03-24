import React, { Component } from 'react';

class SecondaryHeader extends Component {
	render() {
		return (
			<header className="secondaryHeader">
				<div className="wrapper">{this.props.children}</div>
			</header>
		);
	}
}

export default SecondaryHeader;
