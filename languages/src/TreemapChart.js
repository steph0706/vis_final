import React, { Component} from 'react';
import {
  Hint,
  Treemap
} from 'react-vis';
import './App.css';
import LanguageFamilyData from './languageHierarchy.json'

export default class TreemapChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			treePath: [],
			width: this.props.width,
			height: this.props.height
		}
	
	}
	_handleTreemapHover(node) {
	    this.setState({
	      showTreemapHint: node
	    });

	    node.data.color = 1;
	 }

	_showDirectChildren(node, path) {
	    console.log('this was called')
	    if (!path || path.length === 0) {
	      var tree = Object.assign({}, node)
	      for (var i in tree.children) {
	        delete tree.children[i].children;
	        if (tree.children[i]._size) 
	          tree.children[i].size = tree.children[i]._size;
	      }
	      return tree;
	    }

	    for (var i in node.children) {
	      if (node.children[i].title === path[0]) {
	        return this._showDirectChildren(node.children[i], path.splice(1));
	      }
	    }

	    return node;
	}

	render() {
		return (
			<Treemap
				title={'Language Family Treemap'}
				width={this.props.width}
				height={this.props.height}
		        mode="squarify"
		        padding={2}
		        hideRootNode={true}
		        onLeafMouseOver={(node, e) => this._handleTreemapHover(node)}
		        onLeafMouseOut={(node, e) => {
		          this.setState({showTreemapHint: null});
		          node.data.color = 0;
		        }}
		        onLeafClick={(node, e) => {
		          console.log(node)
		        }}
		        colorDomain={[0,1]}
				data={LanguageFamilyData}
				>
		    </Treemap>
		)
	}
}