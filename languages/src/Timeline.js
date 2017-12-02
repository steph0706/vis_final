import React, { Component } from 'react';

class Timeline extends Component {


	render() {
		return (
			<div>
				<h1>{this.props.language}</h1>
				<p>{this.props.description}</p>
				
			</div>
		);
	}
}

export default Timeline;