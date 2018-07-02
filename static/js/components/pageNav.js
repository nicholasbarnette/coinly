import React from "react";
import ReactDOM from "react-dom";

//JS
import LeftNav from '../components/leftNav.js';
import TopNav from '../components/topNav.js';

export default class PageNav extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			width: '10rem'
		}
		this.openLeftNav = this.openLeftNav.bind(this);
	}

	openLeftNav() {
		this.setState({
			width: this.state.width === '10rem' ? '0' : '10rem'
		});
	}

	render() {
		return	<div className="homepageContainer">
					<TopNav openLeftNav={this.openLeftNav} />
					<LeftNav width={this.state.width}>{
						<div className="bodyContainer">
							{this.props.children}
					    </div>}
					</LeftNav>
				</div>;
	}
}



