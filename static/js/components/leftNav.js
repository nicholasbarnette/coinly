import React from 'react';
import Glyphicon from 'react-bootstrap';

//CSS
import '../../css/nav.less';

export default class LeftNav extends React.Component {
	render() {
		return (
			<div className="leftNavContainer">
				<nav className="leftNav" style={{width: this.props.width}}>
					<div className="navItem">
						<a href="/">Home</a>
					</div>
					<div className="navItem">
						<a href="/collections">Collections</a>
					</div>
					<div className="navItem">
						<a href="/">Explore</a>
					</div>
					<div className="navItem">
						<a href="/">Activity</a>
					</div>
				</nav>
				{this.props.children}
			</div>
		);
	}
}