import React from 'react';
import Glyphicon from 'react-bootstrap';

//CSS
import '../../css/nav.less';


export default class TopNav extends React.Component {
	handleClick() {
		this.props.openLeftNav();
	}
	
	render() {
		return (
			<nav className="navbar">
				<div className="navGroup left">
					<div className="navItem hamburger" onClick={e => this.handleClick()}>
						<a><Glyphicon glyph="menu-hamburger" /></a>
					</div>
				</div>
				
				<div className="navGroup middle">
					<div className="navItem logo">
						<a href="/">Logo</a>
					</div>
				</div>
				
				<div className="navGroup right">
				</div>
			</nav>
		);
	}
}