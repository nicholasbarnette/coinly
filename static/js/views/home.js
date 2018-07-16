import React from "react";
import ReactDOM from "react-dom";

//CSS
import '../../css/home.less';

//JS
import PageNav from '../components/pageNav.js';
import Button from '../components/button.js';

export default class Home extends React.Component {

    constructor() {
        super();

        this.state = {
            notification: ''
        };

        //Notification
        this.closeNotification = this.closeNotification.bind(this);

        //Buttons
        this.buttonClick = this.buttonClick.bind(this);
    }

    closeNotification() {
	    this.setState({
	        notification: ''
	    });
	}

	buttonClick() {
	    return;
	}

	render() {
		return	<div className="pageContainer">
					<PageNav notification={this.state.notification} closeNotification={this.closeNotification}>
					{
					    <div className="bodyContent">
							<h1>Coin Storage</h1>
							<p>This application allows you to track your coin collection.</p>
							<a href="/collections"><Button click={this.buttonClick} type=""><span>Get Started</span></Button></a>
					    </div>
					}
					</PageNav>
				</div>;
	}
}



