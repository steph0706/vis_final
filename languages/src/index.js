import React from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';
// import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let width = document.getElementById('root').style.width;
let height= document.getElementById('root').style.height;


var boxid = localStorage.getItem("boxId");
var elemName = (boxid > 1 ? "root2" : "root");

if (Number(boxid) != 2) {
        d3.select(".bubble").remove();
}

window.onscroll = function (e) {  
    if (boxid != localStorage.getItem("boxId")) {
        //remove bubble chart
        
        
        boxid = localStorage.getItem("boxId"); 
        console.log(boxid);
        if (Number(boxid) != 2) {
            console.log("remov");
            d3.select(".bubble").remove();
        }
        if (Number(boxid) > 1) {
            console.log("omg");
            ReactDOM.render(<App width={width} height={height} boxId={boxid}/>, document.getElementById("root2"));
        } else {
            ReactDOM.render(<App width={width} height={height} boxId={boxid}/>, document.getElementById("root"));
 
        }
    }


} 
ReactDOM.render(<App width={width} height={height} boxId={boxid}/>, document.getElementById('root'));
registerServiceWorker();
