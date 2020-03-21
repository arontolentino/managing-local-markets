import React, { Component } from 'react';

class ImagePreviw extends Component {
	state = {};
	render() {
		return (
			<div className="imagePreview imagePreviewFullScreen">
				<img src={this.props.dataUri} alt="" />
			</div>
		);
	}
}

export default ImagePreviw;
