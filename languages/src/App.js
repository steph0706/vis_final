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
import ReactMapGL, {Popup} from 'react-map-gl';
import '../node_modules/react-vis/dist/style.css';
import styles from './App.css';
import {csv} from 'd3-request';

import Data from './speakers.json';
import LesMisData from './les-mis-data.json';

import TimelineComponent from './Timeline.js';


const MAPBOX_TOKEN = 'pk.eyJ1IjoidnRyYW4wMSIsImEiOiJjamFvZXcwbXAwaDNkMzNwZm01eG10MHhkIn0.HMWFx0t9PAyxpG0EV6P6lg';

class App extends Component {
  constructor(props) {
    super(props);
    this.state= {
      l1: null,
      l2: null,
      loadError:false,
      data:null,
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
				
			/>
		)
	}

  render() {
    var barchart = [];
    if (this.state.l1 && this.state.l2) {
      console.log(this.state.data);
      barchart.push(
        <VerticalBarSeries
          data={this.state.l1}
          stroke="white"
          onValueMouseOver={(datapoint, {index}) => this.setState({lineVal:datapoint})}
          onValueMouseOut={() => this.setState({lineVal:null})}
        />);
      barchart.push(
        <VerticalBarSeries
          data={this.state.l2}
          stroke="white"
          style={{float: "left"}}
          onValueMouseOver={(datapoint, {index}) => this.setState({lineVal:datapoint})}
          onValueMouseOut={() => this.setState({lineVal:null})}
        />
      )
    }

    const myData = {
       "title": "analytics",
       "color": "#12939A",
       "children": [
        {
         "title": "cluster",
         "children": [
          {"title": "AgglomerativeCluster", "color": "#12939A", "size": 3938},
          {"title": "CommunityStructure", "color": "#12939A", "size": 3812},
          {"title": "HierarchicalCluster", "color": "#12939A", "size": 6714},
          {"title": "MergeEdge", "color": "#12939A", "size": 743}
         ]
        },
        {
         "title": "graph",
         "children": [
          {"title": "BetweennessCentrality", "color": "#12939A", "size": 3534},
          {"title": "LinkDistance", "color": "#12939A", "size": 5731},
          {"title": "MaxFlowMinCut", "color": "#12939A", "size": 7840},
          {"title": "ShortestPaths", "color": "#12939A", "size": 5914},
          {"title": "SpanningTree", "color": "#12939A", "size": 3416}
         ]
        },
        {
         "title": "optimization",
         "children": [
          {"title": "AspectRatioBanker", "color": "#12939A", "size": 7074}
         ]
        }
       ]
    }

    const lineVal = this.state.lineVal;
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

        <p></p>
            
        <XYPlot className="lineChart"
          width={1000}
          height={600}
          xType="ordinal"
          yType="linear"
          style={{display:"inline-block"}}
          >
          <DiscreteColorLegend 
            items = {[
              "L1 speakers",
              "L2, speakers"
            ]}
            width = {100}
            className="legend"
            />
          <HorizontalGridLines />
          <VerticalGridLines />
          <YAxis />
          <XAxis />
          
          {barchart}
          
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
                <h4>{lineVal.name}</h4>
                <h5>Number of Speakers = {lineVal.y}</h5>
              </div>
            </Hint> : null
          }                 
        </XYPlot>
      </div>
    );
  }
}

export default App;
