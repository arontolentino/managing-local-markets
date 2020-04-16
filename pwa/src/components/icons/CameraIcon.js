import React, { Component } from 'react';

class CameraIcon extends Component {
	render() {
		return (
			<svg
				className={this.props.className}
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 33.778 28"
			>
				<g id="iconfinder_camera_3325075" transform="translate(8.5 6.5)">
					<path
						id="Path_67"
						data-name="Path 67"
						d="M32.778,26.111A2.889,2.889,0,0,1,29.889,29h-26A2.889,2.889,0,0,1,1,26.111V10.222A2.889,2.889,0,0,1,3.889,7.333H9.667L12.556,3h8.667l2.889,4.333h5.778a2.889,2.889,0,0,1,2.889,2.889Z"
						transform="translate(-8.5 -8.5)"
						fill="none"
						stroke={this.props.color}
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
					/>
					<path
						id="Path_68"
						data-name="Path 68"
						d="M6.574,0A6.574,6.574,0,1,1,0,6.574,6.574,6.574,0,0,1,6.574,0Z"
						transform="translate(2.033 2.444)"
						fill="none"
						stroke={this.props.color}
						stroke-linecap="round"
						stroke-width="2"
					/>
				</g>
			</svg>
		);
	}
}

export default CameraIcon;
