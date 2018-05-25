import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TopNav from './navigation.js';

var test = [1, 34, 3, 42, 53, 6, 6, 3, 3, 4];
class Table extends React.Component {
	
	createRows = () => {
		let rows = [];
		for (var i in test) {
			  rows.push(<div class="content"><span>{test[i]}</span></div>);
		}
		return rows;
	}
	
	render() {
		return (
			<div class="container">{this.createRows()}</div>
		);
	}
}

class Display extends React.Component {
  render() {
    return (
      <div className="display">
        <Table />
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <div><TopNav /><Display /></div>,
  document.getElementById('root')
);
