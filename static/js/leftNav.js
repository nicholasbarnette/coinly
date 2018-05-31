import React from 'react';
import Glyphicon from 'react-bootstrap';

//CSS
import '../css/nav.less';

export default class LeftNav extends React.Component {
	render() {
		return (
			<div className="leftNavContainer">
				<nav className="leftNav" style={{width: this.props.width}}>
					<div className="navItem">
						<span>Title 1</span>
					</div>
					<div className="navItem">
						<span>Title 2</span>
					</div>
					<div className="navItem">
						<span>Title 3</span>
					</div>
					<div className="navItem">
						<span>Title 4</span>
					</div>
				</nav>
				{this.props.children}
			</div>
		);
	}
}