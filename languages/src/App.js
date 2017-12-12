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
import d3 from 'd3';
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
      l12: null,
      l22: null,
      ymax: 0,
      loadError:false,
      data:null,
      width:null,
      height:null,
      box:null,
      barchart:null,
      bubble:null,
    };
    this._toggle = this._toggle.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
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
      var file1 = "l1l2.csv";
      var max = 0;
      csv(file1, (error, d) => {
        if (error) this.setState({loadError: true});
        else {
          let l1 = [];
          let l2 = [];
          for (var i = 0; i < d.length; i++){
            let vals = Object.values(d[i]);
            max = Math.max(vals[3], Math.max(max, vals[4]));
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

      let file2 = "l2l1.csv";
      csv(file2, (error, d) => {
      if (error) this.setState({loadError: true});
      else {
        let l12 = [];
        let l22 = [];
        for (let i = 0; i < d.length; i++){
          var vals = Object.values(d[i]);
          max = Math.max(vals[3], Math.max(max, vals[4]));
          l12.push( {
            x: String(vals[1]),
            y: Number(vals[3]),
            name: vals[2]
          });
          l22.push({
            x: String(vals[1]),
            y: Number(vals[4]),
            name: vals[2]
          });
        }
        this.setState({l12: l12, l22: l22, ymax:max});
      }

    });

    this.setState({height: this.props.height.slice(0, -2), width: this.props.width.slice(0, -2)});
    this.setState({box:this.props.boxId});
    this.setState({bubble:<Bubblechart width={this.props.width.slice(0, -2)} height={this.props.height.slice(0,-2)}/>, box:this.props.boxId});

  }


  componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);

  }

  componentWillReceiveProps(nextProps) {
    if(this.props.boxId !== nextProps.boxId) {
      if (Number(this.props.boxId) == 0 && Number(nextProps.boxId) == 1 ||
        Number(this.props.boxId) == 1 && Number(nextProps.boxId) == 0){
        this._toggle();
      }
      this.setState({box: nextProps.boxId});
    }

  }

  updateDimensions() {
    let elem = document.getElementById('root').style;
    this.setState({width: elem.width.slice(0, -2), height: elem.height.slice(0,-2)});
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
    if (this.state.l1 != null && this.state.l12 != null) {
      let temp1 = this.state.l1;
      let temp2 = this.state.l2;
      this.setState({l1: this.state.l12, l2: this.state.l22, l12:temp1, l22: temp2});
    }
  }

  render() {
    const lineVal = this.state.lineVal;
    if (Number(this.state.box) >= 2) {
      return (
        <div className="App">
          {/*this.state.bubble*/}
        </div> 
        );
    } else 
      return (
		  <div className="App">
{/*
		    <div className="center">
		    	{ this._renderMap() }

		    	{ this._renderTreeMap() }
		    </div>

        <p></p>
*/}
        {
          (this.state.l1 && this.state.l2 && (Number(this.state.box) == 0) || Number(this.state.box) == 1) ? 
          <Barchart l1={this.state.l1} l2={this.state.l2} ymax={this.state.ymax} 
            height={this.state.height} width={this.state.width}  /> : null

        }
        {/*
          (this.state.l1 && this.state.l2 && this.state.box == 0) ? 
          <Button label1="Top 15 L1" label2="Top 15 L2" handler={this._toggle}/> : null

        */}
      </div>
    );
  }
}

export default App;
