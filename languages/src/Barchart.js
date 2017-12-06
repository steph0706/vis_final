import React, { Component } from 'react';
import {
  XYPlot, 
  XAxis, YAxis, 
  HorizontalGridLines, VerticalGridLines, 
  VerticalBarSeries,
  Hint,
  DiscreteColorLegend,
} from 'react-vis';
import '../node_modules/react-vis/dist/style.css';
import styles from './App.css';
import {csv} from 'd3-request';


export default class Barchart extends Component {
    constructor(props) {
        super(props);
        this.state= {
          lineVal:null,
          barchart: []
        };
    }

    componentWillMount() {
        var barchart=[];
        console.log(this.props.l1);
            barchart.push(
                <VerticalBarSeries
                  data={this.props.l1}
                  stroke="white"
                  animation={true}
                  onValueMouseOver={(datapoint, {index}) => this.setState({lineVal:datapoint})}
                  onValueMouseOut={() => this.setState({lineVal:null})}
                />
            );
            barchart.push(
                <VerticalBarSeries
                  data={this.props.l2}
                  stroke="white"
                  animation={true}
                  style={{float: "left"}}
                  onValueMouseOver={(datapoint, {index}) => this.setState({lineVal:datapoint})}
                  onValueMouseOut={() => this.setState({lineVal:null})}
                />
            );
            this.setState({barchart:barchart});
    }

    render() {
        const lineVal = this.state.lineVal;
        return (<div>
            <XYPlot className="lineChart"
                width={1000}
                height={600}
                xType="ordinal"
                yType="linear"
                onMouseLeave={() => this.setState({lineVal:null})}
                >
                
                 <DiscreteColorLegend 
                    items = {[
                      "L1 speakers",
                      "L2 speakers"
                    ]}
                    width = {100}
                    className="legend"
                />
                
              <HorizontalGridLines />
              <VerticalGridLines />
              <YAxis />
              <XAxis />
              
              {this.state.barchart}
              
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
        </div>);

    }


}