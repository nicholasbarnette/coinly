import React from "react";
import ReactDOM from "react-dom";

//CSS
import '../../css/home.less';

//JS
import PageNav from '../components/pageNav.js';

class Home extends React.Component {
	render() {
		return	<div className="pageContainer">
					<PageNav>
					{
					    <div className="bodyContent">
							<h1>Coin Storage</h1>
							<p>This application allows you to track your coin collection.</p>
							<button className="button">Get Started</button>
					    </div>
					}
					</PageNav>
				</div>;
	}
}


export default Home;



