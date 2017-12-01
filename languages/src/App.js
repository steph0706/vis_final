import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactMapGL, {Popup} from 'react-map-gl';

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

	render() {
		return (
		  <div className="App">
		    <h1 className="App-title">Languages of the World</h1>
		    <p className="App-intro">
		      Language is a system that consists of the development, acquisition, maintenance and use of complex systems of communication, particularly the human ability to do so; and a language is any specific example of such a system.
		The scientific study of language is called linguistics. Questions concerning the philosophy of language, such as whether words can represent experience, have been debated since Gorgias and Plato in ancient Greece. Thinkers such as Rousseau have argued that language originated from emotions while others like Kant have held that it originated from rational and logical thought. 20th-century philosophers such as Wittgenstein argued that philosophy is really the study of language. Major figures in linguistics include Ferdinand de Saussure and Noam Chomsky.
		    </p>
		    <div className="center">
		        <ReactMapGL
			        className="Map"
			        width={1000}
			        height={600}
			        latitude={0}
			        longitude={0}
			        zoom={1}
			        mapStyle="mapbox://styles/mapbox/dark-v9"
			        mapboxApiAccessToken={MAPBOX_TOKEN}
			        onViewportChange={this._onViewportChange}
			        
			        >
			    </ReactMapGL>

			   
		    </div>
		  </div>
		);
	}
}

export default App;
