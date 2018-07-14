import React from 'react';
import Glyphicon from 'react-bootstrap';

//CSS
import '../../css/components/nav.less';

export default class LeftNav extends React.Component {
	render() {
		return (
			<div className="leftNavContainer">
				<nav className="leftNav" style={{width: this.props.width}}>
					<a className="navItem" href="/">
						Home
					</a>
					<a className="navItem" href="/collections">
						Collections
					</a>
					<a className="navItem" href="/explore">
						Explore
					</a>
					<a className="navItem" href="/activity">
						Activity
					</a>
				</nav>
				{this.props.children}
			</div>
		);
	}
}