import React from 'react';
//import ReactDOM from 'react-dom';
import './nav.css';

export default class TopNav extends React.Component {
	username = 'Nick Barnette';
	getUsername = () => {
		return this.username;
	}
	
	render() {
		return (
			<nav class="navbar">
				<div class="navGroup left">
					<div class="navItem logo">
						<a href="/">App Name</a>
					</div>
				</div>
				<div class="navGroup right">
					<div class="navItem user">
						<a href="/">{this.getUsername()}</a>
					</div>
				</div>
			</nav>
		);
	}
}