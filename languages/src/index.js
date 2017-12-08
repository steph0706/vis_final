import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let width = document.getElementById('root').style.width;
let height= document.getElementById('root').style.height;

window.onresize = function() {
    width = document.getElementById('root').style.width;
    height= document.getElementById('root').style.height;
    console.log(width);
    ReactDOM.render(<App width={width} height={height}/>, document.getElementById('root'));

}

registerServiceWorker();
