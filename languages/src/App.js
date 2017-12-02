import React, { Component } from 'react';
import {
  XYPlot, 
  XAxis, YAxis, 
  HorizontalGridLines, VerticalGridLines, 
  LineMarkSeries,
  Hint,
} from 'react-vis';
import logo from './logo.svg';
import './App.css';
import ReactMapGL, {Popup} from 'react-map-gl';
import '../node_modules/react-vis/dist/style.css';
import styles from './App.css';
import {csv} from 'd3-request';

import Data from './speakers.json';
import TimelineComponent from './Timeline.js';

const MAPBOX_TOKEN = 'pk.eyJ1IjoidnRyYW4wMSIsImEiOiJjamFvZXcwbXAwaDNkMzNwZm01eG10MHhkIn0.HMWFx0t9PAyxpG0EV6P6lg';

class App extends Component {
  constructor(props) {
    super(props);
    this.state= {
      lineVal: null,
      loadError:false,
      data:null,
      series:null,
      currSer:null,
    };
  }

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

  componentWillMount() {
      csv('test.csv', (error, d) => {
        if (error) this.setState({loadError: true});
        
          var data = [];
          var series = [];
          for (var i = 0; i < d.length; i++){
            series[i] = d[i][""];
            var temp = [];
            var vals = Object.values(d[i]);
            for (var j = 0; j < vals.length; j++) {
              temp[j] = {
                x: j,
                y: vals[j]
              };
            }
            data[i] = temp;
            data[i].pop();
          }
          this.setState({series:series, data:data});
        

      });
  }

  render() {
    var lines = [];
    if (this.state.series) {
      for (var i = 0; i < this.state.series.length; i++) {
        var lang = this.state.series[i];
        var d = this.state.data[i];
        lines.push(<LineMarkSeries
                    data={d}
                    className={lang}
                    onValueMouseOver= {(datapoint, event) => this.setState({lineVal:datapoint, currSer:lang})}
                    
                    onValueMouseOut= {(datapoint, event) => this.setState({lineVal:null, currSer:null})}
                    size={3}
                  />);
      }
    }
    const lineVal = this.state.lineVal;
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
        <div>
            <XYPlot id="lineChart"
              yDomain={[100, 1500]}
              width={800}
              height={600}
              >

              <HorizontalGridLines />
              <VerticalGridLines />
              {lines}
                            <YAxis />
              <XAxis />
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
                    {this.state.currSer}
                    <h5>Number of Speakers = {lineVal.y}</h5>
                  </div>
                </Hint> : null
              }                 
            </XYPlot>
        </div>


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
