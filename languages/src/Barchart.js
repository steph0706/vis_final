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
          barchart: [],
          ymax: 1300,
          l1:null,
          l2:null,
        };
        this._drawChart = this._drawChart.bind(this);
    }


    componentWillMount() {
        this.setState({l1: this.props.l1, l2: this.props.l2});
        this._drawChart(this.props.l1, this.props.l2);
        
    }

    _drawChart(data1, data2) {
        var barchart=[];
        barchart.push(
            <VerticalBarSeries
              data={data1}
              // stroke="white"
              animation="wobbly"
              onValueMouseOver={(datapoint, {index}) => this.setState({lineVal:datapoint})}
              onValueMouseOut={() => this.setState({lineVal:null})}
            />
        );
        barchart.push(
            <VerticalBarSeries
              data={data2}
              // stroke="white"
              animation={true}
              style={{float: "left"}}
              onValueMouseOver={(datapoint, {index}) => this.setState({lineVal:datapoint})}
              onValueMouseOut={() => this.setState({lineVal:null})}
            />
        );
        this.setState({barchart:barchart});

    }

    componentWillReceiveProps(nextProps) {
      if(JSON.stringify(this.props.l1) !== JSON.stringify(nextProps.l1)) {
          this.setState({l1: nextProps.l1, l2: nextProps.l2});
          this._drawChart(nextProps.l1, nextProps.l2);
      }
    } 

    render() {
        const lineVal = this.state.lineVal;
        return (<div>
            <XYPlot className="lineChart"
                width={Number(this.props.width)}
                height={Number(this.props.height)}
                xType="ordinal"
                yType="linear"
                yDomain={[0, this.props.ymax]}
                flex={1}
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
              
              {this.state.barchart ? this.state.barchart : null}
              
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