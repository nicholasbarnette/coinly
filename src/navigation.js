import React from 'react';
import './nav.css';

export default class TopNav extends React.Component {
	render() {
		return (
			<nav className="navbar">
				<div className="navGroup left">
					<div className="navItem logo">
						<a href="/">App Name</a>
					</div>
				</div>
				<div className="navGroup right">
					<div className="navItem user">
						<a href="/">{this.state.user.getFullName()}</a>
					</div>
				</div>
			</nav>
		);
	}
}