import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactMapGL from 'react-map-gl';

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

        <ReactMapGL
        flex= {1}
        
        latitude={0}
        longitude={0}
        zoom={0}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        onViewportChange={(viewport) => {
          const {width, height, latitude, longitude, zoom} = viewport;
          // Optionally call `setState` and use the state to update the map.
        }}
      />
      </div>
    );
  }
}

export default App;
