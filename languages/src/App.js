import React, { Component } from 'react';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries} from 'react-vis';
import logo from './logo.svg';
import './App.css';
import InteractiveMap from 'react-map-gl';

const MAPBOX_TOKEN = 'pk.eyJ1IjoidnRyYW4wMSIsImEiOiJjamFvZXcwbXAwaDNkMzNwZm01eG10MHhkIn0.HMWFx0t9PAyxpG0EV6P6lg';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="App-title">Languages of the World</h1>
        <p className="App-intro">
          Language is a system that consists of the development, acquisition, maintenance and use of complex systems of communication, particularly the human ability to do so; and a language is any specific example of such a system.
The scientific study of language is called linguistics. Questions concerning the philosophy of language, such as whether words can represent experience, have been debated since Gorgias and Plato in ancient Greece. Thinkers such as Rousseau have argued that language originated from emotions while others like Kant have held that it originated from rational and logical thought. 20th-century philosophers such as Wittgenstein argued that philosophy is really the study of language. Major figures in linguistics include Ferdinand de Saussure and Noam Chomsky.
        </p>

        <InteractiveMap
	        className="center"
	        // width={1600}
	        flex={1}
	        height={600}
	        latitude={0}
	        longitude={0}
	        zoom={1}
	        mapStyle="mapbox://styles/mapbox/dark-v9"
	        mapboxApiAccessToken={MAPBOX_TOKEN}
	        onViewportChange={(viewport) => {
	          const {width, height, latitude, longitude, zoom} = viewport;
	          // Optionally call `setState` and use the state to update the map.
	        }}
	      />

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
      </div>
    );
  }
}

export default App;
