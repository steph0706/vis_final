import React, { Component } from 'react';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries} from 'react-vis';
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
	
          <p></p>
          <XYPlot
              width={300}
              height={300}>
              <HorizontalGridLines />
              <LineSeries
                color="red"
                data={[
                  {x: 1, y: 10},
                  {x: 2, y: 5},
                  {x: 3, y: 15}
                ]}/>
              <XAxis title="X" />
              <YAxis />
          </XYPlot>


          <TimelineComponent
          	language="Chinese"
          	description="The Chinese language is cool. There are many variants."
          	events={[
          		{"date": "800 BC", "text": "Chinese was born"},
          		{"date": "0 AD", "text": "Jesus was born"}
          	]}
          	/>
      </div>
    );
  }
}

export default App;
