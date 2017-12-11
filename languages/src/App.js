import React, { Component } from 'react';
import {
  XYPlot, 
  XAxis, YAxis, 
  HorizontalGridLines, VerticalGridLines, 
  VerticalBarSeries,
  Hint,
  DiscreteColorLegend,
  Treemap,
  Sankey
} from 'react-vis';
import './App.css';
import ReactMapGL, {Popup} from 'react-map-gl';
import '../node_modules/react-vis/dist/style.css';
import styles from './App.css';
import {csv} from 'd3-request';
import SankeyInfo from './SankeyInfo'
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
      nodes: SankeyInfo.nodes,
      links: SankeyInfo.links
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
    var links = this.state.links;
    var nodes = this.state.nodes;
		return (
		  <div className="App">
		    <h1 className="App-title">Languages of the World</h1>
		    <div className="App-intro">
		    	<p>The world is home to approximately 7000 living languages. In an increasingly globalized world, we find that cultural exchange and interaction becomes more commonplace. As such, the need to study foreign languages for both personal and career development rises. This project provides insight to the current linguistic landscape of the world, with the goal of increasing historical intuition and cultural awareness.</p>
				<p>Language and culture are deeply interconnected concepts which tie in to individual identities. In the end, every individual’s identity is molded by our environment. By being cognizant of cultural diversity, we, as human beings, can further increase mutual understanding, leading to a more harmonious world.</p>
		    </div>

		    <Sankey
          className="Sankey"
          nodes={nodes}
          links={links.map((d, i) => ({...d,
              color: this.state.linkIndex === i ? '#ffae19' : null
          }))}
          width={800}
          height={400}
          onLinkMouseOver={(point, e) => {
            this.setState({
              linkIndex: point.index,
              activeLink: point
            })
          }}
          onLinkMouseOut={(point, e) => {
            this.setState({
              linkIndex: null,
              activeLink: null
            })
          }}
        >
          {this._renderSankeyHint()}
        </Sankey>

      </div>
    );
  }

  _renderSankeyHint() {
    let activeLink = this.state.activeLink
    if (activeLink== null) return;

    const x = activeLink.source.x1 + ((activeLink.target.x0 - activeLink.source.x1) / 2);
    const y = activeLink.y0 - ((activeLink.y0 - activeLink.y1) / 2);
    const hintValue = {};
    const label = `${activeLink.source.name} ➞ ${activeLink.target.name}`;
    hintValue[label] = activeLink.value.toLocaleString();

    return (
      <Hint x={x} y={y} value={hintValue} />
    );
  }
}

export default App;
