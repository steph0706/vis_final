import React, { Component } from 'react';
import {
  XYPlot, 
  XAxis, YAxis, 
  HorizontalGridLines, VerticalGridLines, 
  LineSeries,
  Hint,
} from 'react-vis';
import logo from './logo.svg';
import './App.css';
import ReactMapGL, {Popup} from 'react-map-gl';
import '../node_modules/react-vis/dist/style.css';
import styles from './App.css';
import {csv} from 'd3-request';
import Data from './speakers.json';

const MAPBOX_TOKEN = 'pk.eyJ1IjoidnRyYW4wMSIsImEiOiJjamFvZXcwbXAwaDNkMzNwZm01eG10MHhkIn0.HMWFx0t9PAyxpG0EV6P6lg';

class App extends Component {
  constructor(props) {
    super(props);
    this.state= {
      lineVal: null,
      loadError:false,
      data:null
    };
  }

  render() {
    console.log(Data.Countries);
    var countries = Data.Countries;
    console.log(countries);
    var data = [];
    for (var i = 0; i < countries.length; i++) {
      console.log(countries[i]);
      data[countries[i]] = Data.countries[i];
    }
    console.log(data);
    // const data = [
    //   {x: 0, y: 8},
    //   {x: 1, y: 5},
    //   {x: 2, y: 4},
    //   {x: 3, y: 9},
    //   {x: 4, y: 1},
    //   {x: 5, y: 7},
    //   {x: 6, y: 6},
    //   {x: 7, y: 3},
    //   {x: 8, y: 2},
    //   {x: 9, y: 0}
    // ];
    const lineVal = this.state.lineVal;
    const seriesName = "test";
    return (
      <div className="App">
        <h1 className="App-title">Languages of the World</h1>
        <p className="App-intro">
          Language is a system that consists of the development, acquisition, maintenance and use of complex systems of communication, particularly the human ability to do so; and a language is any specific example of such a system.
The scientific study of language is called linguistics. Questions concerning the philosophy of language, such as whether words can represent experience, have been debated since Gorgias and Plato in ancient Greece. Thinkers such as Rousseau have argued that language originated from emotions while others like Kant have held that it originated from rational and logical thought. 20th-century philosophers such as Wittgenstein argued that philosophy is really the study of language. Major figures in linguistics include Ferdinand de Saussure and Noam Chomsky.
        </p>

        <ReactMapGL
	        className="center"
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
	        }}>

	        <Popup latitude={-122.41} longitude={37.78} closeButton={true} closeOnClick={false} anchor="top">
	        	<div>You are here</div>
	        </Popup>
	      </ReactMapGL>
          <p></p>
          <div style={{margin:"0 auto"}}>
          <XYPlot id="lineChart"
              width={800}
              height={600}
              
                              onMouseLeave = {() => this.setState({lineVal:null})}

              >
              <YAxis />
              <HorizontalGridLines />
              <VerticalGridLines />
              data.map((d, i) => ({
                // console.log(d)
                // <LineSeries
                // data={d}
                // name={seriesName}
                // onNearestXY = {(datapoint, event) => {
                //   console.log(datapoint);
                //   this.setState({lineVal:datapoint});
                // }}

                // />
              }))
              
              {
                lineVal ? 
                <Hint value={lineVal}>
                <div className="hint" style={{
                  background:"white",
                  borderStyle:"solid",
                  borderColor:"grey",
                  borderWidth:"1px",
                  marginBottom:"0px",
                  fontSize:"7",
                  padding:"10px",
                  paddingBottom:"0px",
                  lineHeight:"2px",
                }}>
                  {seriesName}
                  <h5>Number of Speakers = {lineVal.y}</h5>
                </div>
                </Hint> : null
              }              
                
                
             
              
          </XYPlot>
          </div>
      </div>
    );
  }
}

export default App;
