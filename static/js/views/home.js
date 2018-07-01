import React from "react";
import ReactDOM from "react-dom";

//CSS
import '../../css/home.less';

//JS
import LeftNav from '../components/leftNav.js';
import TopNavHome from '../components/topNavHome.js';

class Home extends React.Component {

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
					<TopNavHome openLeftNav={this.openLeftNav} />
					<LeftNav width={this.state.width}>{
						<div className="bodyContainer">
							<div className="bodyContent">
								<h1>Coin Storage</h1>
								<p>This application allows you to track your coin collection.</p>
								<button className="button">Get Started</button>
							</div>
					    </div>}
					</LeftNav>
				</div>;
	}
}


export default Home;



