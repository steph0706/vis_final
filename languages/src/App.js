import React, { Component } from 'react';
import {
	XYPlot, XAxis, YAxis, 
	HorizontalGridLines, LineSeries,
	Treemap
} from 'react-vis';
import './App.css';
import ReactMapGL, {Popup} from 'react-map-gl';
import TimelineComponent from './Timeline.js';

const MAPBOX_TOKEN = 'pk.eyJ1IjoidnRyYW4wMSIsImEiOiJjamFvZXcwbXAwaDNkMzNwZm01eG10MHhkIn0.HMWFx0t9PAyxpG0EV6P6lg';

class App extends Component {
	state = {
	    year: 2015,
	    data: null,
	    hoveredFeature: null,
	    viewport: {
			latitude: 40,
			longitude: -100,
			zoom: 3,
			bearing: 0,
			pitch: 0,
			width: 500,
			height: 500
	    }
	};

	_onViewportChange = viewport => this.setState({viewport});

	_renderMap() {
		return (
	        <ReactMapGL
		        className="Map"
		        width={1000}
		        height={600}
		        latitude={0}
		        longitude={0}
		        zoom={1}
		        mapStyle="mapbox://styles/mapbox/dark-v9"
		        mapboxApiAccessToken={MAPBOX_TOKEN}
		        onViewportChange={this._onViewportChange}>
		        
		    </ReactMapGL>
		)
	}

	_renderTreeMap() {
		return (
			<Treemap
				title={'My New Treemap'}
				width={1000}
				height={600}
				data={}
			/>
		)
	}

	render() {
		return (
		  <div className="App">
		    <h1 className="App-title">Languages of the World</h1>
		    <div className="App-intro">
		    	<p>The world is home to approximately 7000 living languages. In an increasingly globalized world, we find that cultural exchange and interaction becomes more commonplace. As such, the need to study foreign languages for both personal and career development rises. This project provides insight to the current linguistic landscape of the world, with the goal of increasing historical intuition and cultural awareness.</p>
				<p>Language and culture are deeply interconnected concepts which tie in to individual identities. In the end, every individual’s identity is molded by our environment. By being cognizant of cultural diversity, we, as human beings, can further increase mutual understanding, leading to a more harmonious world.</p>
		    </div>

		    <div className="center">
		    	{ this._renderMap() }

		    	{ this._renderTreeMap() }
		    </div>
          
      </div>
    );
  }
}

export default App;
