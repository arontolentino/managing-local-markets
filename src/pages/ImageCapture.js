import React, { Component } from 'react';

import Camera, { FACING_MODES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

import ImagePreview from './../components/ImagePreview';

class ImageCapture extends Component {
	state = {
		dataUri: ''
	};

	handleTakePhotoAnimationDone = dataUri => {
		console.log('takePhoto');
		this.setState({ dataUri }, () => {
			console.log(this.state.dataUri);
		});
	};

	render() {
		return (
			<div className="ImageCapture">
				{this.state.dataUri ? (
					<ImagePreview dataUri={this.state.dataUri} isFullscreen={false} />
				) : (
					<Camera
						onTakePhotoAnimationDone={this.handleTakePhotoAnimationDone}
						isFullscreen={false}
						idealFacingMode={FACING_MODES.ENVIRONMENT}
						isImageMirror={false}
						sizeFactor={1}
					/>
				)}
			</div>
		);
	}
}

export default ImageCapture;
