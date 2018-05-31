import React from "react";
import ReactDOM from "react-dom";

//CSS
import '../css/home.less';

//JS
import LeftNav from './leftNav.js';
import TopNavHome from './topNavHome.js';

class HomeBodyContent extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			width: '10rem'
		}
		this.openLeftNav = this.openLeftNav.bind(this);
	}
	
	openLeftNav() {
		//this.setState({width: "10rem"});
		console.log(this.state.width);
		this.setState({
			width: this.state.width === '10rem' ? '0' : '10rem'
		});
		console.log(this.state.width);
	}
	
	render() {
		return	<div className="homepageContainer">
					<TopNavHome openLeftNav={this.openLeftNav} />
					<LeftNav width={this.state.width}>{
						<div className="bodyContainer">
							<div className="bodyContent">
								<h1>Financial Storage</h1>
								<p>This is an application that will store your financial data. It allows you to keep track of your positions as well as lets you see how your portfolio grows over time.</p>
								<button className="button">Get Started</button>
							</div>
					</div>}
					</LeftNav>
				</div>;
	}
}


ReactDOM.render(
	<HomeBodyContent />,
	document.getElementById('root')
);