import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import TopNav from './navigation.js';
import User from './user.js';

/*
var test = [1, 34, 3, 42, 53, 6, 6, 3, 3, 4];
class Table extends React.Component {
	
	createRows = () => {
		let rows = [];
		for (var i in test) {
			  rows.push(<div className="content"><span>{test[i]}</span></div>);
		}
		return rows;
	}
	
	render() {
		return (
			<div className="container">{this.createRows()}</div>
		);
	}
}

*/

class Display extends React.Component {
	
	user = null;
	
	constructor(props) {
		super(props)
		this.state = {
			first: '',
			last: '',
			username: '',
		}
	}
	
	validateUser = () => {
		let first = this.state.first;		
		let last = this.state.last;		
		let username = this.state.username;
		
		if (first !== '' && last !== '' && username !== '') {
			console.log(true);
			this.user = new User(first, last, username);
		} else {
			console.log(false);
		}
	}
	
	render() {
		return (
			<div className="display">
				<input id="first" type="text" placeholder="First Name" value={this.state.first} onChange={e => this.handleChange('first', e)} />
				<input id="last" type="text" placeholder="Last Name" value={this.state.last} onChange={e => this.handleChange('last', e)} />
				<input id="username" type="text" placeholder="Username" value={this.state.username} onChange={e => this.handleChange('username', e)} />
				<button type="submit" onClick={this.validateUser}>Submit</button>
			</div>
		);
	}
	
	handleChange(key, e) {
		let str = ('{"' + key + '": "' + e.target.value + '"}').toString();
		let json = JSON.parse(str);
		this.setState(json);
	}
}

// ========================================

ReactDOM.render(
  <div><TopNav /><Display /></div>,
  document.getElementById('root')
);
