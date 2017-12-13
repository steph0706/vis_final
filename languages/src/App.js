import React, { Component } from 'react';
import {
  XYPlot, 
  XAxis, YAxis, 
  HorizontalGridLines, VerticalGridLines, 
  VerticalBarSeries,
  Hint,
  DiscreteColorLegend,
  Treemap
} from 'react-vis';
import './App.css';
import ReactMapboxGl, { Layer, Feature, GeoJSONLayer } from "react-mapbox-gl";
import '../node_modules/react-vis/dist/style.css';
import styles from './App.css';
import {csv} from 'd3-request';

import Data from './speakers.json';
import LesMisData from './les-mis-data.json';

import TimelineComponent from './Timeline.js';

import englishGeoJSON from './englishSpeakingCountries.json';
import chineseGeoJSON from './chineseSpeakingCountries.json';

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoidnRyYW4wMSIsImEiOiJjamFvZXcwbXAwaDNkMzNwZm01eG10MHhkIn0.HMWFx0t9PAyxpG0EV6P6lg'
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state= {
      l1: null,
      l2: null,
      loadError:false,
      data:null,
      currSer:null,
      mapLayer: 1   // 1: anglosphere, 2: chinese-speaking countries, 3: non-top language speaking countries
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

  _onViewportChange(viewport) {
    console.log(viewport)
    this.setState({
      zoom: 8,
      latitude: viewport.latitude,
      longitude: viewport.longitude,
    })
  }

  componentWillMount() {
      csv('test1.csv', (error, d) => {
        if (error) this.setState({loadError: true});
        else {
          var l1 = [];
          var l2 = [];
          for (var i = 1; i < d.length; i++){
            var vals = Object.values(d[i]);
            l1.push( {
              x: String(vals[1]),
              y: Number(vals[3]),
              name: vals[2]
            });
            l2.push({
              x: String(vals[1]),
              y: Number(vals[4]),
              name: vals[2]
            });
          }
          this.setState({l1:l1, l2:l2});
        }

      });
  }

  _renderMap() {
		return (
          
	        <Map
            className="Map"
            style="mapbox://styles/mapbox/streets-v9"
            zoom={[0]}
            center={[0, 0]}
            containerStyle={{
              height: "75vh",
              width: "75vw"
            }}>

            <GeoJSONLayer
              data={englishGeoJSON}
              id="englishSpeaking"
              fillLayout={{ visibility: this.state.mapLayer === 1 ? 'visible' : 'none' }}
              fillPaint={{
                'fill-color': '#4682B4',
                'fill-opacity': 0.5,
                'fill-outline-color': 'blue'
              }}
            />

            <GeoJSONLayer
              data={chineseGeoJSON}
              id="chineseSpeaking"
              fillLayout={{ visibility: this.state.mapLayer === 2 ? 'visible' : 'none' }}
              fillPaint={{
                'fill-color': 'red',
                'fill-opacity': 0.5,
                'fill-outline-color': 'red'
              }}
            />

            <GeoJSONLayer
              data={englishGeoJSON}
              id="nonMajorLanguageSpeaking"
              fillLayout={{ visibility: this.state.mapLayer === 3 ? 'visible' : 'none' }}
              fillPaint={{
                'fill-color': '#FFA500',
                'fill-opacity': 0.5,
                'fill-outline-color': 'orange'
              }}
            />



            
          </Map>
		)
	}

	_renderTreeMap() {
		return (
			<Treemap
				title={'My New Treemap'}
				width={1000}
				height={600}
				
			/>
		)
	}

  render() {
		return (
		  <div className="App">
		    <h1 className="App-title">Languages of the World</h1>
		    <div className="App-intro" onClick={()=> { this.setState({mapLayer: 2})}}>
		    	<p>The world is home to approximately 7000 living languages. In an increasingly globalized world, we find that cultural exchange and interaction becomes more commonplace. As such, the need to study foreign languages for both personal and career development rises. This project provides insight to the current linguistic landscape of the world, with the goal of increasing historical intuition and cultural awareness.</p>
				<p>Language and culture are deeply interconnected concepts which tie in to individual identities. In the end, every individual’s identity is molded by our environment. By being cognizant of cultural diversity, we, as human beings, can further increase mutual understanding, leading to a more harmonious world.</p>
		    </div>
		    <div className="center">
		    	{ this._renderMap() }
		    </div>
      </div>
    );
  }
}

export default App;
