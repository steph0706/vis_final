import React, { Component} from 'react';
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
import TimelineComponent from './Timeline.js';
import Barchart from './Barchart';
import Bubblechart from './Bubblechart';
import Button from './Button';


const MAPBOX_TOKEN = 'pk.eyJ1IjoidnRyYW4wMSIsImEiOiJjamFvZXcwbXAwaDNkMzNwZm01eG10MHhkIn0.HMWFx0t9PAyxpG0EV6P6lg';

class App extends Component {
  constructor(props) {
    super(props);
    this.state= {
      toggled:false,
      l1: null,
      l2: null,
      loadError:false,
      data:null,
      bubble:null,
    };
    this._toggle = this._toggle.bind(this);
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
      var file = "l1l2.csv";
      if (this.state.toggled) file = "l2l1.csv";
      csv(file, (error, d) => {
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
          console.log(this.state.l1);
        }

      });

      this.setState({bubble:<Bubblechart/>});
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

  _toggle() {
    var toggle = this.state.toggled;
    this.setState({toggled: !toggle});
    
    var file = "l1l2.csv";
    if (this.state.toggled) {
      var file = "l2l1.csv";
      console.log("toggg");
    } 
    csv(file, (error, d) => {
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
        console.log(this.state.l1);
      }

    });

  }

  render() {
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
        {
          (this.state.l1 && this.state.l2) ? 
          <Barchart l1={this.state.l1} l2={this.state.l2}/> : null

        }


        {this.state.bubble}
        <Button label1="Top 15 L1" label2="Top 15 L2" handler={this._toggle}/>
      </div>
    );
  }
}

export default App;
